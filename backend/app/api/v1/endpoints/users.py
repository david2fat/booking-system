from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud.user import get_user, get_users, update_user, delete_user
from app.schemas.user import User, UserUpdate
from app.core.security import get_current_user

router = APIRouter()

@router.get("/me", response_model=User)
def read_user_me(
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    取得當前使用者資訊
    """
    return current_user

@router.get("/{user_id}", response_model=User)
def read_user(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Any:
    """
    根據ID取得使用者
    """
    user = get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="使用者不存在")
    return user

@router.put("/me", response_model=User)
def update_user_me(
    *,
    db: Session = Depends(get_db),
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    更新當前使用者資訊
    """
    user = update_user(db, db_obj=current_user, obj_in=user_in)
    return user 