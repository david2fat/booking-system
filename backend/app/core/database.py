from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# 建立資料庫引擎
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    echo=True  # 開發環境顯示SQL語句
)

# 建立會話工廠
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 建立基礎模型類
Base = declarative_base()

# 依賴注入函數
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 