from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Store(Base):
    __tablename__ = "stores"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    address = Column(String, nullable=False)
    phone = Column(String)
    email = Column(String)
    business_hours = Column(String)  # JSON格式儲存營業時間
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 外鍵關係
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 關聯關係
    owner = relationship("User", back_populates="stores")
    services = relationship("Service", back_populates="store")
    employees = relationship("Employee", back_populates="store")
    bookings = relationship("Booking", back_populates="store") 