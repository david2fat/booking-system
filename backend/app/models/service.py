from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    duration = Column(Integer, nullable=False)  # 服務時長（分鐘）
    price = Column(Numeric(10, 2), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 外鍵關係
    store_id = Column(Integer, ForeignKey("stores.id"), nullable=False)
    
    # 關聯關係
    store = relationship("Store", back_populates="services")
    bookings = relationship("Booking", back_populates="service") 