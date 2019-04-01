//监听表单
form.addEventListener("change", function () {
    table(getData());
});

//默认选中第一项
region[0].click();
product[0].click();

//深拷贝（如果源对象的属性值又是一个对象，则也是仍然是引用）
//以下，对源对象的值进行拷贝，再对源对象中的对象的值进行拷贝
var obj = Object.assign({}, getData()[0][0]);
var currentArr = Object.assign([], getData()[0][0].sale);
currentArr.unshift(obj.region, obj.product);

