from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .database import Base

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    nombre  = Column(String(120), nullable=False)
    correo  = Column(String(180), nullable=False, index=True)
    telefono  = Column(String(50))
    comuna  = Column(String(120))
    mensaje  = Column(Text, nullable=False)
    source = Column(String(50), default="web")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
