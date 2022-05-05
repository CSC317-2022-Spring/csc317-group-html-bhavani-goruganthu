// get current cart products from localstorage
const currentCartProducts =
  JSON.parse(localStorage.getItem('cartProducts')) || [];
//   to update cart count
if (currentCartProducts.length === 0) {
  document.getElementById(
    'cart-count'
  ).innerText = `(Count: ${currentCartProducts.length})`;
} else {
  let cartLength = 0;
  Object.values(currentCartProducts).filter((prod) => {
    cartLength += parseInt(prod.quantity);
  });
  document.getElementById('cart-count').innerText = `(Count: ${cartLength})`;
}

// to fetch cart products from db
if (currentCartProducts.length > 0) {
  let prices = [];
  Object.values(currentCartProducts).forEach((prod) => {
    fetch(
      `http://localhost:4000/api/products/getProductByID?productID=${prod.id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((fetchedCartProducts) => {
        // dynamically fill the cart page
        fetchedCartProducts.forEach((value) => {
          document.getElementById('cart-tbody').innerHTML += `<tr>
        <td>
          <a href="./productPage.html?type=${
            value.productCategory
          }&id=${parseInt(value.productID)}">
            <img class="cart-product-image" width="150" height="150"
              src=".${value.productImageUrl}">
          </a>
        </td>
        <td>
          <h5>${value.productName}</h5>
        </td>
        <td>
          <h5>$${parseFloat(value.productPrice)}</h5>
        </td>
        <td>
          <div class="quantity-delete-div">
          <select id="cart-quantity-dropdown-${parseInt(
            value.productID
          )}" class="quantity-dropdown">
            <option value="1"${prod.quantity === 1 ? 'selected' : ''}>1</option>
            <option value="2"${prod.quantity === 2 ? 'selected' : ''}>2</option>
            <option value="3"${prod.quantity === 3 ? 'selected' : ''}>3</option>
            <option value="4"${prod.quantity === 4 ? 'selected' : ''}>4</option>
            <option value="5"${prod.quantity === 5 ? 'selected' : ''}>5</option>
            <option value="6"${prod.quantity === 6 ? 'selected' : ''}>6</option>
            <option value="7"${prod.quantity === 7 ? 'selected' : ''}>7</option>
            <option value="8"${prod.quantity === 8 ? 'selected' : ''}>8</option>
            <option value="9"${prod.quantity === 9 ? 'selected' : ''}>9</option>
          </select>
          <span class="material-icons quantity-delete-icon" id='cart-item-delete-icon-${parseInt(
            value.productID
          )}'>
            delete
          </span>
        </div>
        </td>
        <td>
          <h5>$${parseFloat(value.productPrice * prod.quantity).toFixed(2)}</h5>
        </td>
                </tr>`;
          prices.push(
            parseFloat(value.productPrice * prod.quantity).toFixed(2)
          );
        });
        return prices;
      })
      .then((prices) => {
        // calculate sub total
        let currSubTotal = 0.0;
        prices.forEach((price) => {
          currSubTotal = (parseFloat(currSubTotal) + parseFloat(price)).toFixed(
            2
          );
        });
        document.querySelector(
          '.cart-subtotal'
        ).innerText = `Subtotal: $${currSubTotal}`;

        // work on deleting cart items
        document
          .querySelectorAll('.quantity-delete-icon')
          .forEach((element) => {
            element.addEventListener('click', handleClickCartItemDelete);
          });

        // work on changing quantity dropdown value
        document.querySelectorAll('.quantity-dropdown').forEach((element) => {
          element.addEventListener('change', handleOnChangeQuantity);
        });

        // handle clearCart button onclick event
        document
          .getElementById('clear_cart')
          .addEventListener('click', handleClickClearCart);

        // handle Proceed to Checkout Button
        document
          .getElementById('proceed-checkout-btn')
          .addEventListener('click', handleClickProceedCheckout);
      })
      .catch((err) => console.error(err));
  });
} else {
  document.getElementById('cart-table-div-id').innerHTML = '';
  var emptyText = 'Your Shopping Cart is Empty! Add some plants!';
  var headingEmptyText =
    '<h2 class="" style="text-align: center">' + emptyText + '</h2>';

  document.getElementById('cart-table-div-id').innerHTML = headingEmptyText;
}

function handleClickCartItemDelete(e) {
  // get the element's id which has the product ID
  let productId = this.id.split('-').at(-1);
  let currentCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  currentCartProducts = currentCartProducts.filter(
    (item) => parseInt(item.id) !== parseInt(productId)
  );
  localStorage.setItem('cartProducts', JSON.stringify(currentCartProducts));
  // reload the webpage to load the updated cart details
  window.location.reload();
}

function handleOnChangeQuantity(e) {
  // get the id of the product based on the id of the quantity-dropdown
  let productId = this.id.split('-').at(-1);
  let currentCartProducts = JSON.parse(localStorage.getItem('cartProducts'));

  // add the products which come before the updated product in the currentCartProducts - to maintain the sequence
  let productsBefore = [];
  for (i = 0; i < currentCartProducts.length; i++) {
    if (parseInt(currentCartProducts[i].id) !== parseInt(productId)) {
      productsBefore.push(currentCartProducts[i]);
    } else {
      break;
    }
  }
  // get the product whose quantity is updated - update the quantity of that product
  let getProductToUpdate = currentCartProducts.filter(
    (prod) => parseInt(prod.id) === parseInt(productId)
  );
  getProductToUpdate[0].quantity = parseInt(e.target.value);

  // get all the products except the product whose quantity is updated
  let getAllProductsExceptUpdated = currentCartProducts.filter(
    (prod) => parseInt(prod.id) !== parseInt(productId)
  );

  // add all 3 array items to an array to remove duplicates later.. this way sequence of the cart items is maintained
  let tempCartProducts = [
    ...productsBefore,
    ...getProductToUpdate,
    ...getAllProductsExceptUpdated,
  ];

  // convert to set and then to array - to eliminate duplicates
  let jsonObject = tempCartProducts.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let uniqueFilteredProducts = Array.from(uniqueSet).map(JSON.parse);

  const updatedCartProducts = uniqueFilteredProducts;
  localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
  window.location.reload();
}

function handleClickClearCart(e) {
  e.preventDefault();
  var userAnswer = window.confirm(
    'All Cart Items will be cleared. Are you sure?'
  );
  if (userAnswer) {
    localStorage.removeItem('cartProducts');
    window.location.reload();
  }
}

function handleClickProceedCheckout(e) {
  if (currentCartProducts.length > 0) {
    document
      .getElementById('proceed-checkout-btn')
      .parentElement.setAttribute('href', './checkout.html');
  }
}
