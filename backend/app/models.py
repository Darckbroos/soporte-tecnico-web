from sqlalchemy import Column, Integer, String, Text, DateTime, func
from .database import Base

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), nullable=False, index=True)
    phone = Column(String(50))
    city = Column(String(120))
    message = Column(Text, nullable=False)
    source = Column(String(50), default="web")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
