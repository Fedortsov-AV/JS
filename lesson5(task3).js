/*
3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
3.1. Пустая корзина должна выводить строку «Корзина пуста»;
3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
 */

let basket = {
  product: [],

  init(){
    this.renderBasket()
  },

  renderBasket(){
    const divBasket = document.createElement('div');
    const p = document.createElement('p');
    p.className = 'basket';
    divBasket.appendChild(p);
    document.body.appendChild(divBasket);
    p.align = 'right';
  },


  countBasketPrice() {
    let countPrice = 0;
    for (let key in this.product) {
      countPrice = countPrice + this.product[key].quantity * this.product[key].price;
    };

    return countPrice;
  },

  delAll() {
    this.product.splice(0, this.product.length);
    this.updateRenderBasket();

  },

  delPosition(key) {
    this.product.splice(key, 1);
    this.updateRenderBasket();
  },

  findProductID(id){
    return this.product.findIndex((productId) => productId.id_product === id )
  },

  updateRenderBasket(){
   if (basket.product.length > 0) {
     const textBasket = document.querySelector('.basket')
     textBasket.textContent = `В корзине: ` + this.product.length + ` товаров на сумму ` + this.countBasketPrice() + ` рублей`;
    } else {
      textBasket.textContent = `Корзина пуста`;
    }
  }


};

let product = {
  id_product: 0,
  name: '',
  price: 0,
  availability: 0,
  description: '',
  category: '',

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

    basket.updateRenderBasket();
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
basket.init();



let test1 = Object.assign({}, product);
test1.addProduct(1,'Apple', 100, 150, '', 'Фрукты');
let test2 = Object.assign({}, product);
test2.addProduct(2, 'Pears', 150, 150, '', 'Фрукты');
let test3 = Object.assign({}, product);
test3.addProduct(3, 'Tomatoes', 50, 150, '', 'Овощи');

test1.addInBasket(50);
