// check if html file is still loading
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    // remove item from basket
var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
}

// quantity changed
var quantityInputs = document.getElementsByClassName('cart-quantity')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

// add to Cart
var addToCart = document.getElementsByClassName('drink-item-button');
for (var i = 0; i < addToCart.length; i++) {
    var button = addToCart[i];
    button.addEventListener('click', addToCartClicked)
}
}
// add to Cart event
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('drink-price')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('drink-img')[0].src;
    console.log(title, price, imgSrc);
    addItemToCart(title, price, imgSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.classList.add('row');
    
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('shop-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        console.log(cartItemNames)
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to cart');
            return;
        }
    }
    var cartRowContents = `
            
                <div class="col-md-4 cart-item">
                    <img class="basket-img" src="${imgSrc}" alt="">
                    <span class="shop-item-title">${title}</span>
                </div>
                <div class="col-md-4">
                    <span class="cart-price">${price}</span>
                </div>
                <div class="col-md-4">
                    <input type="number" class="cart-quantity" value="1">
                    <button class="btn btn-danger" type="button">Remove</button>
                </div>
                
                    
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

function quantityChanged(event){
   var input = event.target;
   //is not a number isNaN or input value less or equal to 0
   if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
   }
   updateCartTotal();
}

 // remove item from basket
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}


// update total of cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('£', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '£'+ total
}