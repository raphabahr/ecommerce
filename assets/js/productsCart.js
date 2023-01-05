let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//                              list of itens

productsJson.map((item, index) => {
    let productItem = c('.models .product-item').cloneNode(true);

    productItem.setAttribute('data-key', index);
    productItem.querySelector('.product-item--img img').src = item.img;
    productItem.querySelector('.product-item--price').innerHTML = `$ ${item.price.toFixed(2)}`;
    productItem.querySelector('.product-item--name').innerHTML = item.name;
    productItem.querySelector('.product-item--desc').innerHTML = item.description;
    productItem.querySelector('a').addEventListener('click', (e)=> {
        e.preventDefault();
        let key = e.target.closest('.product-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.productBig img').innerHTML = productsJson[key].img;
        c('.productInfo h1').innerHTML = productsJson[key].name;
        c('.productInfo--desc').innerHTML = productsJson[key].description;
        c('.productInfo h1').innerHTML = productsJson[key].name;
        c('.productInfo--actualPrice').innerHTML = `$ ${productsJson[key].price.toFixed(2)}`;
        c('.productInfo--size.selected').classList.remove('selected');
        cs('.productInfo--size').forEach((voltage, voltageIndex)=> {
            if(voltageIndex == 2) {
                voltage.classList.add('selected');
            }
            voltage.querySelector('span').innerHTML = productsJson[key].voltage[voltageIndex];
        });

        c('.productInfo--qt').innerHTML = modalQt;

        c('.productWindowArea').style.opacity = 0;
        c('.productWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.productWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.product-area').append(productItem);
});

//                          modal events

function closeModal() {
    c('.productWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.productWindowArea').style.display = 'none';
    }, 500);
}

cs('.productInfo--cancelButton, .productInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

c('.productInfo--qtmenos').addEventListener('click',()=> {
    if(modalQt > 1) {
        modalQt--;
        c('.productInfo--qt').innerHTML = modalQt;
    }
});

c('.productInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.productInfo--qt').innerHTML = modalQt;
});

cs('.productInfo--size').forEach((voltage, voltageIndex) => {
    voltage.addEventListener('click', (e)=>{
        c('.productInfo--size.selected').classList.remove('selected');
        voltage.classList.add('selected');
    });
});

//                      cart

c('.productInfo--addButton'). addEventListener('click', ()=> {
    let voltage = parseInt(c('.productInfo--size.selected').getAttribute('data-key'));

    let identifier = productsJson[modalKey].id+'@'+voltage;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:productsJson[modalKey].id,
            voltage,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner span').addEventListener('click', ()=> {
    if(cart.length > 0 ){
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart) {
            let productItem = productsJson.find((item) => item.id == cart[i].id);
            subtotal += productItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let productVoltage;
            switch(cart[i].voltage) {
                case 0:
                    productVoltage = '110V';
                    break;
                case 1:
                    productVoltage = '220V';
                    break;
                case 2:
                    productVoltage = 'BIVOLT';
                    break;
            };
            let productName = `${productItem.name} (${productVoltage})`;

            cartItem.querySelector('img').src = productItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = productName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=> {
                if(cart[i].qt > 1 ){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        discount = subtotal * 0.1;
        total = subtotal - discount;

        c('.subtotal span:last-child').innerHTML = `$ ${subtotal.toFixed(2)}`;
        c('.discount span:last-child').innerHTML = `$ ${discount.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
};

