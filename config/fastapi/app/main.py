from fastapi import FastAPI
from app.routers.static_content import router as static_router
from app.routers.db_insert import router_insert

app = FastAPI(title="Mapbook API")

@app.get("/")
async def root():
    return {
        "message": "Mapbook API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

app.include_router(static_router, prefix="/app", tags=["Static"])
app.include_router(router_insert, prefix="/app", tags=["Database"])