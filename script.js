document.addEventListener('DOMContentLoaded', ()=> {
  generateChart()
})

function generateChart() {
  Papa.parse('investment_data.csv',  {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (result)=> {

      const label = []
      const stocksData = []
      const bondsData = []
      const realEstates = []
      const mutualFundsData = [];
      const cryptoData = [];

      for(let row of result.data) {
        if (row.Month) {
          label.push(row.Month)
          stocksData.push(row.Stocks)
          bondsData.push(row.Bonds)
          realEstates.push(row.RealEstate)
          mutualFundsData.push(row.MutualFunds);
          cryptoData.push(row.Cryptocurrency);
        }
      }

      createLineChart(label, stocksData, bondsData, realEstates, mutualFundsData, cryptoData)
    }
  })
}

function createLineChart(label, stocks, bonds, realEstates, mutualFunds, crypto) {
  
  const context = document.getElementById('myCanvas').getContext('2d')

  new Chart(context, {
    type: 'line',
    data: {
      labels: label,
      datasets: [
        {
        label: 'Stocks',
        data: stocks,
        borderColor: '#E63946',
        fill: false,
        tension: 0.
      }, 
      {
        label: 'Bonds',
        data: bonds,
        borderColor: '#2914e4ff',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Real Estate',
        data: realEstates,
        borderColor: '#125a13ff',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Mutual Funds',
        data: mutualFunds,
        borderColor: '#F4A261',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Cryptocurrency',
        data: crypto,
        borderColor: '#E9C46A',
        fill: false,
        tension: 0.1
      }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "My Investment Chart"
        }
      },
      scales : {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}