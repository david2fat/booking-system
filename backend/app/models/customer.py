from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # 客戶姓名
    phone = Column(String)  # 電話
    email = Column(String)  # 電子郵件
    address = Column(String)  # 地址
    notes = Column(Text)  # 備註
    store_id = Column(Integer, ForeignKey("stores.id"))  # 所屬店舖
    points = Column(Integer, default=0)  # 會員積分
    membership_level = Column(String, default="bronze")  # bronze, silver, gold, platinum
    total_spent = Column(Numeric(10, 2), default=0)  # 總消費金額
    referral_code = Column(String, unique=True)  # 推薦碼
    referred_by = Column(Integer, ForeignKey("customers.id"))  # 推薦人
    preferences = Column(Text)  # JSON格式儲存偏好設定
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 關聯關係
    store = relationship("Store")
    referrals = relationship("Customer", backref="referrer", remote_side=[id])
    bookings = relationship("Booking", back_populates="customer") 