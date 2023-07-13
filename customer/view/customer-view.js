// customer-view.js

// Function to render the "Add to Cart" modal
function renderCartModal(productName) {
  const product = products.find(product => product.name === productName);

  const modal = $('#addProductModal');
  modal.find('.modal-title').text('Add to Cart');
  modal.find('.product-info h3').text(product.name);
  modal.find('.product-info img').attr('src', product.image);
  modal.find('.product-info p').text(`Price: ${formatPrice(product.price)}`);
  modal.find('.product-info p:eq(1)').text(`Speed: ${product.speed}`);
  modal.find('.product-info p:eq(2)').text(`Title: ${product.title}`);
  modal.find('.product-info p:eq(3)').text(`Branch: ${product.branch}`);
  modal.find('.product-info p:eq(3)').text(`Name: ${product.name}`);
  modal.find('.quantity-input').val(1);
  modal.modal('show');
}

// Function to render product list
function renderProductList(products) {
  const productContainer = $('.product-show');
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
  productContainer.html(content);

  // Event listener for "Purchase" buttons
  productContainer.on('click', '.btn-purchase', function () {
    const productName = $(this).data('name');
    renderCartModal(productName);
  });
}
