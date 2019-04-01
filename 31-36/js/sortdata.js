//筛选符合的数据
function getData() {
    var list = [];
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
                    list.push(sortData([region[j].value, product[i].value]));
                }
            }
        }
    }
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