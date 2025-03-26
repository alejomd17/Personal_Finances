let abonoCapitalAll = {}; //diccionario para almacenar abonos de capital

document.getElementById('addAbono').addEventListener('click', async function() {
    const anno_mes = document.getElementById('abonosCapitalDate').value;
    const value = parseFloat(document.getElementById('abonosCapitalValue').value);

    if (anno_mes.length !== 6 || value <= 0) {
        alert("Por favor ingrese un año-mes valido (AAAMM) y un valor númerico positivo");
        return
    }
    // Agregar al diccionario
    abonoCapitalAll[anno_mes] = value;

    // Actualizar tabla de abonos
    updateAbonosTable();

    // Limpiar campos
    document.getElementById('abonosCapitalDate').value = '';
    document.getElementById('abonosCapitalValue').value = '';
    });

function updateAbonosTable() {
    const tbody = document.querySelector('#dictAbonosCapital tbody');
    tbody.innerHTML = '';

    for (const [annoMes, value] of Object.entries(abonoCapitalAll)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${annoMes}</td>
            <td>${value.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
            <td><button class="remove-btn" data-annomes="${annoMes}">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    }
    
    // Agregar evento para eliminar abonos
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
        const annomes = this.dataset.annomes;
        delete abonoCapitalAll[annomes];
        updateAbonosTable();
        });
        });
    }
