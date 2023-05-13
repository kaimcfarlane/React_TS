//Instance variables
var itv1 = setInterval(updateChart,100)
var scoreProcessed = true;
const labels = [
    "Top 1%",
    "Top 10%",
    "20%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "85%",
    "90%",
    "95%",
    "97%",
    "98%",
    "100%"
  ];
var data = {
        labels: labels,
        datasets: [{
          type: "line",
          label: 'Clicker Hit (ms)  ',
          backgroundColor: ['rgba(255, 99, 132, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 4,
          data: [100, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450],
        }, {
          type: "line",
          label: 'User Score',
          data: [],
          backgroundColor : ["#42f590"], 
          borderColor: ["#42f590"],
          borderWidth: 4
        },
    ]
      };
var config = {
    type: 'bar',
    data: data,
    options: {
        indexAxis: "y",
    }
};

//Initializes Chart
var myChart = new Chart(
  document.getElementById('myChart'),
  config
);
  
//Updates Chart
function updateChart() {
    if(chartDisplayed && !scoreProcessed) {  
        setTimeout(function rise(){
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.config.data.datasets[1].data.push(timeElap);
            myChart.update();
        },2000)
        scoreProcessed = true;
    }
    else if(!chartDisplayed && scoreProcessed)
    {
        scoreProcessed = false;
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.update();
    }
}