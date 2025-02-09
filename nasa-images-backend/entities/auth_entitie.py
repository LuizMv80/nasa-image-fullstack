from typing import Annotated
from pydantic import StringConstraints, EmailStr
from .base_model import BaseModel


class Auth(BaseModel):
    email: Annotated[str, EmailStr]
    password: Annotated[str, StringConstraints(min_length=8, max_length=15)]


    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "email": "jhonson@email.com",
                    "password": "xxxxxxxxxx"
                }
            ]
        }
    }
