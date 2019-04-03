//全局变量用于保存单个或者多个数据
var currentArr;
//生成表格
function table(dataArr) {
    //重新生成表格时，清空
    currentArr = [];

    data = dataArr[0];
    regionCnt = dataArr[1];
    productCnt = dataArr[2];

    //非第一次生成时，删除之前的表格
    table = document.querySelector("table");
    if (table) {
        tableBox.removeChild(table);
    }

    //表头
    var table = document.createElement("table");
    var trArr = [];
    for (var i = -1; i < data.length; i++) {
        trArr[i] = document.createElement("tr");
    }
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    if (regionCnt === 1) {
        th1.innerText = "地区";
        th2.innerText = "商品";
        trArr[-1].appendChild(th1);
        trArr[-1].appendChild(th2);
    } else {
        th1.innerText = "商品";
        th2.innerText = "地区";
        trArr[-1].appendChild(th1);
        trArr[-1].appendChild(th2);
    }
    for (var i = 1; i <= 12; i++) {
        var th = document.createElement("th");
        th.innerText = i + "月";
        trArr[-1].appendChild(th);
    }
    table.appendChild(trArr[-1]);
    tableBox.appendChild(table);

    //表格主体
    for (var i = 0; i < data.length; i++) {
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td1.innerText = data[i].product;
        td2.innerText = data[i].region;
        trArr[i].appendChild(td1);
        trArr[i].appendChild(td2);
        if (regionCnt === 1) {
            trArr[i].removeChild(trArr[i].firstChild);
            var td2 = document.createElement("td");
            td2.innerText = data[i].product;
            trArr[i].appendChild(td2);
        }
        for (var j = 0; j < 12; j++) {
            var td = document.createElement("td");
            td.innerText = data[i].sale[j];
            trArr[i].appendChild(td);
        }

        //添加标签
        trArr[i].tag = data[i].product + data[i].region;

        //鼠标滑过改变图表
        trArr[i].addEventListener("mouseover", function (e) {
            if (e.target.rowSpan === 1) {
                currentArr = [{}];
                //标签写法
                for (var k = 0; k < data.length; k++) {
                    if (e.currentTarget.tag === data[k].product + data[k].region) {
                        var getName = Object.assign({}, data[k]);
                        var getSale = Object.assign([], data[k].sale);
                        currentArr[0].product = getName.product;
                        currentArr[0].region = getName.region;
                        currentArr[0].sale = getSale;
                    }
                }
                //绘制当前图表
                barChart();
                lineChart();
            }
        });

        //获取所有需要生成图表的数据
        currentArr.push(data[i]);

        table.appendChild(trArr[i]);
    }

    //合并单元格
    var trs = document.querySelectorAll("tr");
    for (var j = 1; j < trs.length; j++) {
        var firstCol = trs[j].firstChild.innerText;
        for (var k = j + 1; k < trs.length; k++) {
            var firstCol1 = trs[k].firstChild.innerText;
            if (firstCol === firstCol1) {
                trs[j].firstChild.setAttribute("rowspan", k - j + 1);
                trs[k].removeChild(trs[k].firstChild);
            }
        }
    }

    //鼠标移出表格，恢复多项数据状态
    var table = document.querySelector("table");
    table.addEventListener("mouseout", function () {
        currentArr = [];
        for (var i = 0; i < data.length; i++) {
            currentArr.push(data[i]);
        }
        barChart();
        lineChart();
    });
}