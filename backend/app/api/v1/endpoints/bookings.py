from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date

from app.core.database import get_db
from app.schemas.booking import Booking, BookingCreate, BookingUpdate
from app.core.security import get_current_user
from app.models.user import User
from app.crud.booking import (
    get_bookings, create_booking, get_booking, 
    update_booking, delete_booking, update_booking_status
)
from app.models.booking import BookingStatus

router = APIRouter()

@router.get("/", response_model=List[Booking])
def read_bookings(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    customer_id: Optional[int] = Query(None, description="客戶ID"),
    store_id: Optional[int] = Query(None, description="店舖ID"),
    status: Optional[BookingStatus] = Query(None, description="預約狀態"),
    date_from: Optional[date] = Query(None, description="開始日期"),
    date_to: Optional[date] = Query(None, description="結束日期"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    取得預約列表
    """
    bookings = get_bookings(
        db=db,
        skip=skip,
        limit=limit,
        customer_id=customer_id,
        store_id=store_id,
        status=status,
        date_from=date_from,
        date_to=date_to
    )
    return bookings

@router.post("/", response_model=Booking)
def create_booking_endpoint(
    *,
    db: Session = Depends(get_db),
    booking_in: BookingCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新預約
    """
    # 從 booking_in 中取得 customer_id，如果沒有則使用當前使用者ID
    customer_id = getattr(booking_in, 'customer_id', None)
    if customer_id is None:
        customer_id = int(current_user.id)
    
    booking = create_booking(db=db, booking_in=booking_in, customer_id=customer_id)
    return booking

@router.get("/{booking_id}", response_model=Booking)
def read_booking(
    *,
    db: Session = Depends(get_db),
    booking_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    根據ID取得預約
    """
    booking = get_booking(db=db, booking_id=booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="預約不存在")
    return booking

@router.put("/{booking_id}", response_model=Booking)
def update_booking_endpoint(
    *,
    db: Session = Depends(get_db),
    booking_id: int,
    booking_in: BookingUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    更新預約
    """
    booking = update_booking(db=db, booking_id=booking_id, booking_in=booking_in)
    if not booking:
        raise HTTPException(status_code=404, detail="預約不存在")
    return booking

@router.delete("/{booking_id}")
def delete_booking_endpoint(
    *,
    db: Session = Depends(get_db),
    booking_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    刪除預約
    """
    success = delete_booking(db=db, booking_id=booking_id)
    if not success:
        raise HTTPException(status_code=404, detail="預約不存在")
    return {"message": "預約已刪除"}

@router.patch("/{booking_id}/status")
def update_booking_status_endpoint(
    *,
    db: Session = Depends(get_db),
    booking_id: int,
    status: BookingStatus,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    更新預約狀態
    """
    booking = update_booking_status(db=db, booking_id=booking_id, status=status)
    if not booking:
        raise HTTPException(status_code=404, detail="預約不存在")
    return {"message": f"預約狀態已更新為 {status.value}"} 