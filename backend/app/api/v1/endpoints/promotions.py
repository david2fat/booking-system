from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.promotion import Promotion, PromotionCreate
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Promotion])
def read_promotions(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    取得促銷活動列表
    """
    return []

@router.post("/", response_model=Promotion)
def create_promotion(
    *,
    db: Session = Depends(get_db),
    promotion_in: PromotionCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新促銷活動
    """
    return {} 