import os
from dotenv import load_dotenv

load_dotenv()  # For loading ENV variables from .env file

ENV = os.getenv("ENV")
# ENV = "development"
# ENV = "production"

local = {
    "ENV": "local",
    "APP_URL": "http://localhost:3000",
    "API_URL": "http://localhost:8000/",
}

development = {
    "ENV": "development",
    "APP_URL": "http://localhost:3000/",
    "API_URL": "http://localhost:8000/",
}

production = {
    "ENV": "production",
    "APP_URL": "https://electroswap.vercel.app/",
    "API_URL": "https://electroswapapi.herokuapp.com/",
}

config = (
    local if ENV == "local" else development if ENV == "development" else production
)

APP_URL = config["APP_URL"]
API_URL = config["API_URL"]
