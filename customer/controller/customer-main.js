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

// xóa sản phẩm khỏi giỏ hàng (dựa trên data-name)
function deleteCartItem() {
    const name = $(this).data('name');
    const item = cart.items.find((item) => item.name === name);
    if (item) {
        cart.deleteItem(item);
    }
    renderCartItems();
    renderCartTotal();
    $(`.product[data-name="${name}"]`).removeClass('product-saved');
    cart.localStorageSave();
}

//thêm sản phẩm vào giỏ hàng (dựa theo id)
$(document).on('click', '.btn-add-to-cart', function () {
    const productId = $(this).data('productId');
    const product = products.find((product) => product.id === productId);
    if (product) {
      const productName = product.name;
      const price = parseFloat(product.price);
      const quantity = parseInt($('#quantity-input').val());
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
      $('.close').click();
    } else {
      console.error('error');
    }
  });
  

















