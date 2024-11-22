import os
from dotenv import load_dotenv

from datetime import datetime, UTC
from libs.render import render
from api.router import user_router, assets_router

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse, HTMLResponse, RedirectResponse, Response
from fastapi.middleware.gzip import GZipMiddleware

isActiveApp = False

app = FastAPI(docs_url='/api/docs/v1/')
app.add_middleware(GZipMiddleware, minimum_size=100)
app.mount("/public", StaticFiles(directory="public"), name="public")

#-----------------------------------------------------------------------------#
#--------------------------Assets endpoints with router-----------------------#
#-----------------------------------------------------------------------------#

app.include_router(assets_router)

#-----------------------------------------------------------------------------#
#------------------------------SSR endpoints----------------------------------#
#-----------------------------------------------------------------------------#

@app.get("/", include_in_schema=False)
def main_page():
    return HTMLResponse(render([]), media_type='text/html')


@app.post("/login", include_in_schema=False)
async def login_page(request: Request):
    load_dotenv()
    passwords = os.environ["PASSWORDS"].split(',')
    password = await request.json()

    global isActiveApp

    if password['password'] in passwords:
        isActiveApp = datetime.now(UTC)
        return Response(status_code=200)
    isActiveApp = False
    return Response(status_code=404)

@app.get("/case", include_in_schema=False)
def case_page():
    global isActiveApp
    if not isActiveApp:
        return RedirectResponse('/', status_code=302)
    return HTMLResponse(render({ "view": "case", "timerDate": isActiveApp.strftime("%m/%d/%Y, %H:%M:%S") }), media_type='text/html')

@app.get("/logout", include_in_schema=False)
def logout_page():
    global isActiveApp
    isActiveApp = False
    return RedirectResponse('/', status_code=302)

# @app.get("/docs", include_in_schema=False)
# def docs_page():
#     return HTMLResponse(render({ "view": "docs" }), media_type='text/html')

#-----------------------------------------------------------------------------#
#-------------------------API endpoints with router---------------------------#
#-----------------------------------------------------------------------------#

app.include_router(user_router)
