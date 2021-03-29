const products = [
    { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.png' },
    { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.png' },
    { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.png' },
    { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.png' },
];
//Функция для формирования верстки каждого товара
// const renderProduct = (title, price, image) => {
//     return `<div class="product-item">
//                 <img src="${image}" alt="">
//                 <h3 class="product-item__text__title">${title}</h3>
//                 <p class="product-item__text__price">${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`;
// };
// const renderPage = (list) => {
//     const productsList = list.map((item) =>
//         renderProduct(item.title, item.price, item.image)
//     );
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList;
// };

// renderPage(products);

const renderProduct = (item) => {
    return `<div class="product-item">
                <img src="${item.image}" class="product-image" alt="">
                <h3 class="product-item__text__title">${item.title}</h3>
                <p class="product-item__text__price">${item.price} руб</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};
const renderPage = (list) => {
    document
        .querySelector('.products')
        .insertAdjacentHTML('beforeend', list.map((item) => renderProduct(item, item.image)).join(' '));
};
console.log(products);

renderPage(products);
