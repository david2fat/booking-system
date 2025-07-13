from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class PromotionBase(BaseModel):
    name: str
    description: Optional[str] = None
    discount_type: str
    discount_value: Decimal
    start_date: datetime
    end_date: datetime

class PromotionCreate(PromotionBase):
    store_id: int

class Promotion(PromotionBase):
    id: int
    store_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 