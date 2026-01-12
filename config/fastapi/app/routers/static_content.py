from fastapi import APIRouter


router = APIRouter()

@router.get("/endpoint")
async def enpoint():
    return {"id": 1, "firstName": "Emily"}