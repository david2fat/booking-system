from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_
from datetime import datetime, date

from app.models.booking import Booking, BookingStatus
from app.schemas.booking import BookingCreate, BookingUpdate

def get_booking(db: Session, booking_id: int) -> Optional[Booking]:
    """根據ID取得預約"""
    return db.query(Booking).options(
        joinedload(Booking.customer),
        joinedload(Booking.service),
        joinedload(Booking.store),
        joinedload(Booking.employee)
    ).filter(Booking.id == booking_id).first()

def get_bookings(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    customer_id: Optional[int] = None,
    store_id: Optional[int] = None,
    status: Optional[BookingStatus] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None
) -> List[Booking]:
    """取得預約列表，支援多種篩選條件"""
    query = db.query(Booking).options(
        joinedload(Booking.customer),
        joinedload(Booking.service),
        joinedload(Booking.store),
        joinedload(Booking.employee)
    )
    
    if customer_id:
        query = query.filter(Booking.customer_id == customer_id)
    
    if store_id:
        query = query.filter(Booking.store_id == store_id)
    
    if status:
        query = query.filter(Booking.status == status)
    
    if date_from:
        query = query.filter(Booking.booking_date >= date_from)
    
    if date_to:
        query = query.filter(Booking.booking_date <= date_to)
    
    return query.offset(skip).limit(limit).all()

def create_booking(db: Session, booking_in: BookingCreate, customer_id: int) -> Booking:
    """建立新預約"""
    # 生成 QR Code（簡單實作）
    import uuid
    qr_code = f"booking_{uuid.uuid4().hex[:8]}"
    
    db_booking = Booking(
        booking_date=booking_in.booking_date,
        start_time=booking_in.start_time,
        end_time=booking_in.end_time,
        status=BookingStatus.PENDING,
        notes=booking_in.notes,
        qr_code=qr_code,
        total_amount=booking_in.total_amount,
        customer_id=customer_id,
        store_id=booking_in.store_id,
        service_id=booking_in.service_id,
        employee_id=booking_in.employee_id
    )
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def update_booking(db: Session, booking_id: int, booking_in: BookingUpdate) -> Optional[Booking]:
    """更新預約"""
    db_booking = get_booking(db, booking_id)
    if not db_booking:
        return None
    
    update_data = booking_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_booking, field, value)
    
    db.commit()
    db.refresh(db_booking)
    return db_booking

def delete_booking(db: Session, booking_id: int) -> bool:
    """刪除預約"""
    db_booking = get_booking(db, booking_id)
    if not db_booking:
        return False
    
    db.delete(db_booking)
    db.commit()
    return True

def get_bookings_by_date_range(
    db: Session, 
    store_id: int, 
    start_date: date, 
    end_date: date
) -> List[Booking]:
    """根據日期範圍取得預約"""
    return db.query(Booking).filter(
        and_(
            Booking.store_id == store_id,
            Booking.booking_date >= start_date,
            Booking.booking_date <= end_date
        )
    ).all()

def get_conflicts(
    db: Session, 
    employee_id: int, 
    start_time: datetime, 
    end_time: datetime,
    exclude_booking_id: Optional[int] = None
) -> List[Booking]:
    """檢查時間衝突"""
    query = db.query(Booking).filter(
        and_(
            Booking.employee_id == employee_id,
            Booking.status != BookingStatus.CANCELLED,
            or_(
                and_(Booking.start_time < end_time, Booking.end_time > start_time)
            )
        )
    )
    
    if exclude_booking_id:
        query = query.filter(Booking.id != exclude_booking_id)
    
    return query.all()

def update_booking_status(db: Session, booking_id: int, status: BookingStatus) -> Optional[Booking]:
    """更新預約狀態"""
    db_booking = get_booking(db, booking_id)
    if not db_booking:
        return None
    
    db_booking.status = status.value
    db.commit()
    db.refresh(db_booking)
    return db_booking 