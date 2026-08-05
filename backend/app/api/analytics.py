from io import StringIO
import csv
import json

from fastapi import (
    APIRouter,
    Depends,
)

from fastapi.responses import (
    StreamingResponse,
)

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user

from app.models.user import User
from app.models.sensor_reading import SensorReading
from app.models.device import Device


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


# -------------------------------------------------
# Get Analytics
# -------------------------------------------------

@router.get("/")
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    readings = (
        db.query(SensorReading)
        .join(Device)
        .order_by(SensorReading.created_at.desc())
        .limit(100)
        .all()
    )

    analytics = []

    for reading in readings:

        gas = reading.gas_level

        if gas < 100:
            status = "Safe"

        elif gas < 200:
            status = "Moderate"

        else:
            status = "Warning"

        analytics.append(
            {
                "id": reading.id,

                "temperature": reading.temperature,

                "humidity": reading.humidity,

                "gas_level": reading.gas_level,

                # Temporary AQI
                "air_quality": int(reading.gas_level),

                # Device name
                "zone": getattr(
                    reading.device,
                    "device_name",
                    f"Device {reading.device_id}",
                ),

                "status": status,

                "created_at": reading.created_at,
            }
        )

    return analytics


# -------------------------------------------------
# Export CSV
# -------------------------------------------------

@router.get("/export/csv")
def export_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    readings = (
        db.query(SensorReading)
        .join(Device)
        .order_by(SensorReading.created_at.desc())
        .all()
    )

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow(
        [
            "ID",
            "Temperature",
            "Humidity",
            "Gas Level",
            "AQI",
            "Zone",
            "Status",
            "Created At",
        ]
    )

    for reading in readings:

        gas = reading.gas_level

        if gas < 100:
            status = "Safe"

        elif gas < 200:
            status = "Moderate"

        else:
            status = "Warning"

        writer.writerow(
            [
                reading.id,
                reading.temperature,
                reading.humidity,
                reading.gas_level,
                int(reading.gas_level),
                getattr(
                    reading.device,
                    "device_name",
                    f"Device {reading.device_id}",
                ),
                status,
                reading.created_at,
            ]
        )

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=analytics.csv"
        },
    )


# -------------------------------------------------
# Export JSON
# -------------------------------------------------

@router.get("/export/json")
def export_json(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    readings = (
        db.query(SensorReading)
        .join(Device)
        .order_by(SensorReading.created_at.desc())
        .all()
    )

    data = []

    for reading in readings:

        gas = reading.gas_level

        if gas < 100:
            status = "Safe"

        elif gas < 200:
            status = "Moderate"

        else:
            status = "Warning"

        data.append(
            {
                "id": reading.id,
                "temperature": reading.temperature,
                "humidity": reading.humidity,
                "gas_level": reading.gas_level,
                "air_quality": int(reading.gas_level),
                "zone": getattr(
                    reading.device,
                    "device_name",
                    f"Device {reading.device_id}",
                ),
                "status": status,
                "created_at": str(reading.created_at),
            }
        )

    return StreamingResponse(
        iter([json.dumps(data, indent=4)]),
        media_type="application/json",
        headers={
            "Content-Disposition":
            "attachment; filename=analytics.json"
        },
    )