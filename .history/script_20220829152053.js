class User {
	constructor (name, balance){
		this.name = name,
		this.balance = balance
	}
	showOrderHistory(sortWay, fieldName, totalAmount, orderDate){
		
	}
	getCart(){
		return this.cart;
	}
	addOrder(){
		return this.order;
	}
		
}
class Order{
	constructor (order, totalPrice, date){
		this.order = order,
		this.price = totalPrice,
		this.date = date
	}

}