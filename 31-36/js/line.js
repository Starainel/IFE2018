function lineChart(num) {
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


        if (num === 1) {
            var saleArr = currentArr.slice(2);
            saleArr.sort(function (a, b) {
                return b - a;
            });
            var rate = 600 / saleArr[0];
            saleArr = currentArr.slice(2);
            draw(saleArr, rate);

        } else if (num > 1) {
            var allLineData = [];
            for (var i = 0; i < lineArr.length; i++) {
                var lineArrD = lineArr[i].sale.slice(2);
                allLineData = allLineData.concat(lineArrD);
            }
            allLineData.sort(function (a, b) {
                return b - a;
            });
            var rate = 600 / allLineData[0];
            for (var j = 0; j < lineArr.length; j++) {
                draw(lineArr[j].sale, rate);
            }

        }

        function draw(saleArr, rate) {
            randomColor = "rgb(" + Math.round(Math.random() * 100) * 2.55 + "," + Math.round(Math.random() * 100) * 2.55 + "," + Math.round(Math.random() * 100) * 2.55 + ")";

            //折线
            ctx.strokeStyle = randomColor;
            ctx.lineJoin = "round";
            ctx.beginPath();
            for (var i = 0; i < 12; i++) {
                var x = 40 + (i + 1) * 96.666;
                var y = 680 - saleArr[i] * rate;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            //数据点
            ctx.fillStyle = randomColor;
            ctx.lineWidth = 5;
            ctx.beginPath();
            for (var j = 0; j < 12; j++) {
                var x = 40 + (j + 1) * 96.666;
                var y = 680 - saleArr[j] * rate;
                ctx.moveTo(x, y);
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
            }
        }
        chartBox.appendChild(canvas);
    }
}