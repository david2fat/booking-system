from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    duration: int
    price: Decimal

class ServiceCreate(ServiceBase):
    store_id: int

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    price: Optional[Decimal] = None
    is_active: Optional[bool] = None

class Service(ServiceBase):
    id: int
    store_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 