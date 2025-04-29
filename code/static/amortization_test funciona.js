document.addEventListener("DOMContentLoaded",() => {
    
    const desembolsoDate = document.getElementById('desembolsoDate');
    const loanAmount = document.getElementById('loanAmount');
    const InterestRate = document.getElementById('InterestRate');
    const rateType = document.getElementById('rateType');
    const ratePeriod = document.getElementById('ratePeriod');
    const loanTermYears = document.getElementById('loanTermYears');
    const insurance = document.getElementById('insurance');
    const calculateBtn = document.getElementById('calculateBtn');

    const abono_capital_all = {};


    // // const abono_capital_all = abonoCapitalAll};
    // const abonosCapitalDate = document.getElementById('abonosCapitalDate').value;
    // const abonosCapitalValue = parseFloat(document.getElementById('abonosCapitalValue').value);

    
    // const abono_capital_all = {};
    // abono_capital_all[abonosCapitalDate] = abonosCapitalValue;

    calculateBtn.addEventListener("click",
        async () =>{
            const data = {
                desembolso_date: desembolsoDate.value,
                loan_amount: Number.parseFloat(loanAmount.value),
                interest_rate: Number.parseFloat(InterestRate.value),
                type_rate: rateType.value,
                period: ratePeriod.value,
                loan_term_years: Number.parseFloat(loanTermYears.value),
                insurance: Number.parseFloat(insurance.value),
                abono_capital_all: abono_capital_all,
            };

            try {
                const response = await fetch('/amortization/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error("API request failed");
                }

                const result = await response.json();
                displayAmortizationTable(result);
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema con la solicitud a la API.");
            }
    });
});


function displayAmortizationTable(result) {
    
    const resultCard = document.getElementById("resultsTable");
    const tableBody = document.getElementById("calculationResult").getElementsByTagName('tbody')[0];
    resultCard.classList.remove("hidden");

    tableBody.innerHTML = "";

    result.amortization_table.forEach(row => {
                const newRow = tableBody.insertRow();
                newRow.insertCell(0).textContent = row.num;
                newRow.insertCell(1).textContent = row.anno_mes;
                newRow.insertCell(2).textContent = `$${row.interest.toLocaleString()}`;
                newRow.insertCell(3).textContent = `$${row.capital.toLocaleString()}`;
                newRow.insertCell(4).textContent = `$${row.insurance.toLocaleString()}`;
                newRow.insertCell(5).textContent = `$${row.payment.toLocaleString()}`;
                newRow.insertCell(6).textContent = `$${row.balance.toLocaleString()}`;
            });
        }