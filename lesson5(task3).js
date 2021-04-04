/*
3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
3.1. Пустая корзина должна выводить строку «Корзина пуста»;
3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
 */
const divBasket = document.createElement('div');
const p = document.createElement('p');
divBasket.appendChild(p);
document.body.appendChild(divBasket);
p.align = 'right';



let basket = {
  product: [],

  countBasketPrice() {
    let countPrice = 0;
    for (let key in this.product) {
      countPrice = countPrice + this.product[key].quantity * this.product[key].price;
    };

    return countPrice;
  },

  delAll() {
    this.product.splice(0, this.product.length);
    if (basket.product.length > 0) {
      p.textContent = `В корзине: ` + basket.product.length + ` товаров на сумму ` + basket.countBasketPrice() + ` рублей`;
    } else {
      p.textContent = `Корзина пуста`;
    }

  },

  delPosition(key) {
    this.product.splice(key, 1);
    if (basket.product.length > 0) {
      p.textContent = `В корзине: ` + basket.product.length + ` товаров на сумму ` + basket.countBasketPrice() + ` рублей`;
    } else {
      p.textContent = `Корзина пуста`;
    }
  },

  findProductID(id){
    return this.product.findIndex((productId) => productId.id_product === id )
  }


};

let product = {
  id_product: 0,
  name: '',
  price: 0,
  availability: 0,
  description: '',
  category: '',

  addProduct(id_product, name, price, availability, description, category) {
    this.id_product = id_product;
    this.name = name;
    this.price = price;
    this.availability = availability;
    this.description = description;
    this.category = category;
  },

  // addProductInArr(id_product, name, price, availability, description, category) {
  //   productArray.push({
  //     id_product: this.id_product,
  //     name:  this.name,
  //     price: this.price,
  //     availability: this.availability,
  //     description: this.description,
  //     category: this.category
  //   })
  // },

  addInBasket(quantity) {
    let i = 0;
    if (this.availability < quantity) {
      console.log('Недостаточно товара, в наличии ' + this.availability);
      return
    } else if (basket.findProductID(this.id_product) === -1) {
      basket.product.push({name: this.name, price: this.price, quantity: quantity});
      this.availability = this.availability - quantity;
    } else if (basket.findProductID(this.id_product) >= 0){
      basket.product[basket.findProductID(this.id_product)].quantity += quantity;
    };

    if (basket.product.length > 0) {
      p.textContent = `В корзине: ` + basket.product.length + ` товаров на сумму ` + basket.countBasketPrice() + ` рублей`;
    } else {
      p.textContent = `Корзина пуста`;
    }
  },

  changeCategory(cat) {
    this.category = cat;
  },

  changeName(name) {
    this.name = name;
  },

  cangePrice(price) {
    this.price = price;
  },

  changeAvailability(availability) {
    this.availability = availability;
  },

  changeDescription(description) {
    this.description = description;
  }
}




let test1 = Object.assign({}, product);
test1.addProduct(1,'Apple', 100, 150, '', 'Фрукты');
let test2 = Object.assign({}, product);
test2.addProduct(2, 'Pears', 150, 150, '', 'Фрукты');
let test3 = Object.assign({}, product);
test3.addProduct(3, 'Tomatoes', 50, 150, '', 'Овощи');

test1.addInBasket(50);






