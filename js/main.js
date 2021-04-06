// const products = [
//     { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.png' },
//     { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.png' },
//     { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.png' },
//     { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.png' },
// ];
// //Функция для формирования верстки каждого товара
// // const renderProduct = (title, price, image) => {
// //     return `<div class="product-item">
// //                 <img src="${image}" alt="">
// //                 <h3 class="product-item__text__title">${title}</h3>
// //                 <p class="product-item__text__price">${price}</p>
// //                 <button class="buy-btn">Купить</button>
// //             </div>`;
// // };
// // const renderPage = (list) => {
// //     const productsList = list.map((item) =>
// //         renderProduct(item.title, item.price, item.image)
// //     );
// //     console.log(productsList);
// //     document.querySelector('.products').innerHTML = productsList;
// // };

// // renderPage(products);

// const renderProduct = (item) => {
//     return `<div class="product-item">
//                 <img src="${item.image}" class="product-image" alt="">
//                 <h3 class="product-item__text__title">${item.title}</h3>
//                 <p class="product-item__text__price">${item.price} руб</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`;
// };
// const renderPage = (list) => {
//     document
//         .querySelector('.products')
//         .insertAdjacentHTML('beforeend', list.map((item) => renderProduct(item, item.image)).join(' '));
// };
// console.log(products);

// renderPage(products);

/******************************************************/

// class ProductsList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];
//         this._fetchProducts();
//     }

//     _fetchProducts() {
//         this.goods = [
//             { id: 1, title: 'Notebook', price: 2000, image: 'img/notebook.png' },
//             { id: 2, title: 'Mouse', price: 20, image: 'img/mouse.png' },
//             { id: 3, title: 'Keyboard', price: 200, image: 'img/keyboard.png' },
//             { id: 4, title: 'Gamepad', price: 50, image: 'img/gamepad.png' },
//         ];
//     }

//     totalGoodsPrice() {
//         let sum = 0;
//         this.goods.forEach((good) => {
//             sum += good.price;
//         });
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new ProductItem(product);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//             //            block.innerHTML += productObj.render();
//         }
//     }
// }

// class ProductItem {
//     constructor(product, img) {
//         this.title = product.title;
//         this.price = product.price;
//         this.id = product.id;
//         this.img = product.image;
//     }

//     render() {
//         return `<div class="product-item" data-id="${this.id}">
//                 <img src="${this.img}" class="product-image" alt="${this.title}">
//                 <h3 class="product-item__text__title">${this.title}</h3>
//                 <p class="product-item__text__price">${this.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`;
//     }
// }

// let list = new ProductsList();
// list.render();

// // Создаем класс Cart c методами, добавления, удаления, изменения, и загрузка товаров

// class Cart {
//     addGoods(itemCart) {}
//     removeGoods() {}
//     changeGoods() {}
//     render() {}
// }

// // Создаем класс ItemCart

// class ItemCart {
//     render() {}
// }\

/**************************************** */

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts().then((data) => {
            //data - объект js
            this.goods = [...data];
            this.render();
        });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((result) => result.json())
            .catch((error) => {
                console.log(error);
            });
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => (accum += item.price), 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'img/mouse.png') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" class="product-image" alt="${this.title}">
                <h3 class="product-item__text__title">${this.title}</h3>
                <p class="product-item__text__price">${this.price} руб</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}
let list = new ProductsList();

function itemsCart() {
    return fetch(`${API}/getBasket.json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let itemCart = document.querySelector('.user-cart__item-cart');
            let obj = [];
            itemCart.insertAdjacentHTML(
                'afterend',
                `<h3 class="cart-item__text__cart-price">Общая цена: ${response.amount} руб</h3>`
            );
            itemCart.insertAdjacentHTML(
                'afterend',
                `<h3 class="cart-item__text__cart-title">Общее количество: ${response.countGoods} шт</h3>`
            );

            response['contents'].forEach((item) => {
                obj.push(`<div class="product-item__cart" data-id="${item.id_product}">
                <img src="img/mouse.png" class="product-image__cart" alt="${item.title}">
                <h3 class="cart-item__text__title">${item.product_name}</h3>
                <p class="cart-item__text__price">${item.price} руб</p>
                <p class="cart-item__text__quantity">Количество: ${item.quantity} шт</p>
                <button class="add-btn" data-id="${item.id_product}">+</button>
                <button class="remove-btn" data-id="${item.id_product}">-</button>
                </div>`);
            });
            itemCart.innerHTML += obj.join('');
        })
        .catch((error) => {
            console.log(error);
        });
}

itemsCart();
