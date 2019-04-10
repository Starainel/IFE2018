function barChart(colorIndex) {
    //绘制图表之前先删除之前的图表
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

    //手动缩放
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

    //绘制柱子（一个或多个）
    var allData = [];
    for (var i = 0; i < currentArr.length; i++) {
        var one = currentArr[i].sale;
        allData = allData.concat(one);
    }
    allData.sort(function (a, b) {
        return b - a;
    });
    var rate = 600 / allData[0];
    for (var j = 0; j < currentArr.length; j++) {
        draw(currentArr, rate);
    }

    function draw(currentArr, rate) {
        for (var h = 0; h < currentArr.length; h++) {
            for (var i = 0; i < 12; i++) {
                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", 40 + 32.222 * (i + 1) + 64.444 * i + 64.444 / currentArr.length * h);
                rect.setAttribute("y", 680 - currentArr[h].sale[i] * rate);
                rect.setAttribute("width", 64.444 / currentArr.length);
                rect.setAttribute("height", currentArr[h].sale[i] * rate);
                rect.setAttribute("fill", color[colorIndex ? colorIndex : h]);
                g.appendChild(rect);
            }
        }
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

    //月份标志
    for (var k = 0; k < 12; k++) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 40 + 32.222 * (k * 3 + 2));
        text.setAttribute("y", 710);
        text.innerHTML = k + 1 + "月";
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("style", "font-size:20px")
        g.appendChild(text);
    }

    //销量标志
    for (var l = 0; l < 6; l++) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 20);
        text.setAttribute("y", 80 + 120 * (5 - l));
        text.innerHTML = (allData[0] / 5) * l;
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("style", "font-size:20px;alignment-baseline:middle");
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 40);
        line.setAttribute("y1", 80 + 120 * (5 - l));
        line.setAttribute("x2", 50);
        line.setAttribute("y2", 80 + 120 * (5 - l));
        line.setAttribute("style", "stroke:black;stroke-width:3")
        g.appendChild(line);
        g.appendChild(text);
    }

    //颜色标志
    for (var m = 0; m < currentArr.length; m++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 1220);
        rect.setAttribute("y", 80 + 60 * m);
        rect.setAttribute("width", 30);
        rect.setAttribute("height", 10);
        rect.setAttribute("fill", color[colorIndex ? colorIndex : m]);

        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 1240);
        text.setAttribute("y", 100 + 60 * m);
        var tspan1 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan1.setAttribute("x", 1220);
        tspan1.setAttribute("y", 100 + 60 * m + 5);
        tspan1.innerHTML = currentArr[m].region;
        var tspan2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan2.setAttribute("x", 1220);
        tspan2.setAttribute("y", 100 + 60 * m + 30);
        tspan2.innerHTML = currentArr[m].product;
        text.appendChild(tspan1);
        text.appendChild(tspan2);
        text.setAttribute("text-anchor", "start");
        text.setAttribute("style", "font-size:15px");

        g.appendChild(text);
        g.appendChild(rect);
    }

    bar.appendChild(g);
    chartBox.appendChild(bar);
}