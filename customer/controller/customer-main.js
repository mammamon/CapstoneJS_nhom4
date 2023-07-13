import { Cart, CartItem } from './customer-model.js';
import { formatPrice, renderProductList, renderCartItems } from './customer-view.js';

// Function to handle decreasing quantity
function decreaseQuantity() {
  const quantityInput = $(this).siblings('.quantity-input');
  let quantity = parseInt(quantityInput.val());

  if (quantity > 1) {
    quantity--;
    quantityInput.val(quantity);
  }
}

// Function to handle increasing quantity
function increaseQuantity() {
  const quantityInput = $(this).siblings('.quantity-input');
  let quantity = parseInt(quantityInput.val());

  if (quantity < 10) {
    quantity++;
    quantityInput.val(quantity);
  }
}

// Function to handle adding a product to the cart
function addToCart() {
  const productName = $(this).closest('.modal-content').find('.product-info h3').text();
  const product = products.find(product => product.name === productName);
  const price = parseFloat(product.price); // Parse the price as a float
  const quantityInput = $(this).closest('.modal-content').find('.quantity-input');
  const quantity = parseInt(quantityInput.val());

  const existingItem = cart.items.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newItem = new CartItem(productName, price, quantity);
    cart.addItem(newItem);
  }

  renderCartItems(cart); // Update the cart items
  renderCartTotal(); // Update the cart total

  const productDiv = $(`.product[data-name="${productName}"]`);
  productDiv.addClass('product-saved');

  $('#cartZone').css('display', 'block');

  cart.localStorageSave();

  // Reset the quantity input to 1
  quantityInput.val(1);

  $('#addProductModal').modal('hide');
}

// Function to handle removing a product from the cart
function removeFromCart() {
  const name = $(this).data('name');

  const item = cart.items.find(item => item.name === name);
  if (item) {
    cart.removeItem(item);
  }

  renderCartItems(cart);
  renderCartTotal();

  const productDiv = $(`.product[data-name="${name}"]`);
  productDiv.removeClass('product-saved');

  if (cart.items.length === 0) {
    $('#cartZone').css('display', 'none');
  }

  cart.localStorageSave();
}

// Function to render the cart total
function renderCartTotal() {
  $('#cartTotal').text(cart.totalPrice());
}

// Create a new cart instance
let cart = Cart.localStorageLoad();

// Fetch product data from API and render the product list
function getProductList() {
  $.get('https://649d36a19bac4a8e669d62a2.mockapi.io/product', function(data) {
    products = data;
    renderProductList(products);
  });
}

// Attach event listeners
$(document).ready(function() {
  getProductList();

  $('#cartZone').css('display', cart.items.length > 0 ? 'block' : 'none');

  $('#btn-clear-cart').click(function() {
    cart = new Cart();
    renderCartItems(cart);
    renderCartTotal();
    $('.product').removeClass('product-saved');
    $('#cartZone').css('display', 'none');
    cart.localStorageSave();
  });

  $('#btn-checkout').click(function() {
    alert('Checkout functionality is not implemented yet.');
  });

  $(document).on('click', '.btn-decrease-quantity', decreaseQuantity);
  $(document).on('click', '.btn-increase-quantity', increaseQuantity);
  $(document).on('click', '.btn-add-to-cart', addToCart);
  $(document).on('click', '.btn-remove-from-cart', removeFromCart);
});
