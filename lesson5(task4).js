/*
4*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
4.1. Создать массив товаров (сущность Product);
4.2. При загрузке страницы на базе данного массива генерировать вывод из него.
HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
 */

let products = [
  {id_product: 0, name:'Видеокарта', price: 8000, availability: 50, category: 'Комплектующие ПК', id_category: 1},
  {id_product: 1, name:'Процессор', price: 18000, availability: 50, category: 'Комплектующие ПК', id_category: 1},
  {id_product: 2, name:'Материнская плата', price: 10000, availability: 50, category: 'Комплектующие ПК', id_category: 1},
  {id_product: 3, name:'Кулер', price: 500, availability: 50, category: 'Комплектующие ПК', id_category: 1},
  {id_product: 4, name:'Принтер', price: 2000, availability: 50, category: 'Переферия', id_category: 2},
  {id_product: 5, name:'Сканер', price: 3000, availability: 50, category: 'Переферия', id_category: 2},
  {id_product: 6, name:'Клавиатура', price: 1000, availability: 50, category: 'Переферия', id_category: 2},
  {id_product: 7, name:'Маршрутизатор', price: 5000, availability: 50, category: 'Сетевое оборудование', id_category: 3},
  {id_product: 6, name:'Роутер', price: 1000, availability: 50, category: 'Сетевое оборудование', id_category: 3}
];

const divCatalog = document.createElement('div');
divCatalog.id = 'catalog';
document.body.appendChild(divCatalog);
const p = document.createElement('p');
p.textContent = 'Каталог товаров';
divCatalog.appendChild(p);

let containerElement = document.getElementById('catalog');
console.log(containerElement)
let tmpArray = [];
function itemCheck(item) {
    if (tmpArray.indexOf(item.category) === -1) {
        tmpArray.push(item.category);
        return true
    }
    return false;
}
console.log(products.filter((item) => itemCheck(item)));


for (let cat = 0; cat < tmpArray.length; cat++) {
  const liElem = document.createElement('li');
  liElem.textContent = tmpArray[cat];
  containerElement.appendChild(liElem);

  for (let i = 0; i < products.length; i++) {
      if (tmpArray[cat] === products[i].category) {
      const cell = document.createElement('ul');
      cell.textContent = products[i].name;
      liElem.appendChild(cell);
    }


  }
  ;
}
;
