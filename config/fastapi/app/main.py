from fastapi import FastAPI
from routers.static_content import router
from routers.db_insert import router_insert
app = FastAPI(title="Mapbook API")

app.include_router(router, prefix="/app")
app.include_router(router_insert, prefix="/app")