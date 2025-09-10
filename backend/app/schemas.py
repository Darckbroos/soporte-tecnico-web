from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class LeadIn(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = None
    city: Optional[str] = None
    message: str = Field(..., min_length=5, max_length=2000)
    source: Optional[str] = None

class LeadOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: Optional[str] = None
    city: Optional[str] = None
    message: str
    source: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
