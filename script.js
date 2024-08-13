'use strict';

const inputSize = document.querySelector('.input-size');
const inputCrust = document.querySelector('.input-crust');
const inputToppings = document.querySelector('.toppings');
const inputQuantity = document.querySelector('.input-quantity');
const placeOrder = document.querySelector('#place-order-button');
const toppings = document.querySelectorAll('.input-topping');
const orderSummary = document.querySelector('#order-summary-details');
const inputLocation = document.querySelectorAll('.input-location');
const inputUser = document.querySelector('.input-name');

console.log(inputUser.value);

let price = [];
let displayTotal;

const sizePrice = {
  small: 800,
  medium: 1200,
  large: 2000,
};

const toppingPrice = {
  mushrooms: 120,
  tikka: 250,
  chilli: 70,
};

const deliveryPrice = {
  area: 0,
  center: 210,
  suburbs: 400,
  uptown: 600,
  downtown: 650,
  outskirts: 450,
};

inputLocation.forEach(location =>
  location.addEventListener('click', function (e) {
    price.push(deliveryPrice[`${e.target.value}`]);
    console.log(price);
  })
);

toppings.forEach(topping =>
  topping.addEventListener('click', function (e) {
    price.push(toppingPrice[`${e.target.value}`]);
  })
);

const orderPizza = function (e) {
  e.preventDefault();

  price.push(Number(inputQuantity.value) * sizePrice[`${inputSize.value}`]);
  displayTotal = price.reduce((accum, total) => accum + total, 0);

  orderSummary.innerHTML = `${inputUser.value} order: ${inputQuantity.value} ${inputSize.value} pizza Cost: ${displayTotal}`;
};

placeOrder.addEventListener('click', orderPizza);
