# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from . import models, schemas
from datetime import datetime
import os
from .settings import settings
from app.utils.mailer import build_lead_email, send_email

print("DB URL:", engine.url)
if engine.url.drivername.startswith("sqlite"):
    print("SQLite path:", os.path.abspath(engine.url.database))


Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Soporte Técnico", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

@app.post("/leads", response_model=schemas.LeadOut)
def create_lead(
    lead: schemas.LeadIn,
    background_tasks: BackgroundTasks,      
    db: Session = Depends(get_db)
):
    # Evitar duplicados simples
    existing = db.query(models.Lead).filter(
        models.Lead.email == lead.email,
        models.Lead.message == lead.message
    ).first()
    if existing:
        # Igual disparar correo si quieres, o retornar directo
        return existing

    obj = models.Lead(
        name=lead.name.strip(),
        email=lead.email.strip().lower(),
        phone=lead.phone.strip() if lead.phone else None,
        message=lead.message.strip(),
        city=lead.city.strip() if lead.city else None,
        source=lead.source.strip() if lead.source else "web"
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)

    # Envío de correo en background (no retrasa la respuesta)
    try:
        subject, html = build_lead_email(obj)
        background_tasks.add_task(
            send_email,
            subject=subject,
            html=html,
            to=settings.notify_email
        )
    except Exception as e:
        print("[mailer] No se pudo programar el envío:", e)

    return obj

@app.get("/leads", response_model=list[schemas.LeadOut])
def list_leads(db: Session = Depends(get_db)):
    return db.query(models.Lead).order_by(models.Lead.created_at.desc()).limit(100).all()
