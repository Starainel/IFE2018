function lineChart(colorIndex) {
    //绘制图表之前先删除之前的图表
    var line = document.querySelector("canvas");
    if (line) {
        chartBox.removeChild(line);
    }

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", "1280");
    canvas.setAttribute("height", "720");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        //轴和箭头
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(1240, 680);
        ctx.lineTo(40, 680);
        ctx.lineTo(40, 40);
        ctx.moveTo(30, 50);
        ctx.lineTo(40, 40);
        ctx.lineTo(50, 50);
        ctx.moveTo(1230, 670);
        ctx.lineTo(1240, 680);
        ctx.lineTo(1230, 690);
        ctx.stroke();

        //绘制折线（一个或多个）
        var allData = [];
        for (var i = 0; i < currentArr.length; i++) {
            var one = currentArr[i].sale;
            allData = allData.concat(one);
        }
        allData.sort(function (a, b) {
            return b - a;
        });
        var rate = 600 / allData[0];
        draw(currentArr, rate);

        function draw(currentArr, rate) {
            for (var n = 0; n < currentArr.length; n++) {
                //折线
            ctx.strokeStyle = color[colorIndex ? colorIndex : n];
            ctx.lineJoin = "round";
            ctx.beginPath();
            for (var i = 0; i < 12; i++) {
                var x = 40 + 32.222 * (i * 3 + 2);
                var y = 680 - currentArr[n].sale[i] * rate;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            //数据点
            ctx.fillStyle = color[colorIndex ? colorIndex : n];
            ctx.lineWidth = 5;
            ctx.beginPath();
            for (var j = 0; j < 12; j++) {
                var x = 40 + 32.222 * (j * 3 + 2);
                var y = 680 - currentArr[n].sale[j] * rate;
                ctx.moveTo(x, y);
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
            }
            }
        }

        //月份标志
        ctx.fillStyle = "black";
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (var k = 0; k < 12; k++) {
            ctx.fillText(k + 1 + "月", 40 + 32.222 * (k * 3 + 2), 705)
        }

        //销量标志
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        for (var l = 0; l < 6; l++) {
            ctx.fillText((allData[0] / 5) * l, 20, 80 + 120 * (5 - l));
            ctx.beginPath();
            ctx.moveTo(40, 80 + 120 * (5 - l));
            ctx.lineTo(50, 80 + 120 * (5 - l));
            ctx.stroke();
        }

        chartBox.appendChild(canvas);
    }
}