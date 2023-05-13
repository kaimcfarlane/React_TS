//Instance variables
var typedWords = 0;
var itv1 = setInterval(updateChart,100)
var canvasDiv = document.getElementById("canvasDiv");
var scoreProcessed = true;
const labels = [
    "Slow",
    "Average",
    "Fluent",
    "Fast",
    "Pro",
  ];
var data = {
        labels: labels,
        datasets: [{
          label: 'TYPER SPEED (WPM)  ',
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
          borderWidth: 1,
          data: [25, 45, 65, 85, 100],
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
        backgroundColor: "blue"
    }
};

//Initalize Chart
var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

//Updates Chart
function updateChart() {
    if(startTime==0 && !scoreProcessed) {
        setTimeout(function rise(){
            myChart.config.data.datasets[1].data.push(wordsTyped);
            myChart.config.data.datasets[1].data.push(wordsTyped);
            myChart.config.data.datasets[1].data.push(wordsTyped);
            myChart.config.data.datasets[1].data.push(wordsTyped);
            myChart.config.data.datasets[1].data.push(wordsTyped);
            myChart.update();
        },2000)
        scoreProcessed = true;
    }
    else if(startTime == 60 && scoreProcessed)
    {
        scoreProcessed = false;
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.config.data.datasets[1].data.pop();
        myChart.update();
    }
}