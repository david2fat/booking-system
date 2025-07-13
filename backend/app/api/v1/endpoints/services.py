from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.service import Service, ServiceCreate, ServiceUpdate
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Service])
def read_services(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    取得所有服務列表
    """
    from app.models.service import Service as ServiceModel
    services = db.query(ServiceModel).offset(skip).limit(limit).all()
    return services

@router.post("/", response_model=Service)
def create_service(
    *,
    db: Session = Depends(get_db),
    service_in: ServiceCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    建立新服務
    """
    return {} 