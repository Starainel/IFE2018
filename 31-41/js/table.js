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
            //在td中嵌入input
            var input = document.createElement("input");
            input.value = data[i].sale[j];
            input.type = "number";
            //设置恢复值
            input.back = data[i].sale[j];

            //点击单元格生成确定和取消按钮
            td.addEventListener("click", function (e) {
                //多次点击，保持一对按钮
                if (!table.querySelector("button")) {
                    var btnOk = document.createElement("button");
                    var btnCnc = document.createElement("button");
                    btnOk.innerText = "√";
                    btnCnc.innerText = "×";
                    e.currentTarget.firstChild.style.width = "65%";
                    //添加自定义属性，用于判断input失焦时是否进行取消操作
                    btnOk.addEventListener("mouseover", function () {
                        btnOk.tag = true;
                    });
                    btnOk.addEventListener("mouseout", function () {
                        btnOk.tag = false;
                    });
                    btnCnc.addEventListener("mouseover", function () {
                        btnCnc.tag = true;
                    });
                    btnCnc.addEventListener("mouseout", function () {
                        btnCnc.tag = false;
                    });
                    //确定按钮
                    btnOk.addEventListener("click", function (e) {
                        var val = e.currentTarget.parentNode.firstChild.value;
                        if (val < 0 || Math.floor(val) != val) {
                            alert("输入不合法！");
                            //如果不合法，则恢复到之前的数据
                            e.currentTarget.parentNode.firstChild.value = e.currentTarget.parentNode.firstChild.back;
                        } else {
                            //如果合法，更新恢复值
                            e.currentTarget.parentNode.firstChild.back = e.currentTarget.parentNode.firstChild.value;
                        }
                        cancel(e.currentTarget.parentNode);
                        e.stopPropagation();
                    });
                    btnOk.addEventListener("blur", function (e) {
                        if (!e.currentTarget.tag && !e.currentTarget.nextSibling.tag) {
                            cancel(e.currentTarget.parentNode);
                        }
                    });
                    //取消按钮
                    btnCnc.addEventListener("click", function (e) {
                        e.currentTarget.parentNode.firstChild.value = e.currentTarget.parentNode.firstChild.back;
                        cancel(e.currentTarget.parentNode);
                        //阻止冒泡到td
                        e.stopPropagation();
                    });
                    btnCnc.addEventListener("blur", function (e) {
                        if (!e.currentTarget.tag && !e.currentTarget.previousSibling.tag) {
                            cancel(e.currentTarget.parentNode);
                        }
                    });
                    e.currentTarget.appendChild(btnOk);
                    e.currentTarget.appendChild(btnCnc);
                }
            });

            //单元格失焦时，取消操作
            input.addEventListener("blur", function (e) {
                if (e.currentTarget.nextSibling) {
                    if (!e.currentTarget.nextSibling.tag && !e.currentTarget.nextSibling.nextSibling.tag) {
                        cancel(e.currentTarget.parentNode);
                        e.currentTarget.value = e.currentTarget.back;
                    }
                }
            });

            //ESC和ENTER操作
            input.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {
                    e.currentTarget.nextSibling.click();
                } else if (e.keyCode === 27) {
                    e.currentTarget.nextSibling.nextSibling.click();
                }
            });

            //隐藏按钮
            function cancel(td) {
                td.removeChild(td.querySelector("button"));
                td.removeChild(td.querySelector("button"));
                td.firstChild.removeAttribute("style");
            }

            td.appendChild(input);
            trArr[i].appendChild(td);
        }

        //添加标签
        trArr[i].tag = data[i].product + data[i].region;

        //鼠标滑过改变图表
        trArr[i].addEventListener("mouseover", function (e) {
            if (e.target.nodeName === "TD" ? e.target.rowSpan === 1 : e.target.parentNode.rowSpan === 1) {
                currentArr = [{}];
                //标签写法
                for (var k = 0; k < data.length; k++) {
                    if (e.currentTarget.tag === data[k].product + data[k].region) {
                        var getName = Object.assign({}, data[k]);
                        var getSale = Object.assign([], data[k].sale);
                        currentArr[0].product = getName.product;
                        currentArr[0].region = getName.region;
                        currentArr[0].sale = getSale;
                        break;
                    }
                }
                //绘制当前的单项图表，k：使用指定的颜色
                barChart(k);
                lineChart(k);
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