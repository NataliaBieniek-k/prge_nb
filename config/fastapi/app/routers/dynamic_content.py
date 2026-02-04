from fastapi import APIRouter
from sqlalchemy import create_engine, text
from app.settings import db_name, db_user, db_password

router_get_lekarze = APIRouter()
router_get_pacjenci = APIRouter()
router_get_przychodnie = APIRouter()


def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"
    )


@router_get_lekarze.get("/get_lekarze")
async def get_lekarze():
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        sql_query = text("""SELECT * FROM lekarze""")

        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            lekarze = [dict(row._mapping) for row in result]

        return {"status": "success", "data": lekarze}

    except Exception as e:
        print(f'Błąd podczas get_lekarze: {e}')
        return {"status": 'error', "message": str(e)}


@router_get_pacjenci.get("/get_pacjenci")
async def get_pacjenci():
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        sql_query = text("""SELECT * FROM pacjenci""")

        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            pacjenci = [dict(row._mapping) for row in result]

        return {"status": "success", "data": pacjenci}

    except Exception as e:
        print(f'Błąd podczas get_pacjenci: {e}')
        return {"status": 'error', "message": str(e)}


@router_get_przychodnie.get("/get_przychodnie")
async def get_przychodnie():
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        sql_query = text("""
            SELECT 
                id,
                nazwa,
                adres,
                latitude as lat,
                longitude as lon,
                telefon,
                email,
                opis,
                zdjecie
            FROM przychodnie
        """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            przychodnie = [dict(row._mapping) for row in result]

        return {"status": "success", "data": przychodnie}

    except Exception as e:
        print(f'Błąd podczas get_przychodnie: {e}')
        return {"status": 'error', "message": str(e)}