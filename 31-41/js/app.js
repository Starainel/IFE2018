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

//------------------------直接设置hash的方式-----------------------------------

/* //前进/后退，即hash改变时，恢复页面
window.addEventListener("hashchange", function () {
    readHash();
});

//设置hash
function setHash(list) {
        var hash = [];
        for (var k = 0; k < list.length; k++) {
            hash[k] = list[k].region + "," + list[k].product;
        }

        location.hash = encodeURIComponent(hash.join(";"));
}

//读取hash，恢复页面
function readHash() {
    var hash = decodeURIComponent(location.hash.slice(1)).split(";");
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

    for (var m = 0; m < region.length; m++) {
        region[m].flag = undefined;
    }
    for (var n = 0; n < product.length; n++) {
        product[n].flag = undefined;
    }
}

//默认选中第一项
//有hash时，不再默认选中第一项
if (!location.hash) {
    region[0].click();
    product[0].click();
}

//读取/刷新时，恢复页面
readHash(); */

//------------------------直接设置hash的方式-----------------------------------


//--------------------使用pushstate操作历史记录的方式-------------------

//前进/后退时，恢复之前的状态 (hash改变会触发popstate)
window.addEventListener("popstate", function (e) {
    recover(e.state);
});

function addHistory(list) {
    var stateObj = [];
    for (var k = 0; k < list.length; k++) {
        stateObj[k] = list[k].region + "," + list[k].product;
    }

    if (!flag) {
        history.pushState(stateObj, "", location.href.slice(0, location.protocol.length + 2 + location.host.length) +
            location.pathname + "#" + encodeURIComponent(stateObj.join(";")));
    } else {
        history.replaceState(stateObj, "", location.href.slice(0, location.protocol.length + 2 + location.host.length) +
            location.pathname + "#" + encodeURIComponent(stateObj.join(";")));
    }

    flag = undefined;
}

function recover(stateObj) {
    var arr = stateObj ? stateObj : decodeURIComponent(location.hash).slice(1).split(";");
    for (var l = 0; l < arr.length; l++) {
        var one = arr[l].split(",");
        for (var m = 0; m < region.length; m++) {
            if (region[m].value === one[0]) {
                region[m].flag = true;
                if (!region[m].checked) {
                    flag = true;
                    region[m].click();
                }
            }
        }
        for (var n = 0; n < product.length; n++) {
            if (product[n].value === one[1]) {
                product[n].flag = true;
                if (!product[n].checked) {
                    flag = true;
                    product[n].click();
                }
            }
        }
    }

    for (var m = 0; m < region.length; m++) {
        if (!region[m].flag) {
            if (region[m].checked) {
                flag = true;
                region[m].click();
            }
        }
    }
    for (var n = 0; n < product.length; n++) {
        if (!product[n].flag) {
            if (product[n].checked) {
                flag = true;
            product[n].click();
            } 
        }
    }

    for (var m = 0; m < region.length; m++) {
        region[m].flag = undefined;
    }
    for (var n = 0; n < product.length; n++) {
        product[n].flag = undefined;
    }
}

//默认选中第一项
//有hash时，不再默认选中第一项
if (!location.hash) {
    flag = true;
    region[0].click();
    flag = true;
    product[0].click();
}

//读取/刷新，恢复页面
recover();

//--------------------使用pushstate操作历史记录的方式-------------------

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