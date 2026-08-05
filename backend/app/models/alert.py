import csv
import json
from io import StringIO

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.alert import Alert


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


# -------------------------------------------------------
# Get All Alerts
# -------------------------------------------------------

@router.get("/")
def get_all_alerts(
    db: Session = Depends(get_db),
):
    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )

    data = []

    for alert in alerts:

        data.append(
            {
                "id": alert.id,
                "title": alert.alert_type,
                "description": alert.message,
                "severity": alert.severity,
                "location": f"Device {alert.device_id}",
                "status": (
                    "Resolved"
                    if alert.is_resolved
                    else "New"
                ),
                "created_at": alert.created_at,
            }
        )

    return data


# -------------------------------------------------------
# Get Active Alerts
# -------------------------------------------------------

@router.get("/active")
def get_active_alerts(
    db: Session = Depends(get_db),
):
    alerts = (
        db.query(Alert)
        .filter(Alert.is_resolved == False)
        .order_by(Alert.created_at.desc())
        .all()
    )

    data = []

    for alert in alerts:

        data.append(
            {
                "id": alert.id,
                "title": alert.alert_type,
                "description": alert.message,
                "severity": alert.severity,
                "location": f"Device {alert.device_id}",
                "status": "New",
                "created_at": alert.created_at,
            }
        )

    return data


# -------------------------------------------------------
# Get Single Alert
# -------------------------------------------------------

@router.get("/{alert_id}")
def get_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return {
        "id": alert.id,
        "title": alert.alert_type,
        "description": alert.message,
        "severity": alert.severity,
        "location": f"Device {alert.device_id}",
        "status": (
            "Resolved"
            if alert.is_resolved
            else "New"
        ),
        "created_at": alert.created_at,
    }


# -------------------------------------------------------
# Resolve Alert
# -------------------------------------------------------

@router.put("/{alert_id}/resolve")
def resolve_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    alert.is_resolved = True

    db.commit()
    db.refresh(alert)

    return {
        "message": "Alert resolved successfully",
        "alert": {
            "id": alert.id,
            "title": alert.alert_type,
            "description": alert.message,
            "severity": alert.severity,
            "location": f"Device {alert.device_id}",
            "status": "Resolved",
            "created_at": alert.created_at,
        },
    }


# -------------------------------------------------------
# Delete Alert
# -------------------------------------------------------

@router.delete("/{alert_id}")
def delete_alert(
    alert_id: int,
    db: Session = Depends(get_db),
):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if alert is None:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    db.delete(alert)
    db.commit()

    return {
        "message": "Alert deleted successfully"
    }


# -------------------------------------------------------
# Export CSV
# -------------------------------------------------------

@router.get("/export/csv")
def export_csv(
    db: Session = Depends(get_db),
):
    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow(
        [
            "ID",
            "Type",
            "Message",
            "Severity",
            "Location",
            "Status",
            "Created At",
        ]
    )

    for alert in alerts:

        writer.writerow(
            [
                alert.id,
                alert.alert_type,
                alert.message,
                alert.severity,
                f"Device {alert.device_id}",
                (
                    "Resolved"
                    if alert.is_resolved
                    else "New"
                ),
                alert.created_at,
            ]
        )

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=alerts.csv"
        },
    )


# -------------------------------------------------------
# Export JSON
# -------------------------------------------------------

@router.get("/export/json")
def export_json(
    db: Session = Depends(get_db),
):
    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )

    data = []

    for alert in alerts:

        data.append(
            {
                "id": alert.id,
                "title": alert.alert_type,
                "description": alert.message,
                "severity": alert.severity,
                "location": f"Device {alert.device_id}",
                "status": (
                    "Resolved"
                    if alert.is_resolved
                    else "New"
                ),
                "created_at": str(
                    alert.created_at
                ),
            }
        )

    return StreamingResponse(
        iter(
            [
                json.dumps(
                    data,
                    indent=4,
                )
            ]
        ),
        media_type="application/json",
        headers={
            "Content-Disposition":
            "attachment; filename=alerts.json"
        },
    )