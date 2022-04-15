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
    "RAZORPAY_ID": "rzp_test_oh38vXeImszCBC",
    "RAZORPAY_SECRET": "q3tr1pWtMHgd9F1Beles5Nwx",
}

development = {
    "ENV": "development",
    "APP_URL": "http://localhost:3000",
    "API_URL": "http://localhost:8000/",
    "RAZORPAY_ID": "rzp_test_oh38vXeImszCBC",
    "RAZORPAY_SECRET": "q3tr1pWtMHgd9F1Beles5Nwx",
}

production = {
    "ENV": "production",
    "APP_URL": "https://electroswap.vercel.app",
    "API_URL": "https://electroswapapi.herokuapp.com/",
    "RAZORPAY_ID": "rzp_test_oh38vXeImszCBC",
    "RAZORPAY_SECRET": "q3tr1pWtMHgd9F1Beles5Nwx",
}

config = (
    local if ENV == "local" else development if ENV == "development" else production
)

APP_URL = config["APP_URL"]
API_URL = config["API_URL"]
RAZORPAY_ID = config["RAZORPAY_ID"]
RAZORPAY_SECRET = config["RAZORPAY_SECRET"]
