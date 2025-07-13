from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.notification import Notification
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Notification])
def read_notifications(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    取得使用者通知
    """
    return []

@router.put("/{notification_id}/read")
def mark_as_read(
    *,
    db: Session = Depends(get_db),
    notification_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    標記通知為已讀
    """
    return {"message": "通知已標記為已讀"} 