function barChart() {
    var bar = document.querySelector("svg");
    if (bar) {
        chartBox.removeChild(bar);
    }

    //直接使用js在html中创建svg
    //创建svg元素需要指定命名空间
    var bar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    bar.setAttribute("version", "1.1");
    bar.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    bar.setAttribute("baseProfile", "full");
    bar.setAttribute("viewbox", "0 0 1280 720");

    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "scale(0.5)");

    //轴线的箭头
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M30 50 L40 40 L50 50");
    path.setAttribute("style", "fill:white;stroke:black;stroke-width:3");
    g.appendChild(path);
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M1230 670 L1240 680 L1230 690");
    path.setAttribute("style", "fill:white;stroke:black;stroke-width:3");
    g.appendChild(path);

    //柱子
    var saleArr = currentArr.slice(2);
    saleArr.sort(function (a, b) {
        return b - a;
    });
    var rate = 600 / saleArr[0];
    saleArr = currentArr.slice(2);

    for (var i = 0; i < 12; i++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 40 + 48.333 * (2 * i + 1));
        rect.setAttribute("y", 680 - saleArr[i] * rate);
        rect.setAttribute("width", 48.333);
        rect.setAttribute("height", saleArr[i] * rate);
        rect.setAttribute("style", "fill:rgb(1, 148, 247)");
        g.appendChild(rect);
    }

    //两根轴线
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "40");
    line.setAttribute("y1", "680");
    line.setAttribute("x2", "1240");
    line.setAttribute("y2", "680");
    line.setAttribute("style", "stroke:black;stroke-width:3");
    g.appendChild(line);
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "40");
    line.setAttribute("y1", "680");
    line.setAttribute("x2", "40");
    line.setAttribute("y2", "40");
    line.setAttribute("style", "stroke:black;stroke-width:3");
    g.appendChild(line);

    bar.appendChild(g);
    chartBox.appendChild(bar);
}