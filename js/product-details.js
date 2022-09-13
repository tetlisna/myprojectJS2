class ProductList {
    constructor() {
        this.container = document.querySelector("#prod-details");
        this.productsService  = new ProductsService();
        this.renderProductDetails();
    }
    async renderProductDetails() {
        const params = new URLSearchParams(window.location.search);

        if(params.has('id')){
            const id = params.get('id');
            const product = await this.productsService.getProductById(id);
            if(product.count){
                product.status = "In Stock";
            } else {
                    product.status = "Out of Stock";
                }
            
            let productsListDom = "";
            productsListDom += this.createProductDom(product);
            this.container.innerHTML = productsListDom;
            this.addEventListeners();

        }
          
    }
    createProductDom(product) {
        return ` <article class="product-box">
        <h3 class="prod-title">${product.title}</h3>
        <img src="${product.image}" alt="${product.title}">

            <div class="details">
            <div class="prod price">$ ${product.price}</div>
            <input class="prod-amount" id="prod-amount-${product.id}" type="number" min="1" value="1">
            </div>
        </div>
        <button class="addtocart shop-btn" data-id="${product.id}">Add to cart</button>
            </div>
            </div>
        </article> `;
    }
    addEventListeners(){
        document.querySelectorAll('.addtocart').forEach(btn => {
            btn.addEventListener('click', this.addProductToCart.bind(this));
        });
        
    }
    substractAmount(amount) {
		return this.amount - amount; //різніця між к-тю продуктів та параметрів ємоунт
	}

    addProductToCart(event) {
        const id = event.target.dataset.id;
        const cart = new Cart();
        cart.addProduct(id);
        console.log(cart);
    }
}
new ProductList();