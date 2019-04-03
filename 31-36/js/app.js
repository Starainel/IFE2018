//监听表单
form.addEventListener("change", function () {
    table(getData());
    barChart();
    lineChart();
});

//分配颜色
var color = [];
for (var m = 0; m < 9; m++) {
    randomColor = "rgb(" + Math.round(Math.random() * 100 * 2.55) + "," + Math.round(Math.random() * 100 * 2.55) + "," + Math.round(Math.random() * 100 * 2.55) + ")";
    color.push(randomColor);
}

//默认选中第一项
region[0].click();
product[0].click();