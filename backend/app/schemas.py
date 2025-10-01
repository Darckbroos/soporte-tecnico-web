from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict  # 👈 importa ConfigDict

class LeadIn(BaseModel):
    # alias en español
    nombre: str = Field(..., min_length=2, max_length=120)
    correo: EmailStr 
    telefono: Optional[str] 
    Comuna: Optional[str] 
    mensaje: str = Field(..., min_length=5, max_length=2000)
    fuente: Optional[str] = None

    # Pydantic v2
    model_config = ConfigDict(
        populate_by_name=True,    # acepta 'name' o 'nombre', etc.
        extra="ignore"            # ignora claves adicionales
    )

class LeadOut(BaseModel):
    id: int
    # Nota: validation_alias dice "toma estos valores desde los atributos en inglés"
    nombre: str = Field(validation_alias="name")
    correo: EmailStr = Field(validation_alias="email")
    telefono: Optional[str] = Field(default=None, validation_alias="phone")
    ciudad: Optional[str]  = Field(default=None, validation_alias="city")
    mensaje: str = Field(validation_alias="message")
    fuente: Optional[str]  = Field(default=None, validation_alias="source")
    creado_en: datetime = Field(validation_alias="created_at")

    model_config = ConfigDict(from_attributes=True)