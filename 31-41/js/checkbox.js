var form = document.querySelector("form");
var region = document.querySelectorAll("[name = region-select]");
var product = document.querySelectorAll("[name = product-select]");
var chartBox = document.querySelector("#chart-wrapper");
var tableBox = document.querySelector("#table-wrapper");
var regionAll = document.querySelector("#region-all");
var productAll = document.querySelector("#product-all");

//是否添加历史记录
var flag;

ckbox(region, 3, regionAll);
ckbox(product, 3, productAll);

//checkbox的操作逻辑
function ckbox(type, num, allbox) {
    var count = 0;
    for (var i = 0; i < type.length; i++) {
        type[i].addEventListener("click", function (e) {
            if (e.currentTarget.checked) {
                count++;
            } else if (count > 1) {
                count--;
            } else {
                e.currentTarget.checked = true;
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