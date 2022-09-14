class Order {
    constructor(products, total) {
        this.products = products;
        this.total = total;
        this.dateOrder = new Date();
    }

    saveOrder() {
        let orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push({
            products: this.products,
            total: this.total,
            date: this.dateOrder
        })

        localStorage.setItem("orders", JSON.stringify(orders));
      }
}
