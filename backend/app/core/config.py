from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # 基本設定
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "線上預約系統"
    
    # 資料庫設定
    DATABASE_URL: str = "postgresql://user:password@localhost/booking_system"
    
    # Redis設定
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT設定
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # 第三方服務設定
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_PUBLISHABLE_KEY: Optional[str] = None
    
    # AWS S3設定
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "us-east-1"
    S3_BUCKET_NAME: Optional[str] = None
    
    # Firebase設定
    FIREBASE_CREDENTIALS_PATH: Optional[str] = None
    
    # 檔案上傳設定
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "uploads"
    
    # 郵件設定
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 