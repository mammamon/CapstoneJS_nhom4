// Define the products variable
let products;

// Fetch product data from the API
function getProductList() {
    let promise = axios({
        url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
        method: 'GET',
    });

    promise
        .then(function (result) {
            console.log('result: ', result.data);
            products = result.data; // Assign the data to the products variable
            renderProductList(products); // Pass the product data to renderProductList
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Call the getProductList function
getProductList();


let cart = Cart.localStorageLoad();

// Function to initialize the Cart from local storage
function initializeCart() {
    const data = localStorage.getItem('cart');
    if (data) {
        const items = JSON.parse(data);
        cart = new Cart();
        cart.items = items;
    } else {
        cart = new Cart();
    }
}

// Call the initializeCart function to initialize the Cart
initializeCart();

// Function to format price
function formatPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

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
    const product = products.find((product) => product.name === productName);
    const price = parseFloat(product.price); // Parse the price as a float
    const quantityInput = $(this).closest('.modal-content').find('.quantity-input');
    const quantity = parseInt(quantityInput.val());

    const existingItem = cart.items.find((item) => item.name === productName);

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

// Function to render cart items
function renderCartItems(cart) {
    const cartItemContainer = $('.cart-item');
    let content = '';
    for (const cartItem of cart.items) {
        content += `
      <div class="cart-item">
        <p>${cartItem.name} - $${parseFloat(cartItem.price).toFixed(2)} - Quantity: ${cartItem.quantity}</p>
        <button class="btn btn-remove-from-cart" data-name="${cartItem.name}">Remove</button>
      </div>
    `;
    }
    cartItemContainer.html(content);

    // Add event listeners to "Remove" buttons
    $('.btn-remove-from-cart').click(removeFromCart);
}

// Function to handle removing a product from the cart
function removeFromCart() {
    const name = $(this).data('name');

    const item = cart.items.find((item) => item.name === name);
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

// Add event listener to cart icon for showing/hiding the cart zone
$('#cartIcon').click(function () {
    // Load the cart from local storage
    cart = Cart.localStorageLoad();

    // Render the loaded cart
    renderCartItems(cart);
    renderCartTotal();

    // Show or hide the cart zone based on its current display state
    const cartZone = $('#cartZone');
    cartZone.toggle();

    // If the cart is visible, update the product saved class
    if (cartZone.is(':visible')) {
        $('.product').each(function () {
            const productName = $(this).data('name');
            const saved = cart.items.some((item) => item.name === productName && item.saved);
            $(this).toggleClass('product-saved', saved);
        });
    }
});

// Add event listeners to quantity buttons in the modal
$(document).on('click', '.modal-body .btn-minus', decreaseQuantity);
$(document).on('click', '.modal-body .btn-plus', increaseQuantity);
$(document).on('click', '.btn-add-to-cart', addToCart);