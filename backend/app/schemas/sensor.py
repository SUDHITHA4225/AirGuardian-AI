from pydantic import BaseModel


class SensorReadingCreate(BaseModel):
    device_id: int
    temperature: float
    humidity: float
    gas_level: float