from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.payment import Payment, PaymentCreate
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Payment])
def read_payments(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    取得支付記錄
    """
    return []

@router.post("/", response_model=Payment)
def create_payment(
    *,
    db: Session = Depends(get_db),
    payment_in: PaymentCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新支付記錄
    """
    return {} 