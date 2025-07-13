from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class CustomerBase(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

class Customer(CustomerBase):
    id: int
    store_id: int
    points: int = 0
    membership_level: str = "basic"
    total_spent: int = 0
    referral_code: Optional[str] = None
    referred_by: Optional[int] = None
    preferences: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 