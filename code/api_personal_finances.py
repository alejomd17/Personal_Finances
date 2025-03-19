from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from src.interest_rates import InterestRates
from src.amortization import Amortization

app = FastAPI()
interest_rates = InterestRates()

app.mount("/static", StaticFiles(directory="static"), name="static")
class InterestRatesRequest(BaseModel):
    initial_rate:float
    rate_type:str
    initial_period:str
    wished_period:str

class AmortizationRequest(BaseModel):
    loan_amount:int
    interest_rate:float
    type_rate:str
    period:str
    loan_term_years:int

@app.post('/calculate_interest_rate/')
async def calculate_interest_rates(request: InterestRatesRequest)     :
    try:
        rates_work = interest_rates.calculate_interest_rate(
            request.initial_rate,
            request.rate_type,
            request.initial_period,
            request.wished_period,
            )
        
        return {"interest_rate":rates_work}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post('/calculate_amortization_table/')
async def calculate_amortization_table(request: AmortizationRequest)     :
    try:
        amortization_table = Amortization.calculation_amortization(
            request.loan_amount,
            request.interest_rate,
            request.type_rate,
            request.period,
            request.loan_term_years,
            )

        return {"amortization_table":amortization_table}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("templates/index.html","r") as file:
        content = file.read()
        return HTMLResponse(content=content)