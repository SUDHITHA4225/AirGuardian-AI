from datetime import datetime

from pydantic import BaseModel


class ReportCreate(BaseModel):
    title: str
    report_type: str


class ReportResponse(BaseModel):
    id: int
    title: str
    report_type: str
    generated_by: str
    file_name: str
    created_at: datetime

    class Config:
        from_attributes = True