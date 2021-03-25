
/*
1. Дан код:
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
d = b++; alert(d);           // 1
c = (2+ ++a); alert(c);      // 5
d = (2+ b++); alert(d);      // 4
alert(a);                    // 3
alert(b);                    // 3
Почему код даёт именно такие результаты?
*/
let a = 1, b = 1, c, d;
c = ++a;  console.log(`c:${c}, a:${a}`); // 2  это строка означает, что переменную "а" увеличили на 1 и присвоили получившиеся значение переменной "с"
d = b++; console.log(`d:${d}, b:${b}`); // 1 b++ означает, что мы присвоили переменной "d" значение переменной "b", а после прибавили к переменной "b" единицу
/*
я как понимаю, d = b++; краткая запись двух инструкций: d = b; ++b;
*/

c = (2+ ++a); console.log(`c:${c}, a:${a}`); // 5   Увеличили переменную "а" еще на единицу (тала равной 3) и прибавили 2

d = (2+ b++); console.log(`d:${d}, b:${b}`); // 4   прибавили к 2  значение переменной "b" и присвоили значение переменной "d", после увеличили значение переменной "b" на единицу
console.log(`a:${a}`); // 3	Выше переменную "а" увеличили два раза на 1, поэтому получили 3
console.log(`b:${b}`); // 3 То же , что и пункт выше


/*
2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2);

Ответ: х = 5 (1 + (2*2) = 5)
*/

/*
3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
*/

a = 5;
b = -10;
if (a >= 0 && b >= 0){
  alert(a-b);
}
else if (a < 0 && b < 0){
  alert(a*b);
}
else if (a < 0 && b >= 0){
  alert(a+b);
}
else { 
alert(a+b);
}


/*
4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/

a = parseInt(prompt("введите число в промежутке [0..15]"));
let nums = [];
switch (a){
  case 0:
    nums.push(0);
    console.log(0);
  case 1:
    nums.push(1);
    console.log(1);
  case 2:
   nums.push(2);
    console.log(2);
  case 3:
    nums.push(3);
    console.log(3);
  case 4:
    nums.push(4);
    console.log(4);
  case 5:
    nums.push(5);
    console.log(5);
  case 6:
    nums.push(6);
    console.log(6);
  case 7:
    nums.push(7);
    console.log(7);
  case 8:
    nums.push(8);
    console.log(8);
  case 9:
    nums.push(9);
    console.log(9);
  case 10:
    nums.push(10);
    console.log(10);
  case 11:
    nums.push(11);
    console.log(11);
  case 12:
    nums.push(12);
    console.log(12);
  case 13:
    nums.push(13);
    console.log(13);
  case 14:
    nums.push(14);
    console.log(14);
  case 15:
    nums.push(15);
    console.log(15);
}
alert(nums)

/*
5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/

function sum(a, b){
  return a+b;
}

function subtraction(a, b) {
  return a-b;
}

function composition(a ,b) {
  return a*b;
}

function division(a, b) {
  return a/b;
}

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 – значения аргументов, operation – строка с названием операции.
В зависимости от переданного значения операции выполнить одну из арифметических операций
(использовать функции из пункта 5) и вернуть полученное значение (использовать switch)..
*/


/**
 * mathOperation
 * @param arg1 {Number}
 * @param arg2 {Number}
 * @param operation {String}
 * @returns {void|*}
 */

function mathOperation(arg1, arg2, operation) {
  switch (operation){
    case "сумма":
      return sum(arg1, arg2);
    case "разность":
      return subtraction(arg1, arg2);
    case "произведение":
      return  composition(arg1, arg2);
    case "деление":
      return division(arg1, arg2);
    default:
      return console.log("Не верное название оператора, используйте 'сумма', 'разность' , 'произведение', 'деление'");
  }
}

/*
7. *Сравнить null и 0. Попробуйте объяснить результат.
*/

null == 0; // false
null === 0; // false
null >= 0; // true
null > 0; // false
null < 0; // false
null <= 0; // true
typeof(null); // "object"

/*
null  - существующий объект не имеющий значений, поэтому выражения  0 <= null >= 0 возвращают true, но объект не определен,
поэтому любые другие сравнения возвращают false - это на первый взгляд не вдаваясь в алгоритмы сравнения JS, в них не рылся,
но возможно дело именно в них или точнее в переводе типа "объект" в тип "число" для сравнения.
 */

/*
8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow),
 где val – заданное число, pow – степень.
*/
/**
 * power
 * @param val {number}
 * @param pow {number}
 * @returns {number|*}
 */
function power(val, pow){
  if (pow === 0 ){
    return 1;
  }
  if (pow === 1){
    return val;
  }
  if (pow === -1){
    return 1/val
  }
  if (pow > 0 && pow <1)
    return
  if (pow > 0){
    return power(val, pow-1)*val;
  }
  if (pow < 0){
    return 1/(power(val, Math.abs(pow)-1)*val);
  }
}
