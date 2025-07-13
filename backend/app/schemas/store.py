from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class StoreBase(BaseModel):
    name: str
    description: Optional[str] = None
    address: str
    phone: Optional[str] = None
    email: Optional[str] = None
    business_hours: Optional[str] = None

class StoreCreate(StoreBase):
    pass

class StoreUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    business_hours: Optional[str] = None
    is_active: Optional[bool] = None

class Store(StoreBase):
    id: int
    owner_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 