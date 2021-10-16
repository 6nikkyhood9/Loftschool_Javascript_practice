/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const scope = {
    get cookieList() {
        return this._cookieList;
    },
    set cookieList(value) {
        this._cookieList = value;
        updateCookieList(value);
    }
};

let deleteBtns = [];

function updateCookieList(cookies) {
    deleteBtns.forEach(([button, listener]) => {
        button.removeEventListener('click', listener);
    });

    listTable.innerHTML = cookies.reduce((acum, [cookieName, cookieValue]) => 
        acum + `<tr><td>${cookieName}</td><td>${cookieValue}</td><td><button data-cookie='${cookieName}'>Delete</button></td></tr>`
    , '');
    const buttons = listTable.getElementsByTagName('button');

    deleteBtns = Array.prototype.slice.call(buttons).map(button => {
        const listener = deleteCookie.bind(deleteCookie, button.getAttribute('data-cookie'));

        button.addEventListener('click', listener);
        
        return [button, listener];
    });
}

function splitCookie() {
    if (!document.cookie) {
        return [];
    }
    
    return document.cookie.split('; ').reduce((acum, cur) => {
        acum.push(cur.split('='));
        
        return acum;
    }, []);
}

function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=;expires=${(new Date(0)).toUTCString()}`;
    scope.cookieList = scope.cookieList.filter(([name]) => name != cookieName);
}

scope.cookieList = splitCookie();

addButton.addEventListener('click', () => {
    document.cookie = addNameInput.value + '=' + addValueInput.value;

    scope.cookieList = splitCookie();

    addNameInput.value = '';
    addValueInput.value = ''; 
    filterNameInput.value = '';
 
});

filterNameInput.addEventListener('keyup', (event) => {
    const filteredCookieList = scope.cookieList.filter((cookie) => 
        cookie.some((cookieData) => cookieData.startsWith(event.target.value)));

    updateCookieList(filteredCookieList);
});