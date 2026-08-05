from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)

    temperature = Column(Float, nullable=False)

    humidity = Column(Float, nullable=False)

    gas_level = Column(Float, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    device_id = Column(
        Integer,
        ForeignKey("devices.id"),
        nullable=False,
    )

    device = relationship("Device")