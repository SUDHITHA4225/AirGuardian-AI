from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    report_type = Column(String)

    generated_by = Column(String)

    file_name = Column(String)

    created_at = Column(
        DateTime,
        server_default=func.now(),
    )