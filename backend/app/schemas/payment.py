from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from app.models.payment import PaymentMethod, PaymentStatus

class PaymentBase(BaseModel):
    amount: Decimal
    currency: str = "TWD"
    payment_method: PaymentMethod

class PaymentCreate(PaymentBase):
    booking_id: int

class Payment(PaymentBase):
    id: int
    user_id: int
    booking_id: int
    status: PaymentStatus
    transaction_id: Optional[str] = None
    payment_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 