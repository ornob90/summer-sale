// DOM Elements
const productLists = document.getElementsByClassName("product");
const totalPriceElement = document.getElementById("total-price");
const totalElement = document.getElementById("total");
const cart = document.getElementById("cart");
const discountElement = document.getElementById("discount");
const couponInputElement = document.getElementById("coupon-code");
const btnApply = document.getElementById("btn-apply");
const inputPurchaseElement = document.getElementById("my_modal_6");
const purchaseBtnElement = document.getElementById("make-purchase-btn");
const goHomeElement = document.getElementById("go-home");

// Event Listeners
for (let i = 0; i < productLists.length; i++) {
  productLists[i].addEventListener("click", function () {
    const product = this;
    let price = parseFloat(
      product.childNodes[7].childNodes[7].childNodes[3].childNodes[0].innerText
    );

    let productName =
      product.childNodes[7].childNodes[7].childNodes[1].innerText;

    addToCart(productName);
    updateTotalPrice(price);
    updateTotal();
  });
}

btnApply.addEventListener("click", function () {
  const couponCode = getCouponCode();
  discountCheck(couponCode);
});

goHomeElement.addEventListener("click", reset);

// Functions
function addToCart(productName) {
  cart.innerHTML += `
    <li class="font-[500] text-md ml-4">${productName}</li>
    `;
}

function getTotalPrice() {
  return parseFloat(totalPriceElement.innerText);
}

function getCouponCode() {
  return couponInputElement.value;
}

function discountUpdate(discountAmount) {
  discountElement.innerText = discountAmount;
}

function enableBtn(totalPrice) {
  if (totalPrice >= 200) {
    btnApply.classList.remove("bg-pink-400");
    btnApply.classList.add("bg-[#E527B2]");
    btnApply.disabled = false;
  }

  if (totalPrice > 0) {
    purchaseBtnElement.classList.remove("bg-pink-400");
    purchaseBtnElement.classList.add("bg-[#E527B2]");
    inputPurchaseElement.disabled = false;
  }
}

function discountCheck(couponCode) {
  if (couponCode !== "SELL200") {
    discountUpdate(0);
    updateTotal();
    return;
  }

  let discountAmount = 0;
  let totalPrice = getTotalPrice();

  if (totalPrice >= 200) {
    discountAmount = ((totalPrice / 100) * 20).toFixed(2);
  }

  discountUpdate(discountAmount);

  updateTotal();
}

function updateTotalPrice(price) {
  let totalPrice = getTotalPrice() + price;

  enableBtn(totalPrice);

  totalPriceElement.innerText = totalPrice;

  const couponCode = getCouponCode();
  discountCheck(couponCode);
}

function updateTotal() {
  const totalPrice = parseFloat(totalPriceElement.innerText);
  const discount = parseFloat(discountElement.innerText);
  totalElement.innerText = totalPrice - discount;
}

function reset() {
  cart.innerHTML = "";
  totalPriceElement.innerText = 0;
  totalElement.innerText = 0;
  discountElement.innerText = 0;
  couponInputElement.value = "";
}
