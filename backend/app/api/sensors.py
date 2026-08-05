from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.sensor_reading import SensorReading
from app.models.device import Device
from app.models.alert import Alert

from app.schemas.sensor import SensorReadingCreate

router = APIRouter(
    prefix="/sensors",
    tags=["Sensors"],
)


@router.post("/")
def create_reading(
    reading: SensorReadingCreate,
    db: Session = Depends(get_db),
):
    sensor = SensorReading(
        device_id=reading.device_id,
        temperature=reading.temperature,
        humidity=reading.humidity,
        gas_level=reading.gas_level,
    )

    db.add(sensor)
    db.commit()
    db.refresh(sensor)

    # -------------------------
    # Automatic Alert Generation
    # -------------------------

    if reading.gas_level > 200:
        gas_alert = Alert(
            device_id=reading.device_id,
            alert_type="Gas",
            message="Dangerous gas concentration detected",
            severity="Critical",
        )
        db.add(gas_alert)

    if reading.temperature > 45:
        temp_alert = Alert(
            device_id=reading.device_id,
            alert_type="Temperature",
            message="High temperature detected",
            severity="High",
        )
        db.add(temp_alert)

    if reading.humidity > 85:
        humidity_alert = Alert(
            device_id=reading.device_id,
            alert_type="Humidity",
            message="High humidity detected",
            severity="Medium",
        )
        db.add(humidity_alert)

    db.commit()

    return {
        "message": "Sensor reading stored successfully",
        "id": sensor.id,
    }


@router.get("/latest")
def latest_readings(
    db: Session = Depends(get_db),
):
    readings = (
        db.query(SensorReading)
        .order_by(SensorReading.created_at.desc())
        .limit(10)
        .all()
    )

    return readings


@router.get("/latest/{device_id}")
def latest_device_reading(
    device_id: int,
    db: Session = Depends(get_db),
):
    reading = (
        db.query(SensorReading)
        .filter(SensorReading.device_id == device_id)
        .order_by(SensorReading.created_at.desc())
        .first()
    )

    if reading is None:
        return {
            "message": "No sensor readings found"
        }

    return reading


@router.get("/history/{device_id}")
def sensor_history(
    device_id: int,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    readings = (
        db.query(SensorReading)
        .filter(SensorReading.device_id == device_id)
        .order_by(SensorReading.created_at.desc())
        .limit(limit)
        .all()
    )

    return readings


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
):
    total_devices = db.query(Device).count()

    total_readings = db.query(SensorReading).count()

    latest = (
        db.query(SensorReading)
        .order_by(SensorReading.created_at.desc())
        .first()
    )

    active_alerts = (
        db.query(Alert)
        .filter(Alert.is_resolved == False)
        .count()
    )

    return {
        "total_devices": total_devices,
        "total_readings": total_readings,
        "active_alerts": active_alerts,
        "latest_reading": latest,
    }