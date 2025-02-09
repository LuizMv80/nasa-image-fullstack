import uvicorn
from dotenv import dotenv_values
from datetime import datetime
from fastapi import FastAPI, status, Request
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.utils import get_openapi
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from tools.looger import Logger
from router.router_users import router_users
from router.auth import router_auth


env = dotenv_values(".env")
HOST = str(env["HOST_APP"])
PORT = str(env["PORT_APP"])
RELOAD = str(env["RELOAD"])
BASE_URL = str(env["BASE_URL"])
NOW = datetime.now()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(router_users, prefix=BASE_URL)
app.include_router(router_auth, prefix=BASE_URL)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=[
        "access-control-allow-headers",
        "access-control-allow-origin",
        "access-control-allow-methods",
        "content-type",
        "referrer-policy",
        "authorization",
        "x-cacheintreset",
    ],
    expose_headers=["*"]
)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="NASA-IMAGES",
        version="1.0." + NOW.strftime("%Y%m%d"),
        description="",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "/static/logo-enginecore.jpg" #TODO poner mi logo
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    Logger.error(f"Error ocurrido: {exc.args[0]}")
    return JSONResponse(
        status_code=500,
        content={"detail": exc.args[0]},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_router(request, exc):
    try:
        list_errors = []
        list_msg = []
        for err in exc.errors():
            list_errors.append(err["loc"][-1])
            list_msg.append(err["msg"])
        all_errors = ", ".join(list_errors)
        all_msg = ", ".join(list_msg)
        message = f"Properties {all_errors} are required or are not correct. {all_msg}"
    except Exception as e:
        message = exc.errors()[0]["msg"] if exc.errors(
        ) else "Error validation."
    Logger.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": message}
    )


if __name__ == "__main__":
    print(f"Api NASA-IMAGES is now listening on port {int(PORT)}.")
    uvicorn.run(app, host=str(HOST), port=int(PORT))
