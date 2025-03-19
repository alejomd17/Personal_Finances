from src.interest_rates import InterestRates
interest_rates = InterestRates()

class Amortization:
    def calculation_amortization(self, loan_amount, interest_rate, type_rate,period,loan_term_years):
        monthly_interest_rate = interest_rates.calculate_interest_rate(interest_rate,type_rate,period,'Mensual') /100
        
        number_of_payments = loan_term_years * 12

        monthly_payment = (loan_amount * monthly_interest_rate *
                           (1 + monthly_interest_rate) ** number_of_payments) /\
                            ((1 + monthly_interest_rate)**number_of_payments -1)
        
        saldo = loan_amount
        amortization_table = []

        for month in range(1, number_of_payments + 1):
            interest = saldo * monthly_interest_rate
            abono = monthly_payment - interest
            saldo -= abono

            amortization_table.append(
                {
                    "month":month,
                    "payment":round(monthly_payment,2),
                    "interest":round(interest,2),
                    "abono":round(abono,2),
                    "saldo":round(saldo,2)
                }
            )
        
        return amortization_table
            
        