from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, stores, services, bookings, payments, promotions, notifications, customers

api_router = APIRouter()

# 包含各個端點路由
api_router.include_router(auth.router, prefix="/auth", tags=["認證"])
api_router.include_router(users.router, prefix="/users", tags=["使用者"])
api_router.include_router(stores.router, prefix="/stores", tags=["店舖"])
api_router.include_router(services.router, prefix="/services", tags=["服務"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["預約"])
api_router.include_router(customers.router, prefix="/customers", tags=["客戶"])
api_router.include_router(payments.router, prefix="/payments", tags=["支付"])
api_router.include_router(promotions.router, prefix="/promotions", tags=["促銷"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["通知"]) 