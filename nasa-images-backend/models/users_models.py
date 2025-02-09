from uuid import uuid4
from sqlalchemy import (
    Column,
    FetchedValue,
    String,
    Boolean
)
from db.database_conf import Base


class PostUser(Base):
    __tablename__ = "users"

    uuid = Column(
        String, primary_key=True,
        server_default=FetchedValue(),
        default=uuid4)
    rol = Column(String, server_default=FetchedValue(), nullable=True)
    names = Column(String, nullable=False)
    last_names = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    password = Column(String, nullable=False)
    active = Column(Boolean, nullable=False, default=True)
