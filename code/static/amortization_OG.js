let abonoCapitalAll = {};
document.getElementById('amortizationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const desembolsoDate = document.getElementById('desembolsoDate').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const InterestRate = parseFloat(document.getElementById('InterestRate').value);
    const rateType = document.getElementById('rateType').value;;
    const ratePeriod = document.getElementById('ratePeriod').va;lue;
    const loanTermYears = parseFloat(document.getElementById('loanT;ermYears').value);
    const insurance = parseFloat(document.getElementById('insurance').value) || 90000;;
    // const abono_capital_all = abonoCapitalAll};
    const abonosCapitalDate = document.getElementById('abonosCapitalDate').value;
    const abonosCapitalValue = parseFloat(document.getElementById('abonosCapitalValue').value);
    const abono_capital_all = {};
    abono_capital_all[abonosCapitalDate] = abonosCapitalValue;

    if (isNaN(loanAmount) || isNaN(InterestRate) || isNaN(loanTermYears)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    const response = await fetch('/amortization/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            desembolso_date: desembolsoDate,
            loan_amount: loanAmount,
            interest_rate: InterestRate,
            type_rate: rateType,
            period: ratePeriod,
            loan_term_years: loanTermYears,
            insurance: insurance,
            abono_capital_all: abonoCapitalAll
            })
        });
        // body: JSON.stringify(formData),

    const responseText = await response.text(); // Captura la respuesta como texto

    try {
        const data = JSON.parse(responseText); // Intenta parsear la respuesta como JSON
        console.log("Datos recibidos del backend:", data);
        displayAmortizationTable(data.amortization_table);
    } catch (error) {
        console.error("Error al parsear la respuesta del backend:", responseText);
        document.getElementById('amortizationResult').textContent =
        "Error en la respuesta del servidor. Verifique la consola.";
    };
})

function displayAmortizationTable(tableData) {
    const resultDiv = document.getElementById('amortizationResult');
    resultDiv.innerHTML = "<h2>Tabla de Amortización</h2>";

    const table = document.createElement('table');
    table.className = 'amortization-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `  
                <tr>
                    <th>#</th>
                    <th>Anno_Mes</th>
                    <th>Interes</th>
                    <th>Capital</th>
                    <th>Seguro</th>
                    <th>Cuota</th>
                    <th>Abono_Extra</th>
                    <th>Saldo</th>
                </tr>`;
            
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    tableData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                        <td>${row.num}</td>
                        <td>${row.anno_mes}</td>
                        <td>${row.interest.toLocaleString('es-ES')}</td>
                        <td>${row.capital.toLocaleString('es-ES')}</td>
                        <td>${row.insurance.toLocaleString('es-ES')}</td>
                        <td>${row.payment.toLocaleString('es-ES')}</td>
                        <td>${row.abono_capital.toLocaleString('es-ES')}</td>
                        <td>${row.balance.toLocaleString('es-ES')}</td>
                `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    resultDiv.append(table);
}