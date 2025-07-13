from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.notification import NotificationType

class NotificationBase(BaseModel):
    title: str
    message: str
    notification_type: NotificationType

class Notification(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    sent_at: datetime

    class Config:
        from_attributes = True 