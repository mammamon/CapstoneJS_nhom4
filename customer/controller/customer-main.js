/*---------- UTILITIES ----------*/

// format giá ra tiền Việt
function formatPrice(price) {
    const formattedPrice = parseFloat(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedPrice;
}


/*---------- INITIALIZES  ----------*/

// load sản phẩm từ API
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
            renderProductList(products);
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

// icon giỏ hàng
$('#cartIcon').click(function () {
    cart = Cart.localStorageLoad();
    renderCartItems();
    renderCartTotal();
    $('#cartZone').toggle();
});

// xóa sản phẩm khỏi giỏ hàng (dựa theo id)
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



//thêm sản phẩm vào giỏ hàng (dựa theo id)
function addToCart(productId) {
    const product = products.find((product) => product.id === productId);
    if (product) {
      const productName = product.name;
      const price = parseFloat(product.price);
      const quantity = parseInt($('#quantity-input').val());
      const image = product.image;
  
      const existingCartItem = cart.items.find(
        (item) => item.name === productName && item.status === 'đã thêm'
      );
  
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const newItem = new CartItem(productName, price, quantity, image);
        cart.addItem(newItem);
      }
  
      renderCartItems();
      const productDiv = $(`.product[data-name="${productName}"]`);
      productDiv.addClass('product-saved');
      $('#cartZone').css('display', 'block');
      cart.localStorageSave();
      $('.close').click();
    } else {
      console.error('Error');
    }
  }
  // Remove all cart items
  function resetCart() {
    cart.items = [];
    renderCartItems();
  }
  
  // Reset cart button
  $('#btnReset').click(function () {
    if (confirm('Xác nhận xoá giỏ hàng?')) {
      resetCart();
    }
  });
  
  // Add event listener for adding to cart
  $(document).on('click', '.btn-add-to-cart', function (event) {
    const productId = $(this).data('productId');
    addToCart(productId);
    event.preventDefault();
    event.stopPropagation();
  });

//đặt hàng
$('#btnOrder').click(function () {
    const addedItems = $('.cart-item');
    const orderedItems = $('.order-item');
    const invoiceTable = $('.cart-table-order');
  
    if (addedItems.children().length === 0) {
      alert('Không có sản phẩm trong giỏ hàng');
      return;
    }
  
    if (confirm(`Xác nhận đặt hàng?`)) {
      const itemsToMove = cart.items.filter((item) => item.status === 'đã thêm');
      for (const item of itemsToMove) {
        item.status = 'đã đặt hàng';
      }
  
      renderCartItems();
  
      // Calculate total price for invoice table
      let totalOrderPrice = 0;
      for (const orderItem of cart.items) {
        if (orderItem.status === 'đã đặt hàng') {
          totalOrderPrice += orderItem.price * orderItem.quantity;
        }
      }
      $('.order-total').text(formatPrice(totalOrderPrice));
  
      // Hide cart table and show invoice table
      addedItems.empty();
      invoiceTable.show();
    }
  });

  $('#btnRemoveOrder').click(function () {
    const invoiceTable = $('.cart-table-order');
    const orderedItems = $('.order-item');
    const orderTotalContainer = $('.order-total');
  
    if (confirm('Xác nhận xoá hóa đơn?')) {
      orderedItems.empty();
      orderTotalContainer.text('0');
      invoiceTable.hide();
    }
  });
  
  // Remove item from add table
$(document).on('click', '.btnRemoveAdd', function() {
    const itemId = $(this).data('id');
    const itemToRemove = cart.items.find((item) => item.id === itemId && item.status === 'đã thêm');
    if (itemToRemove) {
      cart.deleteItem(itemToRemove);
      renderCartItems();
    }
  });
  
  // Remove item from invoice table
  $(document).on('click', '.btnRemoveOrder', function() {
    const itemId = $(this).data('id');
    const itemToRemove = cart.items.find((item) => item.id === itemId && item.status === 'đã đặt hàng');
    if (itemToRemove) {
      cart.deleteItem(itemToRemove);
      renderCartItems();
    }
  });
  


  
  
  

















