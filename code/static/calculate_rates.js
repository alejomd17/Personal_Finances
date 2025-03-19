document.getElementById('interestForm').addEventListener('submit', 
async function(event) {
    event.preventDefault();
    const InitialRate = parseFloat(document.getElementById('InitialRate').value);
    const rateType = document.getElementById('rateType').value;
    const InitialPeriod = document.getElementById('InitialPeriod').value;
    const WishedPeriod = document.getElementById('WishedPeriod').value;

    if (isNaN(InitialRate)) {
        alert("Por favor, ingrese una tasa valida.");
        return;
    }

    const response = await fetch('/calculate_interest_rate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            initial_rate: InitialRate,
            rate_type: rateType,
            initial_period: InitialPeriod,
            wished_period: WishedPeriod
        }),
    });

    const data = await response.json();
    document.getElementById('result').textContent = `${data.interest_rate}`;
});