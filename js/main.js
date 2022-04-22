
function aitkenCalc(a, b, n, x0){
    xi = []
    yi = []
    index = 0
    res = 0
    for(let i = 0; i <= n; i++) {
        xi.push(parseFloat((a + (b-a)*i/n).toFixed(1)));
        yi.push(Math.pow(1+Math.pow(Math.E, -xi[i]), -1));
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

    for(let i = 1; i < xi.length; i++){
        if(x0 === xi[i]){
            index = i;
            break;
        }
        else if(x0 < xi[i]){
            index = i-1;
            break;
        }
    }
    searchedLine = [] 
    if(index === n) {
        res = parseFloat(yi[n].toFixed(3))
        return {xi, yi, res}
    }
    ms[index].forEach(element => {
        searchedLine.push(parseFloat(element.toFixed(3)))
    })
    for(let i = 0; i < searchedLine.length-1; i++){
        if(searchedLine[i] - searchedLine[i+1] === 0){
            res = searchedLine[i]
            break
        }
    }

    if(res === 0 || res !== parseFloat(yi[index].toFixed(3)) || res === Infinity) res = yi[index]

    return {xi, yi, res}
}
module.exports = aitkenCalc

