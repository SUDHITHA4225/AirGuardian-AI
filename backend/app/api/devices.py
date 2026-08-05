from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.device import Device
from app.schemas.device import DeviceResponse

router = APIRouter(
    prefix="/devices",
    tags=["Devices"],
)


@router.get(
    "",
    response_model=list[DeviceResponse],
)
def get_devices(
    db: Session = Depends(get_db),
):
    return db.query(Device).all()