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

    renderCartItems();
    renderCartTotal();
}

// Call the initializeCart function to initialize the Cart
initializeCart();

// Function to format price
function formatPrice(price) {
    const formattedPrice = parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedPrice;
}
//isEmpty Object
function isEmptyObject(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
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

// Add event listener to cart icon for showing/hiding the cart zone
$('#cartIcon').click(function () {
    // Load the cart from local storage
    cart = Cart.localStorageLoad();

    // Render the loaded cart
    renderCartItems();
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

// Function to handle removing a product from the cart
function removeFromCart() {
    const name = $(this).data('name');

    const item = cart.items.find((item) => item.name === name);
    if (item) {
        cart.removeItem(item);
    }

    renderCartItems();
    renderCartTotal();

    const productDiv = $(`.product[data-name="${name}"]`);
    productDiv.removeClass('product-saved');

    if (cart.items.length === 0) {
        $('#cartZone').css('display', 'none');
    }

    cart.localStorageSave();
}

// Event listener for "Add to Cart" buttons
// Function to handle adding a product to the cart
function addToCart(product) {
    const productName = product.name;
    const price = parseFloat(product.price);
    const quantity = 1;

    const existingItem = cart.items.find((item) => item.name === productName);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const newItem = new CartItem(productName, price, quantity);
        cart.addItem(newItem);
    }

    renderCartItems();
    renderCartTotal();

    const productDiv = $(`.product[data-name="${productName}"]`);
    productDiv.addClass('product-saved');

    $('#cartZone').css('display', 'block');

    cart.localStorageSave();
}
$(document).on('click', '.btn-add-to-cart', function () {
    const productName = $(this).closest('.modal-content').find('.product-info h3').text();
    const product = products.find((product) => product.name === productName);
    addToCart(product);
});


