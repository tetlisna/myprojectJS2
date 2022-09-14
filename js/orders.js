class Orders {
  constructor() {
    if (!Orders._instance) Orders._instance = this;
    this.container = document.querySelector(".order-products");
    this.orders = JSON.parse(localStorage.getItem("orders") || "{}");;
    // this.total = total;
    if (this.container) {
      this.renderOrderList();
    }
    // if (this.checkoutContainer) {
    //   this.renderCheckout();
    // }
  
    this.productsService = new ProductsService();

  return Orders._instance;

  }
  async renderOrderList() {
    let orderDom = `<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="py-3 px-6">
                Order
            </th>
            <th scope="col" class="py-3 px-6">
                Total price
            </th>
            <th scope="col" class="py-3 px-6">
                Date
            </th>
        </tr>
      </thead>
    <tbody>
    <tr><td>
    `;
    for (const index in this.orders) {
      let order = this.orders[index];
      for(const productId in order.products){
        let product = order.products[productId];
        // const product = await this.productsService.getProductById(productId);
        // let product = order.products.ProductsService.getProductById();
        orderDom += `<tr><td> ${product} </td></tr>`;

      }
      orderDom += `<article>
      
      <h3>Order ${index}: Order - Total: ${order.total} Order - Date ${order.date}</h3>`;
      orderDom += `<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      `;
      
      orderDom += `</tbody></table>`;

      console.log(order);
      orderDom += `</article>`;

      // for (const products in this.orders[index]) {
      //   const product = this.orders[index].products[product];
      //   console.log(product);

      // }
    }
 
 
    orderDom += `</div>`;
    this.container.innerHTML = orderDom;
    // this.addEventListeners();
  }
}

new Orders();

 // class User {
  // 	constructor (name, balance){
  // 		this.name = name,
  // 		this.balance = balance
  // 	}
  // 	showOrderHistory(sortWay, fieldName, totalAmount, orderDate){

  // 	}
  // 	getCart(){
  // 		return this.cart;
  // 	}
  // 	addOrder(){
  // 		return this.order;
  // 	}
   
