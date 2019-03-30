//直接使用js在html中创建svg
//创建svg元素需要指定命名空间
var bar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
bar.setAttribute("style", "width:1280;height:720");
/* bar.setAttribute("viewbox", "0 0 1280 720");
bar.setAttribute("preserveAspectRatio", "xMinYMin meet"); */

//轴线的箭头
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M30 50 L40 40 L50 50");
path.setAttribute("style", "fill:white;stroke:black;stroke-width:3");
bar.appendChild(path);
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M1230 670 L1240 680 L1230 690");
path.setAttribute("style", "fill:white;stroke:black;stroke-width:3");
bar.appendChild(path);

//两根轴线
var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", "40");
line.setAttribute("y1", "680");
line.setAttribute("x2", "1240");
line.setAttribute("y2", "680");
line.setAttribute("style", "stroke:black;stroke-width:3");
bar.appendChild(line);
var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", "40");
line.setAttribute("y1", "680");
line.setAttribute("x2", "40");
line.setAttribute("y2", "40");
line.setAttribute("style", "stroke:black;stroke-width:3");
bar.appendChild(line);

//柱子
var eastPhone = sourceData[0].sale;
for (var i = 1; i <= 12; i++) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", 40 + 48.333 * (2 * i - 1));
    rect.setAttribute("y", 680 - eastPhone[i - 1] * 2.222);
    rect.setAttribute("width", 48.333);
    rect.setAttribute("height", eastPhone[i - 1] * 2.222);
    rect.setAttribute("style", "fill:rgb(1, 148, 247)");
    bar.appendChild(rect);
}

document.body.appendChild(bar);