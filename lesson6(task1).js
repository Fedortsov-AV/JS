/*
4*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
4.1. Создать массив товаров (сущность Product);
4.2. При загрузке страницы на базе данного массива генерировать вывод из него.
HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
 */
const catalog = {
  products: [
    {
      id_product: 0,
      name: 'Видеокарта',
      price: 8000,
      availability: 50,
      category: 'Комплектующие ПК',
      id_category: 1,
      src: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/d60845ff8cc3edc61e8dd589bedb23c6/d81d8fb7cb97b5540cc805258c3364a171c4dc26043f30fec0fe2f4b8772c90a.jpg'
    },
    {
      id_product: 1,
      name: 'Процессор',
      price: 18000,
      availability: 50,
      category: 'Комплектующие ПК',
      id_category: 1,
      src: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/afc2663f65f35594728b7fae09e704e2/511dd4bf8f14a641801574d49561ee589ace70bfaef4195cf283592ff1b79556.jpg'
    },
    {
      id_product: 2,
      name: 'Материнская плата',
      price: 10000,
      availability: 50,
      category: 'Комплектующие ПК',
      id_category: 1,
      src: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/fb735a6624faa7738010aeeeda89c830/3cb1dca213e5e2d2d7cbc250e9219f4291d27956a2618e8320fe7f264d28824e.jpg'
    },
    {
      id_product: 3,
      name: 'Кулер',
      price: 500,
      availability: 50,
      category: 'Комплектующие ПК',
      id_category: 1,
      src: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/ce44880c7bd15fd3ea5ee7c34f8dfa9b/6f1557464455cdd4a242dbf6fc8cbd8cd4f64ca6ccbdac376aae4f9c67df4925.jpg'
    },
    {
      id_product: 4,
      name: 'Принтер',
      price: 2000,
      availability: 50,
      category: 'Переферия',
      id_category: 2,
      src: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/5f3cb6415b6113011513ac510c188450/41d4e9860e4124a8dbf44fe607b629604d038021fc4d1347372be5c36da721e1.jpg'
    },
    {
      id_product: 5,
      name: 'Сканер',
      price: 3000,
      availability: 50,
      category: 'Переферия',
      id_category: 2,
      src: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/872c7810f9ff05188c834d1921edaa3b/f92bae6e1051391b53a9d7d894213607a84ab54fb27d4bcdf9a991b28d38d6e1.jpg'
    },
    {
      id_product: 6,
      name: 'Клавиатура',
      price: 1000,
      availability: 50,
      category: 'Переферия',
      id_category: 2,
      src: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/f2e4b9c5dae4f36449fa26e930c9ec16/1dec5d4ca838551014a042b525ed12abe56e33453559ad5160f8b728358415d0.jpg'
    },
    {
      id_product: 7,
      name: 'Маршрутизатор',
      price: 5000,
      availability: 50,
      category: 'Сетевое оборудование',
      id_category: 3,
      src: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/731def98ec1d7dc79bf86c27e2d5dc8c/abdbf3335ce868c5261dff3f0a093d1607c4cbc784fc87994879e921e18dd33b.jpg'
    },
    {
      id_product: 6,
      name: 'Роутер',
      price: 1000,
      availability: 50,
      category: 'Сетевое оборудование',
      id_category: 3,
      src: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/33a9cf844c2fa75dc68ecd2c238e6ddd/c69a17d9a028f9624710542a0dd62dd93024350bb37393442174a23e46c2e163.jpg'
    }
  ],
  tmpArray: [],

  init() {
    this.render();
    this.updateCatalog();
    document.getElementById('catalog')
     .addEventListener('click', () => this.addInBasket(event));

  },

  render() {
    const divCatalog = document.createElement('div');
    divCatalog.id = 'catalog';
    document.body.appendChild(divCatalog);
    const p = document.createElement('p');
    p.textContent = 'Каталог товаров';
    divCatalog.appendChild(p);
  },

  addProductInArr(id_product, name, price, availability, id_category, category, src) {
    this.products.push({
      id_product: this.products.id_product,
      name: this.products.name,
      price: this.products.price,
      availability: this.products.availability,
      id_category: this.products.id_category,
      category: this.products.category,
      src: this.products.src
    })
  },

  updateCatalog() {
    this.tmpArray = [];
    this.products.filter((item) => {
                  if (this.tmpArray.indexOf(item.category) === -1) {
                  this.tmpArray.push(item.category);
                  return true;
                  }
                  return false;
    });

    let containerElement = document.getElementById('catalog');
    console.log(this.tmpArray);
    for (let cat = 0; cat < this.tmpArray.length; cat++) {
      const liElem = document.createElement('li');
      liElem.textContent = this.tmpArray[cat];
      containerElement.appendChild(liElem);

      for (let i = 0; i < this.products.length; i++) {
        if (this.tmpArray[cat] === this.products[i].category) {
          const cell = document.createElement('ul');
          liElem.appendChild(cell);
          cell.textContent = this.products[i].name;
          cell.id = i
          let tableProduct = `<li>
                                <div>Наименование: ${this.products[i].name}</div>
                                    <div>Цена: ${this.products[i].price}</div>
                                    <div><img src = ${this.products[i].src}> </div>
                                    <div class="btn" ><button data-id= "${i}">Добавить в корзину</button></div>
                              </li>`;
          cell.innerHTML = tableProduct;

        }
      };
    };
  },

  addInBasket(event) {
    console.log(event.target.dataset.id);
    if (event.target.tagName !== 'BUTTON' ) return
    let i = 0;
    if (this.products.availability < 1) {
      console.log('Недостаточно товара, в наличии ' + this.product[event.target.dataset.id].availability);
      return
    } else if (basket.findProductID(this.products[event.target.dataset.id].id_product) === -1) {
      basket.product.push({
        id_product: this.products[event.target.dataset.id].id_product,
        name: this.products[event.target.dataset.id].name,
        price: this.products[event.target.dataset.id].price,
        quantity: 1
      });
      this.products[event.target.dataset.id].availability += - 1;
    } else if (basket.findProductID(this.products[event.target.dataset.id].id_product) >= 0) {
      basket.product[basket.findProductID(this.products[event.target.dataset.id].id_product)].quantity += 1;
    }
    basket.updateRenderBasket();
  }
}



let basket = {
  product: [],

  init(){
    this.renderBasket();
    this.updateRenderBasket();

    document.getElementById('btnDel')
      .addEventListener('click', () => this.delAll());

  },

  renderBasket(){
    const header = document.createElement('header');
    document.body.appendChild(header);
    header.style.position = 'fixed'
    header.style.background = 'white'
    header.style.right ='0';
    headerHTML = `<div>
                    <p class="basket"></p>
                    <button id="btnDel">Очистка корзины</button>
                  </div>`
    header.innerHTML = headerHTML;

  },


  countBasketPrice() {
    let countPrice = 0;
    for (let key in this.product) {
      countPrice = countPrice + this.product[key].quantity * this.product[key].price;
    };

    return countPrice;
  },

  delAll() {
    this.product =[];
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
   const textBasket = document.querySelector('.basket');
   if (this.product.length > 0) {
      textBasket.textContent = `В корзине: ` + this.product.length + ` товаров на сумму ` + this.countBasketPrice() + ` рублей`;
    } else {
      textBasket.textContent = `Корзина пуста`;
    }
  }


};
basket.init();
catalog.init();
