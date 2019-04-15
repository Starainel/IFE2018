//筛选符合的数据
function getData() {
    //所需的数据
    var list = [];
    //checkbox勾选计数
    var regionCnt = 0;
    var productCnt = 0;
    for (var i = 0; i < 3; i++) {
        if (product[i].checked) {
            productCnt++;
            for (var j = 0; j < 3; j++) {
                if (region[j].checked) {
                    if (i === 0) {
                        regionCnt++;
                    }
                    //如果本地没有存储数据，则直接读取原始数据
                    if (!localStorage.getItem(region[j].value + "," + product[i].value)) {
                        list.push(sortData([region[j].value, product[i].value]));
                    }
                    //如果本地存储有数据，则读取本地数据
                    else {
                        //将字符串数据转换为对象，用于之后的操作
                        var obj = {};
                        obj.region = region[j].value;
                        obj.product = product[i].value;
                        var str = localStorage.getItem(region[j].value + "," + product[i].value);
                        var arr = str.split(",");
                        obj.sale = arr;
                        list.push(obj);
                    }
                }
            }
        }
    }

    /* //直接设置hash的方式
    setHash(list); */

    //使用pushstate操作历史记录的方式
    addHistory(list);

    return [list, regionCnt, productCnt];
}

//遍历查找所有原始数据
function sortData(arr) {
    for (var i = 0; i < sourceData.length; i++) {
        if (sourceData[i].region === arr[0] && sourceData[i].product === arr[1]) {
            return sourceData[i];
        }
    }
}