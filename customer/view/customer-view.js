// Function to render the cart modal
function renderCartModal(productName) {
  const product = products.find((product) => product.name === productName);
  const modal = $('#addProductModal');
  modal.find('.modal-title').text('Add to Cart');

  // Clear previous content
  modal.find('.product-info').empty();

  // Create table for product attributes
  const table = $('<table>').addClass('product-attributes');
  for (const key in product) {
    if (product.hasOwnProperty(key) && key !== 'spec' && key !== 'option' && key !== 'image' && key !=='id' && key !=='title') {
      const value = product[key];
      const row = $('<tr>');
      const attribute = $('<td>').text(key);
      const attributeValue = $('<td>').text(value);
      row.append(attribute, attributeValue);
      table.append(row);
    }
  }

  // Check and handle spec attribute
  if (product.spec && !isEmptyObject(product.spec)) {
    for (const specKey in product.spec) {
      if (product.spec.hasOwnProperty(specKey)) {
        const specRow = $('<tr>');
        const specAttribute = $('<td>').text(`Spec - ${specKey}`);
        const specValue = $('<td>').text(product.spec[specKey]);
        specRow.append(specAttribute, specValue);
        table.append(specRow);
      }
    }
  }

  // Check and handle option attribute
  if (product.option && !isEmptyObject(product.option)) {
    for (const optionKey in product.option) {
      if (product.option.hasOwnProperty(optionKey)) {
        const optionRow = $('<tr>');
        const optionAttribute = $('<td>').text(`Option - ${optionKey}`);
        const optionValue = $('<td>').text(product.option[optionKey]);
        optionRow.append(optionAttribute, optionValue);
        table.append(optionRow);
      }
    }
  }

  // Append table to modal content
  modal.find('.product-info').append(table);

  modal.modal('show');
}





// Function to render the cart total
function renderCartTotal() {
  $('#cartTotal').text(cart.totalPrice());
}

// Function to render cart items
function renderCartItems() {
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

// Function to render the cart total
function renderCartTotal() {
  $('#cartTotal').text(cart.totalPrice());
}

// Function to render product list
function renderProductList(products) {
  const productShow = $('.product-show');
  let content = '';
  for (const product of products) {
    const saved = cart.items.some(item => item.name === product.name && item.saved);
    const productClass = saved ? 'product product-saved' : 'product';

    const formattedPrice = formatPrice(product.price);

    content += `
      <div class="${productClass}" data-name="${product.name}">
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <p>Price: ${formattedPrice}</p>
        <button class="btn btn-purchase" data-name="${product.name}">Purchase</button>
      </div>
    `;
  }
  productShow.html(content);

  // Event listener for "Purchase" buttons
  productShow.on('click', '.btn-purchase', function () {
    const productName = $(this).data('name');
    renderCartModal(productName);
  });
}

// Function to handle adding a product to the cart
function addToCart(button) {
  const productName = button.closest('.product').data('name');
  const product = products.find((product) => product.name === productName);
  const price = parseFloat(product.price);
  const quantityInput = button.closest('.product').find('.quantity-input');
  const quantity = parseInt(quantityInput.val());

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

  // Reset the quantity input to 1
  quantityInput.val(1);
}

// Event listener for "Add to Cart" buttons
$(document).on('click', '.btn-add-to-cart', function() {
  addToCart($(this));
});

// Call the renderProductList function to render the initial product list
renderProductList(products);
