from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict  # 👈 importa ConfigDict

class LeadIn(BaseModel):
    # alias en español
    nombre: str = Field(..., min_length=2, max_length=120)
    correo: EmailStr 
    telefono: Optional[str] 
    comuna: Optional[str] 
    mensaje: str = Field(..., min_length=5, max_length=2000)
    fuente: Optional[str] = None

    # Pydantic v2
    model_config = ConfigDict(
        populate_by_name=True,    # acepta 'name' o 'nombre', etc.
        extra="ignore"            # ignora claves adicionales
    )

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