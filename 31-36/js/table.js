//生成表格
function table(dataArr) {
    data = dataArr[0];
    regionCnt = dataArr[1];
    productCnt = dataArr[2];

    //非第一次生成时，删除之前的表格
    table = document.querySelector("table");
    if (table) {
        div.removeChild(table);
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
    div.appendChild(table);

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

        trArr[i].addEventListener("mouseover", function(e) {
            var bar = document.querySelector("svg");
            var line = document.querySelector("canvas");
            if (bar && line) {
                document.body.removeChild(bar);
                document.body.removeChild(line);
            }

            currentArr = [];
            var tdArr = e.target.parentNode.childNodes
            for (var j = 0; j < tdArr.length; j++) {
                if (tdArr.length === 13) {
                    currentArr[j + 1] = tdArr[j].innerText;
                } else {
                    currentArr[j] = tdArr[j].innerText;
                }
            }
            barChart();
            lineChart();
        });
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
}