from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from . import models, schemas
from datetime import datetime

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Soporte Técnico", version="1.0.0")

# CORS
from .settings import settings
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
def create_lead(lead: schemas.LeadIn, db: Session = Depends(get_db)):
    # Evitar duplicados simples por email + mensaje igual
    existing = db.query(models.Lead).filter(
        models.Lead.email == lead.email,
        models.Lead.message == lead.message
    ).first()
    if existing:
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
    return obj

@app.get("/leads", response_model=list[schemas.LeadOut])
def list_leads(db: Session = Depends(get_db)):
    return db.query(models.Lead).order_by(models.Lead.created_at.desc()).limit(100).all()
