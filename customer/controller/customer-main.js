// CartItem class
class CartItem {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotal() {
        return this.price * this.quantity;
    }
}

// Cart class
class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    getTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.getTotal();
        }
        return total;
    }

    // Save cart to local storage
    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Load cart from local storage
    static loadFromLocalStorage() {
        const data = localStorage.getItem('cart');
        if (data) {
            const items = JSON.parse(data);
            const cart = new Cart();
            cart.items = items;
            return cart;
        }
        return new Cart();
    }
}

// Render cart
function renderCart(cart) {
    let content = '';
    for (const item of cart.items) {
        content += `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.getTotal()}</td>
        </tr>
      `;
    }
    getElement('#cartTable').innerHTML = content;
    getElement('#cartTotal').textContent = cart.getTotal();
}

// Example usage
const cart = Cart.loadFromLocalStorage();
renderCart(cart);

// Add items to the cart
const item1 = new CartItem('Item 1', 10, 2);
const item2 = new CartItem('Item 2', 5, 3);
cart.addItem(item1);
cart.addItem(item2);

// Remove an item from the cart
cart.removeItem(item1);

// Render the updated cart
renderCart(cart);

// Save the cart to local storage
cart.saveToLocalStorage();
// Function to render product list
function renderProductList(products) {
    const productContainer = document.querySelector('.product-item');
    let content = '';
    for (const product of products) {
        content += `
        <div class="product">
          <h3>${product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Description: ${product.description}</p>
        </div>
      `;
    }
    productContainer.innerHTML = content;
}

// Function to fetch product data from API
function getProductList() {
    axios
        .get('https://649d36a19bac4a8e669d62a2.mockapi.io/product')
        .then(function (response) {
            const products = response.data;
            console.log('Products: ', products);
            renderProductList(products);
        })
        .catch(function (error) {
            console.log('Error: ', error);
        });
}

// Call the getProductList function
getProductList();

