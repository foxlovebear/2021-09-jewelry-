
// 痾約吃飯過程: 1.車內計算 1-2按鈕:增減移除 2.ICON數字 3. 增減進車車 4.點擊跳出附屬頁面
// 計算-------------------------------------------------------------
var Icon = 0;
function calculate() {
var TBody = document.getElementById("tb");
var prices = TBody.querySelectorAll("td:nth-child(4)");
var numbers = TBody.querySelectorAll("td:nth-child(5)>input[type=number]");
var checkboxes = TBody.querySelectorAll("th:nth-child(1)>input");
// console.log(prices);
// console.log(numbers);
// console.log(checkboxes);
var total=0;
for(var i = 0; i < prices.length; i++) {
// console.log("價格：" +parseInt(prices[i].innerText)+" 數量："+parseInt(numbers[i].value) + "是否勾選:" + checkboxes[i].checked);
if(checkboxes[i].checked){
total += parseInt(prices[i].innerText)*parseInt(numbers[i].value);
}
}
// console.log("總價格：" + total);
document.getElementById("total").innerText = total;


// 點擊更改購物車圖示--------------------------------------------
    for(i=0 ; i<numbers.length ;i++){
    // console.log(numbers[i].value);
    Icon = Icon + parseInt(numbers[i].value);
    // console.log();
    }
    var changeIcon = document.getElementById("lblCartCount").innerHTML= Icon;
    Icon = 0;
}



// 增加購物車商品數量--------------------------------------------------------------
function addMnt(me) {
var tdMnt = me.parentNode;
var CHinputs = tdMnt.querySelector("input[type=number]"); // 找到此td下所有input標籤
// console.log(CHinputs.value);
CHinputs.value = parseInt(CHinputs.value) +1;
// console.log(CHinputs.value);
calculate();
}
// 減少購物車商品數量------------------------------------------------------------------------
function miner(me) {
var tdMnt = me.parentNode;
var CHinputs = tdMnt.querySelector("input[type=number]"); // 找到此td下所有input標籤
// console.log(CHinputs.value);
CHinputs.value = parseInt(CHinputs.value) -1;
// console.log(CHinputs.value);
if( CHinputs.value <= 1 ) { // 設定最小為1
CHinputs.value = 1;
}
calculate();
}

// 移除購物車商品-----------------------------------------------------------------------------------
function del(me) {
var deTr = me.parentNode.parentNode;
var tbody = deTr.parentNode;
tbody.removeChild(deTr);
calculate();
}


// 新增商品至購物車--------------------------------------------------------------
function add(me) {
var tbody = document.getElementById("tb");
var div = me.parentNode;
var pName = me.dataset.name;// 獲得商品名字
var pPrice = me.dataset.price;
var pImg = me.dataset.picture;
// console.log(pImg);

var colName= tbody.querySelectorAll("td:nth-child(3)"); // nth-child 作為第幾個孩子
// console.log(colName);
var found = null; // found => 車內找到的td
for(var i = 0; i<colName.length; i++) {
// console.log(colName[i].innerText);
if( colName[i].innerText == pName) {
found = colName[i];
// console.log(found);
break;
}
}

if(found != null) { //商品名字存在
// 修改數量 found 是上面用FOR迴圈找到的td
var ProductTr = found.parentNode;
var input = ProductTr.querySelector("td:nth-child(5)>input:nth-child(2)");
// console.log(input);
input.value= parseInt(input.value) + 1 ;
calculate();

} else { //商品名字不存在
//新增商品
var Addtr = document.createElement("tr");
var Addth = document.createElement("th"); // 新增Checkbox
Addth.innerHTML = '<input type="checkbox" checked onclick="calculate()">';

var td1 = document.createElement("td"); // 新增圖片
var Addimg = document.createElement("img");
Addimg.setAttribute("src",`${pImg}`);
Addimg.setAttribute("width", "100px");
td1.appendChild(Addimg);
// console.log(Addimg)

var td2 = document.createElement("td"); // 新增名字
td2.innerText = pName; 
// console.log(td2.innerText);

var td3 = document.createElement("td");// 新增價格
td3.innerText = pPrice;

var td4 = document.createElement("td");// 新增數量框
td4.innerHTML = '<input type="button" value="-" onclick="miner(this)"><input type="number" value="1"><input type="button" value="+" onclick="addMnt(this)">';

var td5 = document.createElement("td");// 新增移除按鈕
td5.innerHTML = '<input type="button" value="移除" onclick="del(this)">';

Addtr.appendChild(Addth);
Addtr.appendChild(td1);
Addtr.appendChild(td2);
Addtr.appendChild(td3);
Addtr.appendChild(td4);
Addtr.appendChild(td5);
tbody.appendChild(Addtr);
calculate();
}

}


