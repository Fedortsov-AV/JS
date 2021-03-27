/*
1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/
function simple (j) {
      if (j === 1 || j === 0) {
        return false;
    } else {
        for(let i = 2; i < j; i++) {
            if(j % i === 0) {
                return false;
            }
        }
        return true;
    }
}

let i = 1;

while (i <= 100){
  if (simple(i)){
   console.log(i, ` - простое число`);
  }
  i++;
}

/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть
сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в
зависимости от находящихся в ней товаров.
*/
let basket = [
  [{product: `product1`, price: 100, quantity: 5}],
  [{product : `product1`, price: 50, quantity: 2}]
   ];
console.log(basket);
console.log(`стоимость товара1: `, basket[0][0].price);
console.log(`стоимость товара2: `, basket[1][0].price);
/*
3. Товары в корзине хранятся в массиве. Задачи:
a. Организовать такой массив для хранения товаров в корзине;
b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
 */

function countBasketPrice(arr) {
  let countPrice = 0;
  for (let key in arr){
    countPrice = countPrice + arr[key][0].price * arr[key][0].quantity;
  }
  return countPrice;
}
console.log(countBasketPrice(basket));
basket.push([{product:`product3`, price: 70, quantity: 2}]);
console.log(countBasketPrice(basket));
/*
  4. * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это
должно так:
for(...){// здесь пусто}
 */

for (let c = 0; c <= 9; console.log(c), c++ ){}

/*
5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
x
xx
xxx
xxxx
xxxxx
 */

let x = ``;
for (let c = 0; c <= 20; c++) {
  x = x + `x`;
  console.log(x);
}




