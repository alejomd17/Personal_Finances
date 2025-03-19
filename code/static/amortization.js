document.getElementById('amortizationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const typeRate = document.getElementById('typeRate').value;
    const period = document.getElementById('period').value;
    const loanTermYears = parseInt(document.getElementById('loanTermYears').value);

    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTermYears)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    try {
        const response = await fetch('/calculate_amortization_table/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loan_amount: loanAmount,
                annual_interest_rate: annualInterestRate,
                loan_term_years: loanTermYears
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayAmortizationTable(data.amortization_table);
    } catch (error) {
        console.error("Error al calcular la tabla de amortización:", error);
        document.getElementById('amortizationResult').textContent = "Error al calcular la tabla de amortización.";
    }
});

function displayAmortizationTable(table) {
    const resultDiv = document.getElementById('amortizationResult');
    resultDiv.innerHTML = "<h2>Tabla de Amortización</h2>";

    const tableHtml = `
        <table border="1">
            <tr>
                <th>Mes</th>
                <th>Cuota</th>
                <th>Interés</th>
                <th>Abono</th>
                <th>Saldo</th>
            </tr>
            ${table.map(row => `
                <tr>
                    <td>${row.month}</td>
                    <td>${row.payment}</td>
                    <td>${row.interest}</td>
                    <td>${row.principal}</td>
                    <td>${row.balance}</td>
                </tr>
            `).join('')}
        </table>
    `;

    resultDiv.innerHTML += tableHtml;
}