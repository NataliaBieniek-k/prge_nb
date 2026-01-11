from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text
from pydantic import BaseModel
import os

router_insert = APIRouter()


class UserRequest(BaseModel):
    name: str
    posts: int
    location: str


def connect_to_db():
    db_host = os.getenv("POSTGRES_HOST", "postgis")
    db_port = "5432"
    db_name = os.getenv("POSTGRES_DB", "postgres")
    db_user = os.getenv("POSTGRES_USER", "postgres")
    db_password = os.getenv("POSTGRES_PASSWORD", "postgres")

    connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    print(f"Connecting to: postgresql://{db_user}:***@{db_host}:{db_port}/{db_name}")
    return create_engine(connection_string)


@router_insert.post("/insert_user")
async def insert_user(request: UserRequest):
    try:
        db_connection = connect_to_db()

        sql_query = text("""
                         INSERT INTO public.users (name, posts, location)
                         VALUES (:name, :posts, :location)
                         """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, {
                "name": request.name,
                "posts": request.posts,
                "location": request.location
            })
            conn.commit()

        return {"status": "success", "message": "User inserted"}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))