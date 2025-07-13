from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.store import Store
from app.schemas.store import StoreCreate, StoreUpdate

def get_store(db: Session, store_id: int) -> Optional[Store]:
    """根據ID取得店舖"""
    return db.query(Store).filter(Store.id == store_id).first()

def get_stores(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    owner_id: Optional[int] = None
) -> List[Store]:
    """取得店舖列表"""
    query = db.query(Store)
    
    if owner_id:
        query = query.filter(Store.owner_id == owner_id)
    
    return query.offset(skip).limit(limit).all()

def create_store(db: Session, store_in: StoreCreate, owner_id: int) -> Store:
    """建立新店舖"""
    db_store = Store(
        name=store_in.name,
        address=store_in.address,
        phone=store_in.phone,
        email=store_in.email,
        business_hours=store_in.business_hours,
        description=store_in.description,
        owner_id=owner_id
    )
    
    db.add(db_store)
    db.commit()
    db.refresh(db_store)
    return db_store

def update_store(db: Session, store_id: int, store_in: StoreUpdate) -> Optional[Store]:
    """更新店舖"""
    db_store = get_store(db, store_id)
    if not db_store:
        return None
    
    update_data = store_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_store, field, value)
    
    db.commit()
    db.refresh(db_store)
    return db_store

def delete_store(db: Session, store_id: int) -> bool:
    """刪除店舖"""
    db_store = get_store(db, store_id)
    if not db_store:
        return False
    
    db.delete(db_store)
    db.commit()
    return True 