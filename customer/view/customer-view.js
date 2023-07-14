function renderProductInfo(product) {
  const modal = $('#addProductModal');
  modal.find('.modal-title').text('Add to Cart');

  // Clear previous content
  modal.find('.product-info').empty();

  // Create table for product attributes
  const table = $('<table>').addClass('product-attributes');

  // Render product attributes
  renderAttributeRow(table, 'Model', product.name);
  renderAttributeRow(table, 'id', product.id);
  renderAttributeRow(table, 'Giá', formatPrice(product.price));
  renderAttributeRow(table, 'Tốc độ in', product.speed);
  renderAttributeRow(table, 'Hãng', product.branch);
  renderAttributeRow(table, 'Loại', product.type);
  renderAttributeRow(table, 'Màu', product.color);
  renderAttributeRow(table, 'Khổ giấy', product.paper);

  // Render spec attributes
  renderAttributesZone(table, 'Spec', product.spec);

  // Render option attributes
  renderAttributesZone(table, 'Option', product.option);

  // Append table to modal content
  modal.find('.product-info').append(table);

  // Set data attribute for productId on the "Add to Cart" button
  const addToCartButton = modal.find('.btn-add-to-cart');
  addToCartButton.data('productId', product.id);

  modal.modal('show');
}

$(document).on('click', '.btn-add-to-cart', function () {
  const productId = $(this).data('productId');
  addToCart(productId);
});


function renderAttributeRow(table, label, value) {
  const row = $('<tr>');
  const attribute = $('<td>').text(label);
  const attributeValue = $('<td>').text(value);
  row.append(attribute, attributeValue);
  table.append(row);
}

function renderAttributesZone(table, label, attributes) {
  const attributesRow = $('<tr>');
  const attributesLabel = $('<td>').text(label);
  attributesRow.append(attributesLabel);

  const attributesValue = $('<td>').attr('colspan', '3');
  const attributesTable = $('<table>').addClass('sub-attributes');

  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      const value = attributes[key];
      const attributeRow = $('<tr>');
      const attributeLabel = $('<td>').text(key);
      const attributeValue = $('<td>').text(value);
      attributeRow.append(attributeLabel, attributeValue);
      attributesTable.append(attributeRow);
    }
  }

  attributesValue.append(attributesTable);
  attributesRow.append(attributesValue);
  table.append(attributesRow);
}

function renderCartTotal() {
  $('#cartTotal').text(formatPrice(cart.totalPrice()));
}

function renderCartItems() {
  const cartItemContainer = $('.cart-item');
  let content = '';
  for (const cartItem of cart.items) {
    content += `
      <div class="cart-item">
        <p>${cartItem.name} - ${formatPrice(cartItem.price)} - Quantity: ${cartItem.quantity}</p>
        <button class="btn btn-remove-from-cart" data-name="${cartItem.name}">Remove</button>
      </div>
    `;
  }
  cartItemContainer.html(content);

  $('.btn-remove-from-cart').click(removeFromCart);
}

function renderProductList(products) {
  const productShow = $('.product-show');
  let content = '';
  for (const product of products) {
    const saved = cart.items.some((item) => item.name === product.name && item.saved);
    const productClass = saved ? 'product product-saved' : 'product';
    const formattedPrice = formatPrice(product.price);

    content += `
      <div class="${productClass}" data-name="${product.name}">
        <h4>${product.id}</h4>
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <p>Price: ${formattedPrice}</p>
        <button class="btn btn-purchase" data-name="${product.name}">Purchase</button>
      </div>
    `;
  }
  productShow.html(content);
  productShow.on('click', '.btn-purchase', function () {
    const productName = $(this).data('name');
    const product = products.find((product) => product.name === productName);
    renderProductInfo(product);
  });
}
