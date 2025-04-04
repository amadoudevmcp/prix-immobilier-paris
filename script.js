// Données des prix de l'immobilier à Paris (prix au m² en euros)
const priceData = {
    all: {
        dates: ['2023-01', '2023-04', '2023-07', '2023-10', '2024-01', '2024-04'],
        prices: [11420, 11200, 11000, 10800, 10636, 10580]
    }
};

// Configuration du graphique
const ctx = document.getElementById('priceChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: priceData.all.dates,
        datasets: [{
            label: 'Prix moyen au m²',
            data: priceData.all.prices,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Évolution des prix au m² à Paris',
                font: {
                    size: 16
                }
            },
            legend: {
                position: 'bottom'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        return `${context.parsed.y.toLocaleString()} €/m²`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString() + ' €';
                    }
                }
            }
        }
    }
});

// Gestion des filtres
document.getElementById('arrondissement').addEventListener('change', updateChart);
document.getElementById('propertyType').addEventListener('change', updateChart);

function updateChart() {
    const arrondissement = document.getElementById('arrondissement').value;
    const propertyType = document.getElementById('propertyType').value;
    
    // Simulation de données différentes selon les filtres
    // Dans une vraie application, ces données viendraient d'une API
    let newPrices = [...priceData.all.prices];
    if (arrondissement !== 'all') {
        // Ajuster les prix selon l'arrondissement
        newPrices = newPrices.map(price => {
            if (arrondissement === '75001') {
                return price * 1.2; // Prix plus élevés dans le 1er
            } else if (arrondissement === '75020') {
                return price * 0.8; // Prix plus bas dans le 20ème
            }
            return price;
        });
    }

    // Mise à jour du graphique
    chart.data.datasets[0].data = newPrices;
    chart.update();
}

// Initialisation des données des arrondissements
const arrondissements = [];
for (let i = 1; i <= 20; i++) {
    const num = i.toString().padStart(2, '0');
    arrondissements.push({
        code: `750${num}`,
        name: `Paris ${i}${i === 1 ? 'er' : 'ème'}`
    });
}

// Remplissage du select des arrondissements
const arrondissementSelect = document.getElementById('arrondissement');
arrondissements.forEach(arr => {
    const option = document.createElement('option');
    option.value = arr.code;
    option.textContent = arr.name;
    arrondissementSelect.appendChild(option);
});