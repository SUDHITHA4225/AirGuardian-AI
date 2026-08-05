from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)

    device_id = Column(String(100), unique=True, nullable=False)

    name = Column(String(100), nullable=False)

    location = Column(String(150))

    is_active = Column(Boolean, default=True)

    owner_id = Column(Integer, ForeignKey("users.id"))