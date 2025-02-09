from pydantic import UUID4
from pydantic.alias_generators import to_pascal
from pydantic import ConfigDict, BaseModel as PydanticBaseModel


class BaseModel(PydanticBaseModel):
    model_config = ConfigDict(
        alias_generator=to_pascal,
        populate_by_name=True,
        from_attributes=True,
        json_encoders = {
            UUID4: str
        }
    )


class BaseModelCamelCase(PydanticBaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
    )
