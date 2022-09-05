 /*
function tips(money, service){
	let rate;
	if (service === 'Bad') 
	{
		rate=money*0.1;

	} else if (service === 'Ok')
	{
		rate=money*0.15;
	}
	else if (service === 'Good')
	{
		rate=money*0.20;
	}
	return '$' + rate;
}
let money = +prompt('Money:','0');
let service = prompt('Service:','Ok');
console.log(tips(money,service));


function helloFunc() {
	console.log('Hello');
}*/
// function byeFunc() {
// 	console.log('Good bye');
// }
// function greetings(func) {
// 	func();
// }
// greetings(helloFunc, 9000);
let counter=0;
let interval= setInterval(function(){
	counter++;
	if (counter===10) {
		clearInterval(interval);

	}
	console.log("Hello");
}, 1000);