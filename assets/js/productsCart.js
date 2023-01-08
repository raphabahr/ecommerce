let cart = [];
let modalQt = 1;
let modalKey = 0;



//                              list of itens

productsJson.map((item, index) => {
    let productItem = document.querySelector('.models .product-item').cloneNode(true);

    productItem.setAttribute('data-key', index);
    productItem.querySelector('.product-item--img img').src = item.img;
    productItem.querySelector('.product-item--price').innerHTML = `$ ${item.price.toFixed(2)}`;
    productItem.querySelector('.product-item--name').innerHTML = item.name;
    productItem.querySelector('.product-item--desc').innerHTML = item.description;
    productItem.querySelector('a').addEventListener('click', (e)=> {
        e.preventDefault();
        let key = e.target.closest('.product-item').dataset.key; // data getAttribute não funfa em todas nave
        modalQt = 1;
        modalKey = key;

        document.querySelector('.productBig img').src = productsJson[key].img;
        document.querySelector('.productInfo h1').innerHTML = productsJson[key].name;
        document.querySelector('.productInfo--desc').innerHTML = productsJson[key].description;
        document.querySelector('.productInfo h1').innerHTML = productsJson[key].name;
        document.querySelector('.productInfo--actualPrice').innerHTML = `$ ${productsJson[key].price.toFixed(2)}`;
        document.querySelector('.productInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.productInfo--size').forEach((voltage, voltageIndex)=> {
            if(voltageIndex == 2) {
                voltage.classList.add('selected');
            }
            voltage.querySelector('span').innerHTML = productsJson[key].voltage[voltageIndex];
        });

        document.querySelector('.productInfo--qt').innerHTML = modalQt;document.querySelector
        document.querySelector('.productWindowArea').style.opacity = 0;
        document.querySelector('.productWindowArea').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.productWindowArea').style.opacity = 1;
        }, 200);
    });

    document.querySelector('.product-area').append(productItem);
});

//                          modal events

function closeModal() {
    document.querySelector('.productWindowArea').style.opacity = 0;
    setTimeout(()=>{
        document.querySelector('.productWindowArea').style.display = 'none';
    }, 500);
}

document.querySelectorAll('.productInfo--cancelButton, .productInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

document.querySelector('.productInfo--qtmenos').addEventListener('click',()=> {
    if(modalQt > 1) {
        modalQt--;
        document.querySelector('.productInfo--qt').innerHTML = modalQt;
    }
});

document.querySelector('.productInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    document.querySelector('.productInfo--qt').innerHTML = modalQt;
});

document.querySelectorAll('.productInfo--size').forEach((voltage, voltageIndex) => {
    voltage.addEventListener('click', (e)=>{
        document.querySelector('.productInfo--size.selected').classList.remove('selected');
        voltage.classList.add('selected');
    });
});

//                      cart

document.querySelector('.productInfo--addButton'). addEventListener('click', ()=> {
    let voltage = parseInt(document.querySelector('.productInfo--size.selected').getAttribute('data-key'));

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

document.querySelector('.menu-openner span').addEventListener('click', ()=> {
    if(cart.length > 0 ){
        document.querySelector('aside').style.left = '0';
    }
});

document.querySelector('.menu-closer').addEventListener('click', () => {
    document.querySelector('aside').style.left = '100vw';
});

function updateCart() {
    document.querySelector('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart) {
            let productItem = productsJson.find((item) => item.id == cart[i].id);
            subtotal += productItem.price * cart[i].qt;

            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);

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

            document.querySelector('.cart').append(cartItem);
        }

        discount = subtotal * 0.1;
        total = subtotal - discount;

        document.querySelector('.subtotal span:last-child').innerHTML = `$ ${subtotal.toFixed(2)}`;
        document.querySelector('.discount span:last-child').innerHTML = `$ ${discount.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `$ ${total.toFixed(2)}`;

    } else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    }
};

