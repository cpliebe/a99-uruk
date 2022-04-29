var input;
function getStateName() {
    input = document.getElementById("userInput").value;
}
const showDataButton = document.getElementById('showDataButton')
showDataButton.addEventListener("click",fetchData)
showDataButton.addEventListener("click", showCharts)

function fetchData() {
    input = document.getElementById("userInput").value
    fetch('https://api.covidtracking.com/v2/states/' + input + '/daily.json')
    .then(function(response){
        return response.json();
    }) 
    .then(function(result) {
        console.log(result);
        document.getElementById("stateName").innerHTML = result.data[0].state;
        document.getElementById("dateUpdated").innerHTML = result.data[0].date;
        document.getElementById("totalConfirmedCases").innerHTML = result.data[0].cases.total.value;
        document.getElementById("population_percent").innerHTML = result.data[0].cases.total.calculated.population_percent;
        document.getElementById("change_from_prior_day").innerHTML = result.data[0].cases.total.calculated.change_from_prior_day;
        document.getElementById("seven_day_change_percent").innerHTML = result.data[0].cases.total.calculated.seven_day_change_percent;

        // Chart One
        let labels1 = ["Positive Cases %", "Uninfected State Population %"];
        let data1 = [result.data[0].cases.total.calculated.population_percent, 100 - result.data[0].cases.total.calculated.population_percent];
        let colors1 = ['#49A9EA', '#36CAAB'];

        let myChart1 = document.getElementById("myChart").getContext('2d');
        let chart1 = new Chart(myChart1, {
            type: 'doughnut',
            data: {
                labels: labels1, 
                datasets: [ {
                    data: data1, 
                    backgroundColor: colors1
                }]
            },
            options: {
                title: {
                    text: result.data[0].state + " HISTORIC COVID DATA",
                    display: true
                }
            }
        });
    })
    
}