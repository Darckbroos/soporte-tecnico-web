# backend/app/schemas.py
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class LeadIn(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=120, validation_alias='name')
    correo: EmailStr = Field(..., validation_alias='email')
    telefono: Optional[str] = Field(default=None, validation_alias='phone')
    comuna: Optional[str] = Field(default=None, validation_alias='city')
    mensaje: str = Field(..., min_length=5, max_length=2000, validation_alias='message')
    fuente: Optional[str] = Field(default=None, validation_alias='source')

    # acepta claves extra sin romper
    model_config = ConfigDict(extra="ignore")

class LeadOut(BaseModel):
    id: int
    nombre: str
    correo: EmailStr
    telefono: Optional[str] = None
    comuna: Optional[str] = None
    mensaje: str
    source: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)