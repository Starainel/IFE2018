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
//有hash时，不再默认选中第一项
if (!location.hash) {
    region[0].click();
    product[0].click();
}

//读取hash，恢复页面
readHash();

//前进/后退时，恢复之前的状态
window.addEventListener("popstate", function () {
    readHash();
});

function setHash(list) {
    var hash = [];
    for (var k = 0; k < list.length; k++) {
        hash[k] = list[k].region + "," + list[k].product;
    }
    location.hash = encodeURIComponent(hash.join(";"));
}

function readHash() {
    var hash = decodeURIComponent(location.hash).slice(1).split(";");
    //勾选hash中存在的选项，并标记
    for (var l = 0; l < hash.length; l++) {
        var one = hash[l].split(",");
        for (var m = 0; m < region.length; m++) {
            if (region[m].value === one[0]) {
                region[m].flag = true;
                if (!region[m].checked) {
                    region[m].click();
                }
            }
        }
        for (var n = 0; n < product.length; n++) {
            if (product[n].value === one[1]) {
                product[n].flag = true;
                if (!product[n].checked) {
                    product[n].click();
                }
            }
        }
    }

    //根据标记取消不存在的选项
    for (var m = 0; m < region.length; m++) {
        if (!region[m].flag) {
            if (region[m].checked) {
                region[m].click();
            }
        }
    }
    for (var n = 0; n < product.length; n++) {
        if (!product[n].flag) {
            if (product[n].checked) {
                product[n].click();
            }
        }
    }

    //恢复标记
    for (var m = 0; m < region.length; m++) {
        region[m].flag = undefined;
    }
    for (var n = 0; n < product.length; n++) {
        product[n].flag = undefined;
    }

}

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