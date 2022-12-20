"use strict";

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');
document.querySelector('.cartIconWrap').addEventListener('click', () =>{
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
      basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    let totalCount = 0;
    Object.values(basket).forEach((i) => {
        totalCount += i.count
    })
    return totalCount
} 

function getTotalBasketPrice() {
    let totalPrice = 0;
    Object.values(basket).forEach((i) => {
        totalPrice += i.count * i.price
    })
    return totalPrice
}

function renderProductInBasket(productId) {
    const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
      }
    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);

    
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }