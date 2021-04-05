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
                <p class="product-item__text__price">${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}
let list = new ProductsList();

let btnCart = document.querySelector('.header_basket');
let goodsListSection = document.getElementById('goods-list-section');
let btnCloseCart = document.getElementById('goods-list-section__delete');
let btnOrder = document.getElementsByClassName('product-card-section_btn-order');

// Создаем класс корзина Cart
class Cart {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        makeGETRequest(`${API}/getBasket.json`)
            .then((goods) => {
                this.goods = JSON.parse(goods);
                console.log(`${goods}`);
            })
            .then(() => {
                this.render();
            })
            .catch((err) => {
                console.error('err');
            });
    }
    // метод добавления товара в корзину
    addGoods() {
        let itemCart = this.goods.filter((el) => el.title == product.title)[0];

        if (itemCart != undefined) {
            itemCart.addQuantity();
        } else {
            let item = new itemCart(product);
            this.goods.push(item);
        }
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach((ItemCart, indexOfProduct) => {
            listHtml += ItemCart.renderItemCart(indexOfProduct);
        });
        goodsList.innerHTML = listHtml;

        this.totalCartPrice();
    }

    //метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach((good) => {
            sum += good.price * good.quantity;
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    removeGoods(index) {
        this.goods.splice(index, 1);
        this.render();
    }
}

const addItemToCart = () => {
    let productName = target.dataset.productName;
    let product = allProducts[productName];
    cart.addItemToCart(product);
};

class ItemCart {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.src = product.src;
        this.quantity = 1;
    }
    //разметка корзины
    renderItemCart(index) {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}</div>
        <div class="goods-list__product-box__quantity">${this.quantity}</div>
        <img class="goods-list__product-box__img" src=${this.src} height="100px" alt="">
        <input type="submit" value="X" class="goods-list-item__product-box__delete" data-product-index=${index} onclick="deleteItemFromCart()">
        </div>`;
    }

    addQuantity() {
        this.quantity += 1;
    }
}

let cart = new Cart();

let openCart = () => {
    cart.render();
    goodsListSection.style.display = 'block';
};

btnCart.addEventListener('click', openCart);
window.addEventListener('click', function (event) {});
btnCloseCart.addEventListener('click', function (event) {
    goodsListSection.style.display = 'none';
});
