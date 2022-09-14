class ProductList {
    constructor() {
        this.container = document.querySelector("#products>div");
        this.productsService  = new ProductsService();
        this.renderProducts();
    }
    async renderProducts() {
       
        let productsListDom = "";
        const products = await this.productsService.getProducts();// takes from productService.js 
        products.forEach(product => {
            productsListDom += this.createProductDom(product);
        });
        this.container.innerHTML = productsListDom;
        this.addEventListeners();
    }
    // const params = new URLSearchParams(window.location.search);
    // if(params.has('id')){
    //     const id = params.get('id');
    //     const product = await this.productsService.getProductById(id);
    //     if(product.count){
    //         product.status = "In Stock";
    //     } else {
    //             product.status = "Out of Stock";
    //         }
    createProductDom(product) {
        return ` <article class="product-box">
            <h3 class="prod-title">${product.title}</h3>
            <img class="prod-img" src="${product.image}" alt="${product.title}">

                <div class="details">
                    <div class="prod status">In Stock</div>
                    <div class="prod price">$ ${product.price}</div>
                    <form class="form-btn"><input class="form-btn" id="prod-amount-${product.id}" type="number" min="1" value="1">   </form>
                    </div>
                </div>
                <button class="addtocart shop-btn" data-id=${product.id}>Add to cart</button>
                <a href="/product.html?id=${product.id}" class="shop-btn" data-id=${product.id}> More info</a>
                </article> `;
    }
    addEventListeners(){
        document.querySelectorAll('.shop-btn').forEach(btn => {
            btn.addEventListener('click', this.showProductInfo.bind(this));
        });
        document.querySelectorAll('.addtocart').forEach(btn => {
            btn.addEventListener('click', this.addProductToCart.bind(this));
        });
    }
    // substractAmount(amount) {
	// 	return this.amount-amount; //різніця між к-тю продуктів та параметрів ємоунт
	// }

    async showProductInfo() {
        const params = new URLSearchParams(window.location.search);
        for (const param of params) {
            console.log(param)
          }      
    }
   
    addProductToCart(event) {
        const id = event.target.dataset.id;
        const prodAmount = document.querySelector('#prod-amount-' + id).value;
        console.log(prodAmount);
        const cart = new Cart();
        cart.addProduct(id, Number(prodAmount));

    }
}
new ProductList();

