document.addEventListener("DOMContentLoaded",() => {
    const desembolsoDate = document.getElementById('desembolsoDate')
    const loanAmount = document.getElementById('loanAmount')
    const InterestRate = document.getElementById('InterestRate')
    const rateType = document.getElementById('rateType')
    const ratePeriod = document.getElementById('ratePeriod').value
    const loanTermYears = document.getElementById('loanTermYears')
    const insurance = document.getElementById('insurance') || 90000
    const abonosCapitalDate = document.getElementById('abonosCapitalDate')
    const abonosCapitalValue = document.getElementById('abonosCapitalValue')
    const extraAbonosCapitalBtn = document.getElementById('addAbonosCapital')
    const extraAbonosCapitalContainer = document.getElementById('extraAbonosCapitalContainer')
    const extraAbonosCapitalList = document.getElementById('extraAbonosCapitalList')
    const calculateBtn = document.getElementById('calculateBtn')
    const resultsCard = document.getElementById('resultsCard')
    const calculationResult = document.getElementById('calculationResult')

    let extraAbonosCapital = []
    
    extraAbonosCapitalList.style.display = "none"
    extraAbonosCapitalBtn.addEventListener("click",() =>{
        const date = abonosCapitalDate.value
        const amount = Number.parseFloat(abonosCapitalValue.value)

        if (!date || amount <=0) {
            alert("Por favor, ingrese valores válidos para el Abono Extra.");
            return;
        }

        extraAbonosCapital[date] = amount;
        renderExtraAbonosCapital()

        abonosCapitalDate.value = ""
        abonosCapitalValue.value = ""
    })

    function renderExtraAbonosCapital(){
        extraAbonosCapitalContainer.innerHTML = "";

        if (Object.keys(extraAbonosCapital).length === 0) {
            extraAbonosCapitalList.style.display = "none";
            return
        }
        extraAbonosCapitalList.style.display ="block";

        for (const [date, amount] of Object.entries(extraAbonosCapital)){
            const paymentItem = document.createElement("div");
            paymentItem.className ="payment-item";
            paymentItem.innerHTML =`
                        <div>
                            <strong>${date}:</strong>$${amount.toLocaleString()}
                            <button class"remove-btn" data-date="${date}">Eliminar</button>
                        </div>
                        `
            extraAbonosCapitalContainer.appendChild(paymentItem);
        }
    }

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const dateToRemove = this.getAttribute('data-date');
            delete extraAbonosCapital[dateToRemove];
            renderExtraAbonosCapital();
        });
    });

    calculateBtn.addEventListener("click",
        async () =>{
            const data = {
                desembolso_date: desembolsoDate,
                loan_amount: Number.parseFloat(loanAmount.value),
                interest_rate: Number.parseFloat(InterestRate.value),
                type_rate: rateType,
                period: ratePeriod,
                loan_term_years: Number.parseFloat(loanTermYears.value),
                insurance: Number.parseFloat(insurance.value),
                abono_capital_all: extraAbonosCapital
            }

            if (isNaN(data.loan_amount) || isNaN(data.interest_rate) || isNaN(data.loan_term_years)) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }

            const response = await fetch('/amortization/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                });

                if (!response.ok){
                    throw new Error("API rquest failed");
                }

                const result = await response.json();
                displayAmortizationTable(result);
        }
    )

    function displayAmortizationTable(result) {
        // Show the results card
        resultsCard.classList.remove("hidden")
    
        let resultText = ""
    
        if (typeof result === "string") {
          resultText = result
        } else {
          resultText = `#: $${result.num}\n`
          resultText += `Anno_Mes: $${result.anno_mes}\n`
          resultText += `Interes: ${result.interest}%\n`
          resultText += `Capital: ${result.capital} years\n`
          resultText += `Seguro: $${result.insurance}\n`
          resultText += `Cuota: $${result.payment}\n`
          resultText += `Abono_Extra: $${result.abono_capital}\n\n`
          resultText += `Saldo: $${result.balance}\n\n`
    
        result.forEach((row) => {
            resultText = `#: $${row.num}\n`
            resultText += `Anno_Mes: $${row.anno_mes}\n`
            resultText += `Interes: ${row.interest}%\n`
            resultText += `Capital: ${row.capital} years\n`
            resultText += `Seguro: $${row.insurance}\n`
            resultText += `Cuota: $${row.payment}\n`
            resultText += `Abono_Extra: $${row.abono_capital}\n\n`
            resultText += `Saldo: $${row.balance}\n\n`
        });
        }};
    });
