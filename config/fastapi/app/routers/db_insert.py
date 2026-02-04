from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from typing import Optional

from app.settings import db_name, db_user, db_password

router_insert = APIRouter()


def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"
    )


class UserData(BaseModel):
    name: str
    posts: int
    location: str


class LekarzData(BaseModel):
    imie: str
    nazwisko: str
    specjalizacja: str
    telefon: Optional[str] = None
    email: Optional[str] = None
    przychodnia_id: Optional[int] = None


class PacjentData(BaseModel):
    imie: str
    nazwisko: str
    pesel: str
    data_urodzenia: Optional[str] = None
    telefon: Optional[str] = None
    email: Optional[str] = None
    adres: Optional[str] = None


class PrzychodniaData(BaseModel):
    nazwa: str
    adres: str
    telefon: Optional[str] = None
    email: Optional[str] = None
    opis: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None


@router_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        params = {
            "name": user.name,
            "posts": user.posts,
            "location": user.location
        }

        sql_query = text("""
                         insert into users (name, posts, location)
                         values (:name, :posts, :location); \
                         """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(result)

    except Exception as e:
        print(e)
        raise e

    return {"status": "success"}


@router_insert.post("/insert_lekarz")
async def insert_lekarz(lekarz: LekarzData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        params = {
            "imie": lekarz.imie,
            "nazwisko": lekarz.nazwisko,
            "specjalizacja": lekarz.specjalizacja,
            "telefon": lekarz.telefon,
            "email": lekarz.email,
            "przychodnia_id": lekarz.przychodnia_id
        }

        sql_query = text("""
            INSERT INTO lekarze (imie, nazwisko, specjalizacja, telefon, email, przychodnia_id)
            VALUES (:imie, :nazwisko, :specjalizacja, :telefon, :email, :przychodnia_id)
        """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(f"Dodano lekarza: {lekarz.imie} {lekarz.nazwisko}")

    except Exception as e:
        print(f"Błąd podczas dodawania lekarza: {e}")
        raise e

    return {"status": "success", "message": "Lekarz został dodany"}


@router_insert.post("/insert_pacjent")
async def insert_pacjent(pacjent: PacjentData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        params = {
            "imie": pacjent.imie,
            "nazwisko": pacjent.nazwisko,
            "pesel": pacjent.pesel,
            "data_urodzenia": pacjent.data_urodzenia,
            "telefon": pacjent.telefon,
            "email": pacjent.email,
            "adres": pacjent.adres
        }

        sql_query = text("""
            INSERT INTO pacjenci (imie, nazwisko, pesel, data_urodzenia, telefon, email, adres)
            VALUES (:imie, :nazwisko, :pesel, :data_urodzenia, :telefon, :email, :adres)
        """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(f"Dodano pacjenta: {pacjent.imie} {pacjent.nazwisko}")

    except Exception as e:
        print(f"Błąd podczas dodawania pacjenta: {e}")
        raise e

    return {"status": "success", "message": "Pacjent został dodany"}


@router_insert.post("/insert_przychodnia")
async def insert_przychodnia(przychodnia: PrzychodniaData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        params = {
            "nazwa": przychodnia.nazwa,
            "adres": przychodnia.adres,
            "telefon": przychodnia.telefon,
            "email": przychodnia.email,
            "opis": przychodnia.opis,
            "latitude": przychodnia.lat,
            "longitude": przychodnia.lon
        }

        if przychodnia.lat and przychodnia.lon:
            sql_query = text("""
                INSERT INTO przychodnie (nazwa, adres, telefon, email, opis, latitude, longitude, geom)
                VALUES (:nazwa, :adres, :telefon, :email, :opis, :latitude, :longitude, 
                        ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326))
            """)
        else:
            sql_query = text("""
                INSERT INTO przychodnie (nazwa, adres, telefon, email, opis, latitude, longitude)
                VALUES (:nazwa, :adres, :telefon, :email, :opis, :latitude, :longitude)
            """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(f"Dodano przychodnię: {przychodnia.nazwa}")

    except Exception as e:
        print(f"Błąd podczas dodawania przychodni: {e}")
        raise e

    return {"status": "success", "message": "Przychodnia została dodana"}