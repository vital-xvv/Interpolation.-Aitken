xi = []
yi = []
x0 = 1
n = 10
a = 0
b = 4
for(let i = a; i <= n; i++) {
    xi.push(parseFloat((i * (b-a)/10).toFixed(1)));
    yi.push(1/(1+Math.pow(Math.E, -xi[i])));
}
ms = []
ms.push([]);

for(let i = 0; i < n; i++){
    
    ms[0].push(((x0-xi[i])*yi[i+1] - (x0-xi[i+1])*yi[i])/(xi[i+1]-xi[i]))
}

var k = 2
for(let i = 1; i < n; i++){
    ms.push([]);
    for(let j = 0; j < ms[i-1].length - 1; j++){
        ms[i].push(((x0 - xi[j])*ms[i-1][j+1] - (x0 - xi[j+k])*ms[i-1][j])/(xi[j+k] - xi[j]))
    }
    k++;
}

console.log(ms)

ms.forEach(element => {
    console.log(element[1]);
});