document.addEventListener('DOMContentLoaded', () => {
    generateChart();
});

function generateChart() {
    Papa.parse('investment_data.csv', {
        download: true, 
        header: true,
        dynamicTyping: true,
        delimiter: ";", 
        complete: (result) => {
            console.log("Data loaded:", result.data); // Check console if graph is empty
            
            const label = [];
            const stocksData = [];
            const bondsData = [];
            const realEstates = [];
            const mutualFundsData = [];
            const cryptoData = [];

            for (let row of result.data) {
                if (row.Month) {
                    label.push(row.Month);
                    stocksData.push(row.Stocks);
                    bondsData.push(row.Bonds);
                    realEstates.push(row.RealEstate);
                    mutualFundsData.push(row.MutualFunds);
                    cryptoData.push(row.Cryptocurrency);
                }
            }

            createLineChart(label, stocksData, bondsData, realEstates, mutualFundsData, cryptoData);
        },
        error: (err) => {
            console.error("Error loading CSV:", err);
            alert("Could not load CSV. Make sure you are running a Local Server, not just opening the file directly.");
        }
    });
}

function createLineChart(label, stocks, bonds, realEstates, mutualFunds, crypto) {
    // Global Defaults
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = '#334155';

    const context = document.getElementById('myCanvas').getContext('2d');

    new Chart(context, {
        type: 'line',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Stocks',
                    data: stocks,
                    borderColor: '#E63946',
                    backgroundColor: '#E63946',
                    tension: 0.3
                },
                {
                    label: 'Bonds',
                    data: bonds,
                    borderColor: '#2914e4',
                    backgroundColor: '#2914e4',
                    tension: 0.3
                },
                {
                    label: 'Real Estate',
                    data: realEstates,
                    borderColor: '#125a13',
                    backgroundColor: '#125a13',
                    tension: 0.3
                },
                {
                    label: 'Mutual Funds',
                    data: mutualFunds,
                    borderColor: '#F4A261',
                    backgroundColor: '#F4A261',
                    tension: 0.3
                },
                {
                    label: 'Crypto',
                    data: crypto,
                    borderColor: '#d946ef',
                    backgroundColor: '#d946ef',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) { return '$' + value.toLocaleString(); }
                    }
                }
            }
        }
    });
}
