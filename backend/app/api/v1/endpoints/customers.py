from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.customer import Customer, CustomerCreate, CustomerUpdate
from app.core.security import get_current_user
from app.models.user import User
from app.crud.customer import (
    get_customers, create_customer, get_customer, 
    update_customer, delete_customer, get_customer_by_phone
)

router = APIRouter()

@router.get("/", response_model=List[Customer])
def read_customers(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    store_id: Optional[int] = Query(None, description="店舖ID"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    取得客戶列表
    """
    customers = get_customers(db=db, skip=skip, limit=limit, store_id=store_id)
    return customers

@router.post("/", response_model=Customer)
def create_customer_endpoint(
    *,
    db: Session = Depends(get_db),
    customer_in: CustomerCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新客戶
    """
    # 檢查電話號碼是否已存在
    existing_customer = get_customer_by_phone(db, customer_in.phone)
    if existing_customer:
        raise HTTPException(status_code=400, detail="此電話號碼已被使用")
    
    # 預設使用第一個店舖
    store_id = 1
    customer = create_customer(db=db, customer_in=customer_in, store_id=store_id)
    return customer

@router.get("/{customer_id}", response_model=Customer)
def read_customer(
    *,
    db: Session = Depends(get_db),
    customer_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    根據ID取得客戶
    """
    customer = get_customer(db=db, customer_id=customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="客戶不存在")
    return customer

@router.put("/{customer_id}", response_model=Customer)
def update_customer_endpoint(
    *,
    db: Session = Depends(get_db),
    customer_id: int,
    customer_in: CustomerUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    更新客戶資料
    """
    customer = update_customer(db=db, customer_id=customer_id, customer_in=customer_in)
    if not customer:
        raise HTTPException(status_code=404, detail="客戶不存在")
    return customer

@router.delete("/{customer_id}")
def delete_customer_endpoint(
    *,
    db: Session = Depends(get_db),
    customer_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    刪除客戶
    """
    success = delete_customer(db=db, customer_id=customer_id)
    if not success:
        raise HTTPException(status_code=404, detail="客戶不存在")
    return {"message": "客戶已刪除"} 