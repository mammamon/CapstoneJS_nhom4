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
        const status = product.status;
        const existingItem = cart.items.find((item) => item.name === productName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new CartItem(productName, price, quantity, image);
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
}
$(document).on('click', '.btn-add-to-cart', function (event) {
    console.log('click event triggered');
    const productId = $(this).data('productId');
    addToCart(productId);
    event.preventDefault();
    event.stopPropagation();
  });


//đặt hàng
$('#btnOrder').click(function () {
    const addedItems = $('.cart-items');
    const orderedItems = $('.cart-table-order tbody');
  
    if (addedItems.children().length === 0) {
      alert('Không có sản phẩm trong giỏ hàng');
      return;
    }
  
    if (confirm(`Xác nhận đặt hàng ?`)) {
      const itemsToMove = cart.items.filter((item) => item.status === 'đã thêm');
      itemsToMove.forEach((item) => {
        item.status = 'đã đặt hàng';
        const row = addedItems.find(`[data-name="${item.name}"]`);
        orderedItems.append(row);
      });
    }
  
    renderCartItems();
  });
  
  

  function handleOrderTableVisibility() {
    const orderTable = $('.cart-table-order');
    const orderItemContainer = $('.cart-table-order tbody');
    if (orderItemContainer.children().length === 0) {
      orderTable.hide();
    } else {
      orderTable.show();
    }
  }
  
  
  

















