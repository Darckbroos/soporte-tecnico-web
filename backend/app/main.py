# backend/app/main.py
from fastapi import FastAPI, Depends, BackgroundTasks, APIRouter
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

# 👉 Todas las rutas con prefijo /api
api = APIRouter(prefix="/api")

@api.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

@api.post("/leads", response_model=schemas.LeadOut)
def create_lead(
    lead: schemas.LeadIn,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Evitar duplicados simples
    existing = (
        db.query(models.Lead)
        .filter(
            models.Lead.correo == lead.correo,
            models.Lead.mensaje == lead.mensaje,
        )
        .first()
    )
    if existing:
        return existing

    obj = models.Lead(
        nombre=lead.nombre.strip(),
        correo=lead.correo.strip().lower(),
        telefono=lead.telefono.strip() if lead.telefono else None,
        comuna=lead.comuna.strip() if lead.comuna else None,
        mensaje=lead.mensaje.strip(),
        source=(lead.fuente or "web").strip(),
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)

    # Envío email en background
    try:
        subject, html = build_lead_email(obj)  # Asegúrate de que el mailer soporte los nombres en español
        background_tasks.add_task(
            send_email, subject=subject, html=html, to=settings.notify_email
        )
    except Exception as e:
        print("[mailer] No se pudo programar el envío:", e)

    return obj

@api.get("/leads", response_model=list[schemas.LeadOut])
def list_leads(db: Session = Depends(get_db)):
    return (
        db.query(models.Lead)
        .order_by(models.Lead.created_at.desc())
        .limit(100)
        .all()
    )

app.include_router(api)