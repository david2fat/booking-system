from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.booking import BookingStatus

class CustomerInfo(BaseModel):
    id: int
    name: str
    phone: str
    email: str

    class Config:
        from_attributes = True

class ServiceInfo(BaseModel):
    id: int
    name: str
    description: str
    price: int

    class Config:
        from_attributes = True

class StoreInfo(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        from_attributes = True

class EmployeeInfo(BaseModel):
    id: int
    position: str
    specializations: str

    class Config:
        from_attributes = True

class BookingBase(BaseModel):
    booking_date: datetime
    start_time: datetime
    end_time: datetime
    notes: Optional[str] = None

class BookingCreate(BookingBase):
    store_id: int
    service_id: int
    employee_id: Optional[int] = None
    total_amount: int
    customer_id: Optional[int] = None

class BookingUpdate(BaseModel):
    booking_date: Optional[datetime] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    status: Optional[BookingStatus] = None
    notes: Optional[str] = None
    employee_id: Optional[int] = None

class Booking(BookingBase):
    id: int
    customer_id: int
    store_id: int
    service_id: int
    employee_id: Optional[int] = None
    status: BookingStatus
    qr_code: Optional[str] = None
    total_amount: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    customer: Optional[CustomerInfo] = None
    service: Optional[ServiceInfo] = None
    store: Optional[StoreInfo] = None
    employee: Optional[EmployeeInfo] = None

    class Config:
        from_attributes = True 