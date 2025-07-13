from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate

def get_customer(db: Session, customer_id: int) -> Optional[Customer]:
    """根據ID取得客戶"""
    return db.query(Customer).filter(Customer.id == customer_id).first()

def get_customers(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    store_id: Optional[int] = None
) -> List[Customer]:
    """取得客戶列表"""
    query = db.query(Customer)
    
    if store_id:
        query = query.filter(Customer.store_id == store_id)
    
    return query.offset(skip).limit(limit).all()

def create_customer(db: Session, customer_in: CustomerCreate, store_id: int) -> Customer:
    """建立新客戶"""
    customer = Customer(
        name=customer_in.name,
        phone=customer_in.phone,
        email=customer_in.email,
        address=customer_in.address,
        notes=customer_in.notes,
        store_id=store_id
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer

def update_customer(db: Session, customer_id: int, customer_in: CustomerUpdate) -> Optional[Customer]:
    """更新客戶資料"""
    customer = get_customer(db, customer_id)
    if not customer:
        return None
    
    for field, value in customer_in.dict(exclude_unset=True).items():
        setattr(customer, field, value)
    
    db.commit()
    db.refresh(customer)
    return customer

def delete_customer(db: Session, customer_id: int) -> bool:
    """刪除客戶"""
    customer = get_customer(db, customer_id)
    if not customer:
        return False
    
    db.delete(customer)
    db.commit()
    return True

def get_customer_by_phone(db: Session, phone: str) -> Optional[Customer]:
    """根據電話號碼取得客戶"""
    return db.query(Customer).filter(Customer.phone == phone).first()

def get_customer_by_email(db: Session, email: str) -> Optional[Customer]:
    """根據電子郵件取得客戶"""
    return db.query(Customer).filter(Customer.email == email).first() 