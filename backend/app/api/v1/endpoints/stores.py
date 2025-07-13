from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.store import Store, StoreCreate, StoreUpdate
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Store])
def read_stores(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    取得所有店舖列表
    """
    # 這裡需要實作CRUD操作
    return []

@router.post("/", response_model=Store)
def create_store(
    *,
    db: Session = Depends(get_db),
    store_in: StoreCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新店舖
    """
    # 這裡需要實作CRUD操作
    return {}

@router.get("/{store_id}", response_model=Store)
def read_store(
    *,
    db: Session = Depends(get_db),
    store_id: int,
) -> Any:
    """
    根據ID取得店舖
    """
    # 這裡需要實作CRUD操作
    return {} 