from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum
from fastapi.middleware.cors import CORSMiddleware

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    booking_date = Column(DateTime, nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    status = Column(Enum(BookingStatus), default=BookingStatus.PENDING)
    notes = Column(Text)
    qr_code = Column(String, unique=True)  # QR Code路徑
    total_amount = Column(Integer, nullable=False)  # 總金額（分）
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 外鍵關係
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    store_id = Column(Integer, ForeignKey("stores.id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    
    # 關聯關係
    customer = relationship("Customer", back_populates="bookings")
    store = relationship("Store", back_populates="bookings")
    service = relationship("Service", back_populates="bookings")
    employee = relationship("Employee", back_populates="bookings")
    payments = relationship("Payment", back_populates="booking") 