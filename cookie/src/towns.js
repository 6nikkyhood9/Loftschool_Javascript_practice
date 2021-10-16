/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
*/
/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

const homeworkContainer = document.querySelector('#homework-container');

const loadingBlock = homeworkContainer.querySelector('#loading-block');

const filterBlock = homeworkContainer.querySelector('#filter-block');

const filterInput = homeworkContainer.querySelector('#filter-input');

const filterResult = homeworkContainer.querySelector('#filter-result');

const myCity = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

function loadTowns() {
    fetch(myCity)
        .then(answer => answer.json())
        .then(townsArray => {
            let collator = new Intl.Collator('en', { usage: 'search', sensitivity: 'base' });
            let towns = townsArray.map(town => town.name).sort(collator.compare).map(town => ({ name: town }));

            towns.map((item) => {
                let element = document.createElement('div');

                element.innerHTML = item.name;
                filterResult.appendChild(element);
            });
            
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            filterInput.addEventListener('keyup', event => {
                const value = event.target.value.toLowerCase();

                let filterTwn = towns.filter((twn) => {
                    return twn.name.toLowerCase().indexOf(value) > -1 ? true : false;
                });

                filterResult.innerHTML = '';

                filterTwn.map((item) => {
                    let element = document.createElement('div');
    
                    element.innerHTML = item.name;
                    filterResult.appendChild(element);
                });
            });

        }).catch(() => {  
            const repeatButton = document.createElement('button');

            repeatButton.textContent = 'Try again';
            homeworkContainer.appendChild(repeatButton);

            repeatButton.addEventListener('click', (event) => {
                window.location.reload();
            });
            console.error ('!!!Error!!!');
        });
}

function isMatching(full, chunk) {
    full.full.toLowerCase();
    chunk.chunk.toLowerCase();
          
    return full.indexOf(chunk) + 1 ? true : false;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
export {
    loadTowns,
    isMatching
};
