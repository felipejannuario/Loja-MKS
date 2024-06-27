let cartItems = [];

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('open');
}

function addToCart(productName, productPrice) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        item.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();

   const cart = document.getElementById('cart');
    if (!cart.classList.contains('open')) {
        toggleCart();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-details">
                <span>${item.name}</span>
                <span>R$${item.price.toFixed(2)}</span>
            </div>
            <div class="item-quantity">
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
                <button onclick="removeFromCart('${item.name}')">X</button>
            </div>
        `;
        cartItemsContainer.appendChild(li);
        
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `R$${totalPrice.toFixed(2)}`;
}

function changeQuantity(productName, change) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCart();
        }
    }
}

function updateQuantity(productName, quantity) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    updateCart();
}

function finalizePurchase() {
    alert('Compra finalizada!');
    cartItems = [];
    updateCart();
}

document.getElementById('checkout-button').addEventListener('click', finalizePurchase);





