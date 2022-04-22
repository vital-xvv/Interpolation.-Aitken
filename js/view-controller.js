const submit__button = document.querySelector('.submit__button')
const form = document.querySelector(".main__form")
const calc_button = document.querySelector(".button__calc")
const error__button = document.querySelector(".button__error")
const calc = document.querySelector('.calculations')
const err = document.querySelector('.errors')

submit__button.addEventListener('click', () => {
    form.submit();
})


calc_button.addEventListener('click', () => {

    calc.classList.toggle('hide')
    if(!err.classList.contains('hide')){
        err.classList.toggle('hide')
    }
    fetch("/calculation").then(res => { res.json().then(obj => {
    
    myChart.data.labels = obj.response.xi
    ihart.data.labels = obj.response.xi
    
    myChart.data.datasets[0].data = obj.response.yi
    ihart.data.datasets[0].data = obj.yc

    myChart.update();
    ihart.update();

    resultInfo = document.getElementById('x0res')
    resultInfo.textContent = `f(x0) = ${obj.response.res}`;

    
    
   })})
})

error__button.addEventListener('click', () => {
    err.classList.toggle('hide')
    if(!calc.classList.contains('hide')){
        calc.classList.toggle('hide')
    }
    fetch("/error").then(res => { res.json().then(obj => {
        errorChart.data.labels = obj.xnew
        errorChart.data.datasets[0].data = obj.tempY

        errorChart.update()

        errorReal = document.getElementById('errorReal')
        errorReal.textContent = `Error Pn(x) = ${obj.error}`

        cellsNexac = document.querySelectorAll('.exacn')
        cellsN = document.querySelectorAll('.n')
        cellsK = document.querySelectorAll('.k')

        for(let i = 0; i < 10; i ++){
            cellsNexac[i].textContent = obj.nexac[i].toFixed(5);
            cellsN[i].textContent = obj.ni[i];
            cellsK[i].textContent = obj.k[i] === Infinity || obj.k[i] === null ? 0: obj.k[i].toFixed(5);
        }

    })})
})

ctx = document.getElementById("chartReal");
var myChart = new Chart(ctx, {
    type: "line",
    data: {
    datasets: [
        {
        label: "Function Graph",
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        },
    ],
    },
    options: {
    scales: {
        y: {
        beginAtZero: true,
        },
    },
    },
    });

ctx2 = document.getElementById("chartInterpolated");
var ihart = new Chart(ctx2, {
    type: "line",
    data: {
    datasets: [
        {
        label: "Interpolated Graph",
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        },
    ],
    },
    options: {
    scales: {
        y: {
        beginAtZero: true,
        },
    },
    },
    });

ctx3 = document.getElementById("errorChart");
var errorChart = new Chart(ctx3, {
    type: "line",
    data: {
    datasets: [
        {
        label: "Error Graph",
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        },
    ],
    },
    options: {
    scales: {
        y: {
        beginAtZero: true,
        },
    },
    },
    });

