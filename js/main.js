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

// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class ProductsList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = []; //массив товаров
//         this.allProducts = []; //массив объектов
//         this._getProducts().then((data) => {
//             //data - объект js
//             this.goods = [...data];
//             this.render();
//         });
//     }

//     _getProducts() {
//         return fetch(`${API}/catalogData.json`)
//             .then((result) => result.json())
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
//     calcSum() {
//         return this.allProducts.reduce((accum, item) => (accum += item.price), 0);
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new ProductItem(product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
// }

// class ProductItem {
//     constructor(product, img = 'img/mouse.png') {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.id = product.id_product;
//         this.img = img;
//     }
//     render() {
//         return `<div class="product-item" data-id="${this.id}">
//                 <img src="${this.img}" class="product-image" alt="${this.title}">
//                 <h3 class="product-item__text__title">${this.title}</h3>
//                 <p class="product-item__text__price">${this.price} руб</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`;
//     }
// }
// let list = new ProductsList();

// function itemsCart() {
//     return fetch(`${API}/getBasket.json`)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (response) {
//             let itemCart = document.querySelector('.user-cart__item-cart');
//             let obj = [];
//             itemCart.insertAdjacentHTML(
//                 'afterend',
//                 `<h3 class="cart-item__text__cart-price">Общая цена: ${response.amount} руб</h3>`
//             );
//             itemCart.insertAdjacentHTML(
//                 'afterend',
//                 `<h3 class="cart-item__text__cart-title">Общее количество: ${response.countGoods} шт</h3>`
//             );

//             response['contents'].forEach((item) => {
//                 obj.push(`<div class="product-item__cart" data-id="${item.id_product}">
//                 <img src="img/mouse.png" class="product-image__cart" alt="${item.title}">
//                 <h3 class="cart-item__text__title">${item.product_name}</h3>
//                 <p class="cart-item__text__price">${item.price} руб</p>
//                 <p class="cart-item__text__quantity">Количество: ${item.quantity} шт</p>
//                 <button class="add-btn" data-id="${item.id_product}">+</button>
//                 <button class="remove-btn" data-id="${item.id_product}">-</button>
//                 </div>`);
//             });
//             itemCart.innerHTML += obj.join('');
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// itemsCart();

/**************************************** */

// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// class List {
//     constructor(url, container, list = list2) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url) {
//         return fetch(url ? url : `${API + this.url}`)
//             .then((result) => result.json())
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
//     handleData(data) {
//         this.goods = [...data];
//         this.render();
//     }
//     calcSum() {
//         return this.allProducts.reduce((accum, item) => (accum += item.price), 0);
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new this.list[this.constructor.name](product);
//             console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter((product) => regexp.test(product.product_name));
//         this.allProducts.forEach((el) => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         });
//     }
//     _init() {
//         return false;
//     }
// }

// class Item {
//     constructor(el, img = 'img/mouse.png') {
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }
//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                     <img src="${this.img}" class="product-image" alt="${this.title}">
//                         <div class="desc">
//                             <h3 class="product-item__text__title">${this.product_name}</h3>
//                             <p class="product-item__text__price">${this.price} руб</p>
//                             <button class="buy-btn"
//                             data-id="${this.id_product}"
//                             data-name="${this.product_name}"
//                             data-price="${this.price}">Купить</button>
//                         </div>
//                 </div>`;
//     }
// }

// class ProductsList extends List {
//     constructor(cart, container = '.products', url = '/catalogData.json') {
//         super(url, container);
//         this.cart = cart;
//         this.getJson().then((data) => this.handleData(data));
//     }
//     _init() {
//         document.querySelector(this.container).addEventListener('click', (e) => {
//             if (e.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         });
//     }
// }

// class ProductItem extends Item {}

// class Cart extends List {
//     constructor(container = '.cart-block', url = '/getBasket.json') {
//         super(url, container);
//         this.getJson().then((data) => {
//             this.handleData(data.contents);
//         });
//     }
//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`).then((data) => {
//             if (data.result === 1) {
//                 let productId = +element.dataset['id'];
//                 let find = this.allProducts.find((product) => product.id_product === productId);
//                 if (find) {
//                     find.quantity++;
//                     this._updateCart(find);
//                 } else {
//                     let product = {
//                         id_product: productId,
//                         price: +element.dataset['price'],
//                         product_name: element.dataset['name'],
//                         quantity: 1,
//                     };
//                     this.goods = [product];
//                     this.render();
//                 }
//             } else {
//                 alert('Error');
//             }
//         });
//     }
//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
//             if (data.result === 1) {
//                 let productId = +element.dataset['id'];
//                 let find = this.allProducts.find((product) => product.id_product === productId);
//                 if (find.quantity > 1) {
//                     find.quantity--;
//                     this._updateCart(find);
//                 } else {
//                     this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                     document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                 }
//             } else {
//                 alert('Error');
//             }
//         });
//     }
//     _updateCart(product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//         block.querySelector('.product-price').textContent = `$${product.quantity * product.price}`;
//     }
//     _init() {
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', (e) => {
//             if (e.target.classList.contains('del-btn')) {
//                 this.removeProduct(e.target);
//             }
//         });
//     }
// }

// class CartItem extends Item {
//     constructor(el, img = 'img/mouse.png') {
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render() {
//         return `<div class="cart-item" data-id="${this.id_product}">
//                     <div class="product-bio">
//                         <img src="${this.img}" class="product-image__cart" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">${this.product_name}</p>
//                             <p class="product-quantity">Кол-во: ${this.quantity}</p>
//                             <p class="product-single-price">${this.price} руб/шт.</p>
//                         </div>
//                     </div>
//                         <div class="right-block">
//                             <p class="product-price">${this.quantity * this.price} руб</p>
//                             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                         </div>
//                 </div>`;
//     }
// }
// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem,
// };

// let cart = new Cart();
// let products = new ProductsList(cart);
// products.getJson(`getProducts.json`).then((data) => products.handleData(data));

/**************************************** */

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'img/mouse.png',
        userSearch: '',
        show: false,
        searchLine: '',
        filteredProducts: [],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then((result) => result.json())
                .catch((error) => {
                    console.log(error);
                });
        },
        addProduct(product) {
            console.log(product.id_product);
        },

        FilterGoods() {
            let text = this.userSearch.toLowerCase().trim();
            if (text === '') {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter((el) => {
                    return el.product_name.toLowerCase().includes(text);
                });
            }
        },
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`).then((data) => {
            for (let el of data) {
                this.products.push(el);
            }
        });

        this.getJson(`getProducts.json`).then((data) => {
            for (let el of data) {
                this.products.push(el);
            }
        });
        this.filteredProducts = this.products;
    },
});
