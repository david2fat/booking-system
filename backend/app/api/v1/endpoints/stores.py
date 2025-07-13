from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.store import Store, StoreCreate, StoreUpdate
from app.core.security import get_current_user
from app.models.user import User
from app.crud.store import get_stores, create_store, get_store, update_store, delete_store

router = APIRouter()

@router.get("/", response_model=List[Store])
def read_stores(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    owner_id: Optional[int] = Query(None, description="店舖擁有者ID"),
) -> Any:
    """
    取得所有店舖列表
    """
    stores = get_stores(db=db, skip=skip, limit=limit, owner_id=owner_id)
    return stores

@router.post("/", response_model=Store)
def create_store_endpoint(
    *,
    db: Session = Depends(get_db),
    store_in: StoreCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新店舖
    """
    store = create_store(db=db, store_in=store_in, owner_id=int(current_user.id))
    return store

@router.get("/{store_id}", response_model=Store)
def read_store(
    *,
    db: Session = Depends(get_db),
    store_id: int,
) -> Any:
    """
    根據ID取得店舖
    """
    store = get_store(db=db, store_id=store_id)
    if not store:
        raise HTTPException(status_code=404, detail="店舖不存在")
    return store

@router.put("/{store_id}", response_model=Store)
def update_store_endpoint(
    *,
    db: Session = Depends(get_db),
    store_id: int,
    store_in: StoreUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    更新店舖
    """
    store = update_store(db=db, store_id=store_id, store_in=store_in)
    if not store:
        raise HTTPException(status_code=404, detail="店舖不存在")
    return store

@router.delete("/{store_id}")
def delete_store_endpoint(
    *,
    db: Session = Depends(get_db),
    store_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    刪除店舖
    """
    success = delete_store(db=db, store_id=store_id)
    if not success:
        raise HTTPException(status_code=404, detail="店舖不存在")
    return {"message": "店舖已刪除"} 