//主操作

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

//本地存储
//点击按钮保存数据到本地存储
btn = document.querySelector("#save-btn");
btn.addEventListener("click", function () {
    var input = document.querySelector("table").querySelectorAll("input");
    var arr = [];
    for (var i = 0; i < currentArr.length; i++) {
        var newArr = [];
        for (var j = 0; j < 12; j++) {
            newArr.push(input[i * 12 + j].value);
        }
        arr.push(newArr)
    }
    //点击保存时，将现在的数据和之前的数据进行比较，如果存在不同，则进行存储
    for (var j = 0; j < currentArr.length; j++) {
        for (var k = 0; k < 12; k++) {
            if (arr[j][k] != currentArr[j].sale[k]) {
                ls(currentArr[j].region + "," + currentArr[j].product, arr[j]);
            }
        }
    }
});

//存储本地数据
function ls(tag, data) {
    localStorage.setItem(tag, data);
}