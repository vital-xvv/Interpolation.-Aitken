const submit__button = document.querySelector('.submit__button')
const form = document.querySelector(".main__form")
const calc_button = document.querySelector(".button__calc")
const error__button = document.querySelector(".button__error")
const calc = document.querySelector('.calculations')
const err = document.querySelector('.errors')

submit__button.addEventListener('click', () => {
    form.submit();
})

var data;

calc_button.addEventListener('click', () => {
   calc.classList.remove('hide')
   err.classList.add('hide')
   fetch("/calculation").then(res => { res.json().then(obj => {
    //alert(JSON.stringify(obj))
    ctx = document.getElementById("chartReal");
    myChart = new Chart(ctx, {
    type: "line",
    data: {
    labels: obj.response.xi,
    datasets: [
        {
        label: "Function Graph",
        data: obj.response.yi,
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

    resultInfo = document.getElementById('x0res')
    resultInfo.textContent = `f(x0) = ${obj.response.res}`;

    ctx2 = document.getElementById("chartInterpolated");
    myChart = new Chart(ctx2, {
    type: "line",
    data: {
    labels: obj.response.xi,
    datasets: [
        {
        label: "Interpolated Graph",
        data: obj.yc,
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
   })})
})

error__button.addEventListener('click', () => {
    calc.classList.add('hide')
    err.classList.remove('hide')
    fetch("/error").then(res => { res.json().then()})
})



  


