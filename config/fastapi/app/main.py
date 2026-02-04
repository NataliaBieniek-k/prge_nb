from fastapi import FastAPI
from app.routers.static_content import router
from app.routers.db_insert import router_insert
from app.routers.dynamic_content import router_get_lekarze, router_get_pacjenci, router_get_przychodnie

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mapbook API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/app")
app.include_router(router_insert, prefix="/app")
app.include_router(router_get_lekarze, prefix="/app")
app.include_router(router_get_pacjenci, prefix="/app")
app.include_router(router_get_przychodnie, prefix="/app")