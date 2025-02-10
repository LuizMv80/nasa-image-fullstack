from typing import Optional, Annotated
from pydantic import StringConstraints, EmailStr, UUID4, model_validator
from pydantic_extra_types.phone_numbers import PhoneNumber
from .base_model import BaseModel


PhoneNumber.default_region_code =  "MX"
PhoneNumber.phone_format = "E164"
PhoneNumber.max_length = 30


class PostUserEntitie(BaseModel):

    uuid: Optional[str] = None
    rol: Optional[str] = None
    names: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    last_names: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    email: Annotated[str, EmailStr]
    phone_number: PhoneNumber
    password: Annotated[str, StringConstraints(min_length=8, max_length=15)]
    confirm_password: Annotated[str, StringConstraints(min_length=8, max_length=15)]

    @model_validator(mode="after")
    def check_passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("The passwords are not the same")
        return self
    

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "names": "Jhonson",
                    "last_names": "J.",
                    "email": "jhonson@xxxx.com",
                    "phone_number": "5532454355",
                    "password": "Pasword1234",
                    "confirm_password": "Pasword1234"
                }
            ]
        }
    }


class PutUserEntitie(BaseModel):
    uuid: str
    names: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    last_names: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    email: Annotated[str, EmailStr]
    phone_number: PhoneNumber
    

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "names": "Jhonson",
                    "last_names": "J.",
                    "email": "jhonson@xxxx.com",
                    "phone_number": "5532454355"
                }
            ]
        }
    }


class UserEntitie(BaseModel):
    uuid: str
    rol: str
    names: str
    last_names: str
    email: str
    phone_number: PhoneNumber


    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "names": "Jhonson",
                    "last_names": "J.",
                    "email": "jhonson@xxxx.com",
                    "phone_number": "5532454355"
                }
            ]
        }
    }
