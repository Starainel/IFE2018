var form = document.querySelector("form");
var region = document.querySelectorAll("[name = region-select]");
var product = document.querySelectorAll("[name = product-select]");
var chartBox = document.querySelector("#chart-wrapper");
var div = document.querySelector("#table-wrapper");
var regionAll = document.querySelector("#region-all");
var productAll = document.querySelector("#product-all");

ckbox(region, 3, regionAll);
ckbox(product, 3, productAll);

//全选事件
function ckbox(type, num, allbox) {
    var count = 0;
    for (var i = 0; i < type.length; i++) {
        type[i].addEventListener("click", function (e) {
            if (e.target.checked) {
                count++;
            } else if (count > 1) {
                count--;
            } else {
                e.target.checked = true;
                alert("不能全部取消！");
            }
            if (count === num) {
                allbox.checked = true;
            } else {
                allbox.checked = false;
            }
        });
    }
    allbox.addEventListener("click", function () {
        if (count !== num && allbox.checked) {
            count = num;
            for (var j = 0; j < type.length; j++) {
                type[j].checked = true;
            }
        } else if (count === num && !allbox.checked) {
            allbox.checked = true;
            alert("不能全部取消！");
        }
    });
}