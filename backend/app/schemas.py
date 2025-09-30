from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict  # 👈 importa ConfigDict

class LeadIn(BaseModel):
    # alias en español
    name: str = Field(..., alias="nombre", min_length=2, max_length=120)
    email: EmailStr = Field(..., alias="correo")
    phone: Optional[str] = Field(None, alias="telefono")
    city: Optional[str]  = Field(None, alias="ciudad")
    message: str = Field(..., alias="mensaje", min_length=5, max_length=2000)
    source: Optional[str] = None

    # Pydantic v2
    model_config = ConfigDict(
        populate_by_name=True,    # acepta 'name' o 'nombre', etc.
        extra="ignore"            # ignora claves adicionales
    )

class LeadOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: Optional[str] = None
    city: Optional[str] = None
    message: str
    source: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)  # 👈 v2