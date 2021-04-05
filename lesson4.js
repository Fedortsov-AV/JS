/*
1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/
'use strict';
let num = +prompt('Число от 0 до 999');
let obj = {};
function getDischarges(num) {
let keys = ['единицы', 'десятки', 'сотни'];
    if (num < 0 || num > 999){
      console.log('Число не в диапазоне от 0 до 999');
      return obj;
    } else if (isNaN(num)){
      console.log('Введено не число');
      return obj;
      }
    for (let i=0; i < keys.length; i++){
      let temp = num;
      temp = (temp % Math.pow( 10, i+1) - temp % Math.pow( 10, i+1 - 1))/Math.pow( 10, i+1 - 1);
      obj[keys[i]] = temp;
    }
    return obj;
}
obj = getDischarges(num);
console.log(obj);
/*
2.Продолжить работу с интернет-магазином:
2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/

let basket = {
  product: [

  ],
  countBasketPrice() {
  let countPrice = 0;
  for (let key in this.product){
    countPrice = countPrice + this.product[key].price * this.product[key].quantity;
  }
  return countPrice;
  },
  delAll() {
    this.product.splice(0, this.product.length);

  },

  delPosition(key){
      this.product.splice(key, 1);
  }


};

let product = {
  name: '',
  price: 0,
  availability: 0,
  description: '',
  category: '',
  addProduct(name, price, availability, description, category){
    this.name = name;
    this.price = price;
    this.availability = availability;
    this.description = description;
    this.category = category;
  },
  addInBasket(quantity){
    if (this.availability < quantity){
      console.log('Недостаточно товара, в наличии '+this.availability);
      return
    }
    basket.product.push({name: this.name, price: this.price, quantity: quantity});
    this.availability = this.availability - quantity;
    },
  changeСategory(cat){
    this.category = cat;
  },
  changeName(name){
    this.name = name;
  },
  cangePrice(price){
    this.price = price;
  },
  changeAvailability(availability){
    this.availability = availability;
  },
  changeDescription(description){
    this.description = description;
  }
}

let test1 = Object.assign({}, product);
test1.addProduct('Apple', 100, 150, '', 'Фрукты');
let test2 = Object.assign({}, product);
test2.addProduct('Pears', 150, 150, '');
let test3 = Object.assign({}, product);
test3.addProduct('Tomatoes', 50, 150, '');
test1.addInBasket(50);
console.log('В корзину добавили 50 яблок');
console.log('В корзине товаров на сумму '+basket.countBasketPrice()+ ' $');
test2.addInBasket(100);
console.log('В корзину добавили 100 груш');
console.log('В корзине товаров на сумму '+basket.countBasketPrice()+ ' $');
test3.addInBasket(10);
console.log('В корзину добавили 10 помидор');
console.log('В корзине товаров на сумму '+basket.countBasketPrice()+ ' $');





/*
3.* Подумать над глобальными сущностями.
К примеру, сущность «Продукт» в интернет-магазине актуальна не только для корзины, но и для каталога.
Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта,
но в разных местах давал возможность вызывать разные методы.
*/
