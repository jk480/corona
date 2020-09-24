/* API */
window.onload = function() {
    getKosovoStats()
    getGlobalStats()
}

const XK_URL = 'https://covid19.mathdro.id/api/countries/india'
const GLOBAL_URL = 'https://covid19.mathdro.id/api'

const colors = {
    blue: "#007bff",
    red: "#dc3545",
    green: "#28a745"
   
}

function getKosovoStats() {
    fetch(XK_URL)
    .then(function(resp) { return resp.json()})
    .then(function(data) {
        let infected = data.confirmed.value
        let recovered = data.recovered.value
        let deaths = data.deaths.value
        let update = data.lastUpdate

        document.getElementById('infected').innerHTML = infected.toLocaleString('en')
        document.getElementById('recovered').innerHTML = recovered.toLocaleString('en')
        document.getElementById('deaths').innerHTML = deaths.toLocaleString('en')
        
        /*dates*/
        let updates = document.querySelectorAll('.update')
        updates.forEach(function(items) {
          items.innerHTML = update.substr(0, 10)
        });

        /* CHARTS */

        const ctx = document.getElementById('kosovoChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Man', 'Woman', 'Unconfirmed'],
                datasets: [
                {
                    label: '',
                    backgroundColor: 
                    [colors.blue, colors.green, colors.red],                           
                    data: [196, 166, 148]         
                }]
            },
        });

    })
    .catch(function() {
        console.log("error")
    })
}

function getGlobalStats() {
    fetch(GLOBAL_URL)
    .then(function(items) { return items.json()})
    .then(function(item) {
        let globalInfected = item.confirmed.value
        let globalRecovered = item.recovered.value
        let globalDeaths = item.deaths.value

        const ctx = document.getElementById('globalChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                {
                    label: '',
                    backgroundColor: 
                    [colors.blue, colors.green, colors.red],                           
                    data: [globalInfected, globalRecovered, globalDeaths]          
                }]
            },
        });
    })
    .catch(function() {
        console.log("error!")
    })
}

