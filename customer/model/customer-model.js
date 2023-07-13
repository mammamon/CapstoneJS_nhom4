// CartItem class
class CartItem {
    constructor(name, price, quantity, saved = false) {
      this.name = name;
      this.price = parseFloat(price);
      this.quantity = quantity;
      this.saved = saved;
    }
  
    totalPrice() {
      let total = 0;
      for (const item of this.items) {
        total += parseFloat(item.price) * parseFloat(item.quantity);
      }
      return total.toFixed(2);
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
  
    totalPrice() {
      let total = 0;
      for (const item of this.items) {
        total += parseFloat(item.price) * parseFloat(item.quantity);
      }
      return total.toFixed(2);
    }
  
    localStorageSave() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  
    static localStorageLoad() {
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
  
  export { Cart, CartItem };
  