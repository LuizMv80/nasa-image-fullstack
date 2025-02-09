from typing import Annotated
from pydantic import StringConstraints, EmailStr, UUID4
from pydantic_extra_types.phone_numbers import PhoneNumber
from .base_model import BaseModel


class PayloadEntitie(BaseModel):
    uuid:UUID4
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
                    "phone_number": "553245435"
                }
            ]
        }
    }