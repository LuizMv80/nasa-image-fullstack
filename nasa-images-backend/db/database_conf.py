from dotenv import dotenv_values
from sqlalchemy.engine import URL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase


env = dotenv_values('.env')


SQLALCHEMY_DATABASE_URL = URL.create(
    drivername=str(env['RBDMS']),
    username=str(env['USER']),
    password=str(env['PASSWORD']),
    host=str(env['HOST']),
    port=int(str(env['PORT'])),
    database=str(env['DATABASE']),
)


engine = create_engine(SQLALCHEMY_DATABASE_URL)
LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Declarative base for all SQLAlchemy models used in the project."""


def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()
