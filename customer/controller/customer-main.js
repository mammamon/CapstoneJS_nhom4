/*---------- UTILITIES ----------*/

// format giá ra tiền Việt
function formatPrice(price) {
  const formattedPrice = parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return formattedPrice;
}


/*---------- INITIALIZES  ----------*/

// load sản phẩm từ API (kết hợp Bootpag)
let products = [];
function getProductList() {
  let promise = axios({
    url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
    method: 'GET',
  });

  promise
    .then(function (result) {
      console.log('result: ', result.data);
      products = result.data;
      renderProductList(products, 1);
      renderPagination();
    })
    .catch(function (error) {
      console.log(error);
    });
}
getProductList();

// load giỏ hàng từ local storage
function loadCart() {
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

loadCart();


/*---------- CONTROLLERS ----------*/

// đóng mở giỏ hàng
$(document).ready(function () {
  // giỏ hàng tự đóng khi click bên ngoài ngoại trừ click vào những vùng này:
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#cartZone').length && !$(e.target).closest('#cartIcon').length && !$(e.target).closest('#cartAccordion').length && !$(e.target).hasClass('btn-add-to-cart') && !$(e.target).hasClass('btnRemoveOrder')) {
      $('#cartZone').hide();
    }
  });
  // đóng mở bằng icon giỏ hàng
  $('#cartIcon, #cartIcon .fa-shopping-cart').on('click', function () {
    cart = Cart.localStorageLoad();
    renderCartItems();
    renderCartTotal();
    $('#cartZone').toggle();
  });
});


// xóa sản phẩm khỏi giỏ hàng
function deleteCartItem() {
  const productId = $(this).data('productId');
  const index = cart.items.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.items.splice(index, 1);
    cart.localStorageSave();
    renderCartItems();
    renderCartTotal();
  }
}


// thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  if (product) {
    const productName = product.name;
    const price = parseFloat(product.price);
    const quantity = parseInt($('#quantity-input').val());
    const image = product.image;
    // nếu có sản phẩm trùng tên và status thì cộng dồn số lượng
    const existingCartItem = cart.items.find(
      (item) => item.name === productName && item.status === 'chưa đặt hàng'
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      const newItem = new CartItem(productName, price, quantity, image);
      cart.addItem(newItem);
    }
    renderCartItems();
    // đóng modal thêm sản phẩm và mở modal / accordion giỏ hàng 
    const productDiv = $(`.product[data-name="${productName}"]`);
    productDiv.addClass('product-saved');
    $('#cartZone').show();
    cart.localStorageSave();
    $('#addProductModal').modal('hide');
    $('#cartAddCollapse').collapse('show');

  } else {
    console.error('error');
  }
}


//gắn chức năng cho nút thêm vào giỏ hàng
$(document).on('click', '.btn-add-to-cart', function (event) {
  const productId = $(this).data('productId');
  addToCart(productId);
  event.preventDefault();
  event.stopPropagation();
});


//nút reset toàn bộ giỏ hàng
$('#btnReset').click(function () {
  if (confirm('Xác nhận reset?')) {
    cart.items = [];
    cart.localStorageSave();
    renderCartItems();
    // ẩn animation của cart icon
    $('#cartIcon').removeClass('ani-tumbler');
    $('#cartIcon').addClass('paused');
    $('#exclamation').hide();
  }
});


// xóa sản phẩm trong giỏ hàng
$(document).on('click', '.btnRemoveAdd', function (e) {
  e.stopPropagation();
  const productName = $(this).data('name');
  const itemToRemove = cart.items.find((item) => item.name === productName && item.status === 'chưa đặt hàng');
  if (itemToRemove) {
    cart.deleteItem(itemToRemove);
    renderCartItems();
  }
});

// xóa sản phẩm đã đặt hàng 
$(document).on('click', '.btnRemoveOrder', function () {
  const productName = $(this).data('name');
  const index = cart.items.findIndex((item) => item.name === productName && item.status === 'đã đặt hàng');
  if (index !== -1) {
    cart.items.splice(index, 1);
    cart.localStorageSave();
    renderCartItems();
    renderCartTotal();
  }
});

// chức năng đặt hàng
$('#btnOrder').click(function () {
  const addedItems = $('.cart-item');
  const orderedItems = $('.order-item');
  const orderTable = $('.cart-table-order');
  if (addedItems.children().length === 0) {
    alert('Không có sản phẩm trong giỏ hàng');
    return;
  }
  if (confirm('Xác nhận đặt hàng?')) {
    const itemsToMove = cart.items.filter((item) => item.status === 'chưa đặt hàng');
    for (const item of itemsToMove) {
      item.status = 'đã đặt hàng';
    }
    renderCartItems();
    renderOrderItems();
    //chỉnh tổng tiền cho riêng các sản phẩm đã đặt hàng
    let totalOrderPrice = 0;
    for (const orderItem of cart.items) {
      if (orderItem.status === 'đã đặt hàng') {
        totalOrderPrice += orderItem.price * orderItem.quantity;
      }
    }
    $('.order-total').text(formatPrice(totalOrderPrice));
    addedItems.empty();
    orderTable.show();
    $('#cartOrderHeading > button').click();
    cart.localStorageSave();
  }
});


































