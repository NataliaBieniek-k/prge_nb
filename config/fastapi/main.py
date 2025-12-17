from fastapi import FastAPI



app = FastAPI(title='Mapbook API')

@app.get('/endpoint')
async def endpoint()
    return {'Hello': 'World'}