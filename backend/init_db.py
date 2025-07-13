from sqlalchemy.orm import Session
from app.core.database import engine, SessionLocal
from app.models import Base, User, Store, Service, Employee, Customer
from app.core.security import get_password_hash
from app.models.user import UserRole

def init_db():
    # 創建所有表
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # 檢查是否已有資料
        existing_user = db.query(User).first()
        if existing_user:
            print("資料庫已有資料，跳過初始化")
            return
        
        # 創建測試用戶
        test_user = User(
            email="test@example.com",
            username="testuser",
            full_name="測試用戶",
            hashed_password=get_password_hash("test123"),
            role=UserRole.ADMIN,
            is_active=True,
            is_verified=True
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        # 創建測試店舖
        test_store = Store(
            name="總店",
            address="台北市信義區信義路五段7號",
            phone="02-2345-6789",
            email="store@example.com",
            business_hours="09:00-21:00",
            description="主要營業據點",
            owner_id=test_user.id
        )
        db.add(test_store)
        db.commit()
        db.refresh(test_store)
        
        # 創建測試服務
        services = [
            Service(
                name="美髮",
                description="專業美髮服務",
                duration=60,  # 分鐘
                price=1000,   # 分
                store_id=test_store.id
            ),
            Service(
                name="美甲",
                description="專業美甲服務",
                duration=90,
                price=1500,
                store_id=test_store.id
            ),
            Service(
                name="按摩",
                description="專業按摩服務",
                duration=120,
                price=2000,
                store_id=test_store.id
            ),
            Service(
                name="美容",
                description="專業美容服務",
                duration=90,
                price=1800,
                store_id=test_store.id
            )
        ]
        
        for service in services:
            db.add(service)
        db.commit()
        
        # 創建測試員工
        employees = [
            Employee(
                user_id=test_user.id,
                store_id=test_store.id,
                position="美髮師",
                specializations="剪髮,染髮,燙髮",
                working_hours="09:00-18:00",
                is_active=True
            ),
            Employee(
                user_id=test_user.id,
                store_id=test_store.id,
                position="美甲師",
                specializations="指甲彩繪,手部保養",
                working_hours="10:00-19:00",
                is_active=True
            ),
            Employee(
                user_id=test_user.id,
                store_id=test_store.id,
                position="按摩師",
                specializations="全身按摩,腳底按摩",
                working_hours="11:00-20:00",
                is_active=True
            )
        ]
        
        for employee in employees:
            db.add(employee)
        db.commit()
        
        # 創建測試客戶
        customers = [
            Customer(
                name="張小姐",
                phone="0912-345-678",
                email="zhang@example.com",
                address="台北市信義區",
                notes="VIP客戶",
                store_id=test_store.id
            ),
            Customer(
                name="李先生",
                phone="0923-456-789",
                email="li@example.com",
                address="台北市大安區",
                notes="新客戶",
                store_id=test_store.id
            ),
            Customer(
                name="王太太",
                phone="0934-567-890",
                email="wang@example.com",
                address="台北市松山區",
                notes="常客",
                store_id=test_store.id
            )
        ]
        
        for customer in customers:
            db.add(customer)
        db.commit()
        
        print("資料庫初始化完成！")
        print(f"測試用戶: test@example.com / test123")
        print(f"創建了 {len(services)} 個服務")
        print(f"創建了 {len(employees)} 個員工")
        print(f"創建了 {len(customers)} 個客戶")
        
    except Exception as e:
        print(f"初始化失敗: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db() 