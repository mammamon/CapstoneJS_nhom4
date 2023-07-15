//render danh sách sản phẩm
function renderProductList(products) {
  const productShow = $('.product-show');
  const content = products.map((product) => {
    const saved = cart.items.some((item) => item.name === product.name && item.saved);
    const productClass = saved ? 'product product-saved' : 'product';
    const formattedPrice = formatPrice(product.price);
    return `
      <div class="${productClass}" data-name="${product.name}">
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <p class="text-danger">${formattedPrice}</p>
        <button class="btn btn-purchase" data-name="${product.name}">MUA NGAY</button>
      </div>
    `;
  }).join('');
  productShow.html(content);
  productShow.on('click', '.btn-purchase', function () {
    const productName = $(this).data('name');
    const product = products.find((product) => product.name === productName);
    renderProductInfo(product);
  });
}

//đổi tên thuộc tính
const changeKeyNames = {
  "RAM": "RAM",
  "HDD": "HDD",
  "DPI": "DPI",
  "tray": "Khay giấy",
  "warmUpTime": "Thời gian khởi động",
  "DSPF": "DSPF",
  "RSPF": "RSPF",
  "finisher": "finisher",
  "fax": "Fax",
  "solution": "solution",
  "addHDD": "Thêm HDD",
  "addRam": "Thêm RAM",
  "addStand": "Thêm stand"
};

//render ô chứa thông tin sản phẩm
function renderProductInfo(product) {
  const { name, id, price, speed, branch, type, color, paper, image, description, spec, option } = product;
  const modal = $('#addProductModal');
  modal.find('.modal-title').text('Thông tin sản phẩm');

  let specContent = '';
  for (const key in spec) {
    if (spec.hasOwnProperty(key)) {
      const value = spec[key];
      const displayName = changeKeyNames[key] || key;
      specContent += `<tr><td>${displayName}</td><td>${value}</td></tr>`;
    }
  }

  let optionContent = '';
  for (const key in option) {
    if (option.hasOwnProperty(key)) {
      const value = option[key];
      const displayName = changeKeyNames[key] || key;
      optionContent += `<tr><td>${displayName}</td><td>${value}</td></tr>`;
    }
  }

  modal.find('.product-info').html(`
    <table class="product-attributes"
      <tr><img src="${image}" alt="" class="product-img"></tr>
      <tr><td>Model</td><td>${name}</td></tr>
      <tr><td>id</td><td>No. ${id}</td></tr>
      <tr><td>Giá</td><td>${formatPrice(price)}</td></tr>
      <tr><td>Tốc độ in</td><td>${speed}</td></tr>
      <tr><td>Hãng</td><td>${branch}</td></tr>
      <tr><td>Loại</td><td>${type}</td></tr>
      <tr><td>Màu</td><td>${color}</td></tr>
      <tr><td>Khổ giấy</td><td>${paper}</td></tr>
      <tr><td>Mô tả</td><td>${description}</td></tr>
      <tr>
        <td>Thông số</td>
        <td colspan="3">
          <table class="sub-attributes">${specContent}</table>
        </td>
      </tr>
      <tr>
        <<td>Tùy chọn</td>
        <td colspan="3">
          <table class="sub-attributes">${optionContent}</table>
        </td>
      </tr>
    </table>
  `);
  modal.find('.btn-add-to-cart').data('productId', id);
  modal.modal('show');
}
$(document).on('click', '.btn-add-to-cart', function () {
  const productId = $(this).data('productId');
  addToCart(productId);
});


//render tổng tiền trong giỏ hàng
function renderCartTotal() {
  $('#cartTotal').text(formatPrice(cart.totalPrice()));
}

//render sản phẩm trong giỏ hàng
function renderCartItems() {
  const cartItemContainer = $('.cart-items');
  cartItemContainer.empty();

  for (const cartItem of cart.items) {
    const row = `
      <tr>
        <td>${cartItem.name}</td>
        <td>${formatPrice(cartItem.price)}</td>
        <td>${cartItem.quantity}</td>
        <td>
          <i class="btnRemove fa-solid fa-trash" data-name="${cartItem.name}"></i>
        </td>
      </tr>
    `;
    cartItemContainer.append(row);
  }

  $('.btnRemove').click(deleteCartItem);
}



