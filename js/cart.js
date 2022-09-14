class Cart {
  constructor() {
    if (!Cart._instance) Cart._instance = this;
    this.container = document.querySelector(".cart-products");
    this.checkoutContainer = document.querySelector(".cart-chekout");
    this.productsService = new ProductsService();
    this.cart = JSON.parse(localStorage.getItem("cart") || "{}");
    this.updateBadge();
    if (this.container) {
      this.renderCart();
    }
    if (this.checkoutContainer) {
      this.renderCheckout();
    }

    return Cart._instance;
  }
  addEventListeners() {
    document.querySelectorAll('.removecart').forEach(btn => {
        btn.addEventListener('click', this.removeProduct.bind(this));
    });
    document.querySelectorAll(".update").forEach(up => {
        up.addEventListener('click', this.updateAmount.bind(this));
    });
    document.querySelectorAll(".clearcart").forEach(up => {
        up.addEventListener('click', this.withdrowCart.bind(this));
    });
    document.querySelectorAll(".createorder").forEach(up => {
      up.addEventListener('click', this.saveOrder.bind(this));
  });
    
  }

  async renderCart() {
    let total = 0;
    
    let cartDom = `
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                    Product name
                </th>
                <th scope="col" class="py-3 px-6">
                    Status 
                </th>
                <th scope="col" class="py-3 px-6">
                    Amount
                </th>
                <th scope="col" class="py-3 px-6">
                    Price
                </th>
                <th scope="col" class="py-3 px-6">
                  Action
                </th>
              </tr>
          </thead>
          <tbody>
          `;
    
    for (const productId in this.cart) {
      const product = await this.productsService.getProductById(productId);
      total += product.price * this.cart[productId];
      cartDom += this.createCartProductDom(product);
    }

    cartDom += `<th scope="col" class="py-3 px-6"><strong>Total</strong>
        </th>
        <th scope="col" class="py-3 px-6"><strong>$${total.toFixed(2)}</strong>
        
        </th>
        <th scope="col" class="py-3 px-6"><a href="/checkout.html" class="update">Checkout</a>
        <a href="#" class="clearcart shop-btn">Clear cart</a>
        </th>
        `;
    cartDom += `</tbody>
        </table>`;
    this.container.innerHTML = cartDom;
    this.addEventListeners();
  }

  async renderCheckout (){
    let total = 0;
    
    let cartDom = `
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                    Product name
                </th>
                <th scope="col" class="py-3 px-6">
                    Status 
                </th>
                <th scope="col" class="py-3 px-6">
                    Amount
                </th>
                <th scope="col" class="py-3 px-6">
                    Price
                </th>
              </tr>
          </thead>
          <tbody>
    `;
    
    for (const productId in this.cart) {
      const product = await this.productsService.getProductById(productId);
      total += product.price * this.cart[productId];
      cartDom += this.createCartProductDom(product, 'checkout');
    }
    cartDom += `<th scope="col" class="py-3 px-6"><strong>Total</strong>
        </th>
        <th scope="col" class="py-3 px-6"><strong>$${total.toFixed(2)}</strong>
        
        </th>
        <th scope="col" class="py-3 px-6"><button class="createorder">Create order</a>
        </th>
        `;
    cartDom += `</tbody>
        </table>`;
    this.checkoutContainer.innerHTML = cartDom;
    this.addEventListeners();
  } 

  createCartProductDom(product, page = 'cart') {
    let html = ` <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <td class="py-4 px-6">
        ${product.title}
        </td>
        <td class="py-4 px-6">
        In Stock
        </td>
        <td class="py-4 px-6">`;

        if (page === 'cart') {
          html += `<input class="form-btn" id="prod-amount-${product.id}" type="number" value="${this.cart[product.id]}" min="1">`;
        } else {
          html += `<strong>${this.cart[product.id]}</strong>`;
        }


        html += `</td>
        <td class="py-4 px-6">$ 
        ${product.price * this.cart[product.id]}
        </td>`;

        if (page === 'cart') {
            html += `
                <td class="py-4 px-6">
                    <button data-id="${product.id}" class="removecart shop-btn">x</button>
                    <button data-id="${product.id}" class="update">Update</button>
                </td>`;
        }

        html += ` 
        </tr>`;
    return html;
  }
  addProduct(id, amount = 1) {
    this.cart[id] = this.cart[id] ? Number(this.cart[id]) + amount : amount;
    this.saveCart();
    this.updateBadge();
  }
  removeProduct(event) {
    const id = event.target.dataset.id;

    if (this.cart[id]) {
        delete this.cart[id];
      this.saveCart();
      this.updateBadge();

      this.renderCheckout();
    }
  }
  updateAmount(event){
    const id = event.target.dataset.id;
    const prodAmount = document.querySelector('#prod-amount-' + id).value;
    console.log(prodAmount);
    if(this.cart[id]) {
        this.cart[id] = prodAmount;
        this.saveCart();
        this.renderCart();
    }

  }
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    
  }
  async saveOrder(){
    let total = 0;
    for (const productId in this.cart) {
      const product = await this.productsService.getProductById(productId);
      total += product.price * this.cart[productId];
    }
    let order = new Order(this.cart,total);
    order.saveOrder();
    this.cart = {};
    this.saveCart();
    this.withdrowCart();
    this.updateBadge();
    this.renderCheckout();


  }
  updateBadge() {
    document.querySelector(".cart-item-count").innerHTML = Object.keys(
      this.cart
    ).length;
  }
  withdrowCart() {
    this.cart = {};
    this.saveCart();
    this.updateBadge();
    this.renderCart();
}
}
new Cart();
