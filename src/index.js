/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
const forEach = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
const map = (array, fn) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array))
    }
    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
const reduce = (array, fn, initial = array[0]) => {
    let result = initial || array[0];
    let start = initial ? 0 : 1;
    for (let i = start; i < array.length; i++) {
        result = fn.call(null, result, array[i], i, array);
    }
    return result;
}
// Задание 4:

//// Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
////
//// Пример:
////   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
// */
const upperProps = obj => {
    let result = [];
    for(let prop in obj){
       result.push(prop.toUpperCase())
    }
    return result;
}
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, start, end) {
    let result = [];
    start = start || 0;
    end = end || array.length;
    if(start < 0) start = array.length + start;
    if(end < 0) end = array.length + end;
    
    for(let i = start; i < end; i++) {
      if(array[i]) result[result.length] = array[i];
    }
    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
