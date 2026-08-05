from pydantic import BaseModel


class DeviceResponse(BaseModel):
    id: int
    name: str
    location: str
    is_active: bool

    class Config:
        from_attributes = True