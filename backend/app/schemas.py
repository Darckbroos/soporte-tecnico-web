# backend/app/schemas.py
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict, AliasChoices

class LeadIn(BaseModel):
    # acepta cualquiera de los dos: español o inglés
    nombre:   str      = Field(..., min_length=2, max_length=120, validation_alias=AliasChoices('nombre','name'))
    correo:   EmailStr = Field(..., validation_alias=AliasChoices('correo','email'))
    telefono: Optional[str] = Field(default=None, validation_alias=AliasChoices('telefono','phone'))
    comuna:   Optional[str] = Field(default=None, validation_alias=AliasChoices('comuna','city'))
    mensaje:  str      = Field(..., min_length=5, max_length=2000, validation_alias=AliasChoices('mensaje','message'))
    fuente:   Optional[str] = Field(default=None, validation_alias=AliasChoices('fuente','source'))

    # MUY IMPORTANTE: acepta también el nombre del campo además del alias
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

class LeadOut(BaseModel):
    id: int
    nombre: str
    correo: EmailStr
    telefono: Optional[str] = None
    comuna: Optional[str]   = None
    mensaje: str
    source: Optional[str]   = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)