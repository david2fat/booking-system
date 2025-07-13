from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    points = Column(Integer, default=0)  # 會員積分
    membership_level = Column(String, default="bronze")  # bronze, silver, gold, platinum
    total_spent = Column(Numeric(10, 2), default=0)  # 總消費金額
    referral_code = Column(String, unique=True)  # 推薦碼
    referred_by = Column(Integer, ForeignKey("customers.id"))  # 推薦人
    preferences = Column(Text)  # JSON格式儲存偏好設定
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 關聯關係
    user = relationship("User")
    referrals = relationship("Customer", backref="referrer", remote_side=[id]) 