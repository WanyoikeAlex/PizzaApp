'use strict';

const inputSize = document.querySelector('.input-size');
const inputCrust = document.querySelector('.input-crust');
const inputQuantity = document.querySelector('.input-quantity');
const inputLocation = document.querySelector('.input-location');
const inputUser = document.querySelector('.input-name');
const toppings = document.querySelectorAll('.toppings');
const orderSummary = document.querySelector('#order-summary');

const placeOrder = document.querySelector('#place-order-button');
const addOrder = document.querySelector('#add-order-button');
const reset = document.querySelector('#reset-button');

let inputToppings = [];
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
  pickup: 0,
  center: 210,
  suburbs: 400,
  uptown: 600,
  downtown: 650,
  outskirts: 450,
};

// Get the toppings Added
toppings.forEach(topping =>
  topping.addEventListener('change', function (e) {
    if (!inputToppings.includes(e.target.value)) {
      inputToppings.push(e.target.value);
    } else if (inputToppings.includes(e.target.value)) {
      let index = inputToppings.indexOf(e.target.value);
      inputToppings.splice(index, 1);
    }
  })
);

// Function to Order Pizza
const orderPizza = function (e) {
  // e.preventDefault();

  // Remove all the values in the Summary columns
  orderSummary.innerHTML = '';

  // Add Location Price
  // if (inputLocation.value === 'pickup' && inputUser.value === '') {
  //   alert`Please input Customer Name`;
  //   return '';
  // }

  // Get the number of pizza and price Add and Cost
  let outputQuantity =
    Number(inputQuantity.value) * sizePrice[`${inputSize.value}`];
  price.push(outputQuantity);

  // Delivery Cost Based on Area
  let outputDelivery = deliveryPrice[`${inputLocation.value}`];
  price.push(outputDelivery);

  // Add toppings Prices
  inputToppings.forEach(
    topping =>
      function () {
        price.push(toppingPrice[topping]);
      }
  );

  // Display total Price for all the products
  displayTotal = price.reduce((accum, total) => accum + total, 0);
  console.log(price);

  // Display Customer Name
  const displayName =
    inputUser.value != ''
      ? `<p><strong>Customer Name:</strong> <span id="summary-name">${inputUser.value}</span></p>`
      : '';
  // HTML Display
  const html = ` 
      
        <h2 class="section-title">Order Summary</h2>
        <!-- Order summary details will be displayed here -->
        <div class="order-details">
          <p><strong>Size:</strong> <span id="summary-size">${inputSize.value}</span></p>
          <p><strong>Crust:</strong> <span id="summary-crust">${inputCrust.value}</span></p>
          <p><strong>Toppings:</strong> <span id="summary-toppings">${inputToppings}</span></p>
          <p><strong>Number of Pizzas:</strong> <span id="summary-quantity">${inputQuantity.value}</span></p>
          <p><strong>Delivery Location:</strong> <span id="summary-location">${inputLocation.value}</span></p>
          ${displayName}
          <p><strong>Total:</strong> <span id="summary-delivery">${displayTotal}</span></p>
        </div>
      `;

  // Display Summary for the pizza
  // orderSummary.innerHTML = html;
  orderSummary.insertAdjacentHTML('afterbegin', html);

  // RemoveEventListener Pizza
  placeOrder.removeEventListener('click', orderPizza);
};

placeOrder.addEventListener('click', orderPizza);

// Add Order Function
const newOrder = function (e) {
  e.preventDefault();
};
// Add Order
addOrder.addEventListener('click', newOrder);

// Button to Reset Fields
reset.addEventListener('click', function (e) {
  e.preventDefault();

  inputToppings = [];
  price = [];
  displayTotal;

  orderSummary.innerHTML = '';
  placeOrder.addEventListener('click', orderPizza);
});
