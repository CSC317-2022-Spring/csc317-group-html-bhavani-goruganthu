//  initialize variable for subtotal
localStorage.setItem('cartSubTotal', 0);

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

if (currentCartProducts.length > 0) {
  // fetch products from json file by id & category
  console.log(currentCartProducts);
  fetch('../assets/scripts/products.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let fetchedCartProducts = [];
      Object.values(currentCartProducts).filter((prod) => {
        let filteredByCategory = Object.entries(data).filter(
          (key) => key.includes(prod.type) // get the products filtered by category
        );
        // the products that belong to the category are in filteredCategory[0][1]
        const filteredProductsByName = filteredByCategory[0][1].filter(
          (e) => parseInt(e.id) === parseInt(prod.id)
        );
        fetchedCartProducts.push({
          type: prod.type,
          products: filteredProductsByName[0],
          quantity: parseInt(prod.quantity),
        });
      });
      console.log(fetchedCartProducts);
      return fetchedCartProducts;
    })
    .then((fetchedCartProducts) => {
      // dynamically fill the cart page
      fetchedCartProducts.forEach((value) => {
        document.getElementById('cart-tbody').innerHTML += `<tr>
        <td>
          <a href="./productPage.html?type=${value.type}&id=${parseInt(
          value.products.id
        )}">
            <img class="cart-product-image" width="150" height="150"
              src=".${value.products.imageUrl}">
          </a>
        </td>
        <td>
          <h5>${value.products.name}</h5>
        </td>
        <td>
          <h5>$${parseFloat(value.products.price)}</h5>
        </td>
        <td>
          <div class="quantity-delete-div">
          <select id="cart-quantity-dropdown-${parseInt(
            value.products.id
          )}" class="quantity-dropdown">
            <option value="1"${
              value.quantity === 1 ? 'selected' : ''
            }>1</option>
            <option value="2"${
              value.quantity === 2 ? 'selected' : ''
            }>2</option>
            <option value="3"${
              value.quantity === 3 ? 'selected' : ''
            }>3</option>
            <option value="4"${
              value.quantity === 4 ? 'selected' : ''
            }>4</option>
            <option value="5"${
              value.quantity === 5 ? 'selected' : ''
            }>5</option>
            <option value="6"${
              value.quantity === 6 ? 'selected' : ''
            }>6</option>
            <option value="7"${
              value.quantity === 7 ? 'selected' : ''
            }>7</option>
            <option value="8"${
              value.quantity === 8 ? 'selected' : ''
            }>8</option>
            <option value="9"${
              value.quantity === 9 ? 'selected' : ''
            }>9</option>
          </select>
          <span class="material-icons quantity-delete-icon" id='cart-item-delete-icon-${parseInt(
            value.products.id
          )}'>
            delete
          </span>
        </div>
        </td>
        <td>
          <h5>$${parseFloat(value.products.price * value.quantity).toFixed(
            2
          )}</h5>
        </td>
                </tr>`;

        // set subTotal Price
        let prodPrice = parseFloat(
          value.products.price * value.quantity
        ).toFixed(2);
        let currSubTotal = (
          parseFloat(localStorage.getItem('cartSubTotal')) +
          parseFloat(prodPrice)
        ).toFixed(2);
        localStorage.setItem('cartSubTotal', currSubTotal);
        document.querySelector(
          '.cart-subtotal'
        ).innerText = `Subtotal: $${localStorage.getItem('cartSubTotal')}`;
      });
    })
    .then(() => {
      // work on deleting cart items
      document.querySelectorAll('.quantity-delete-icon').forEach((element) => {
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
    });
}

function handleClickCartItemDelete(e) {
  let productId = this.id.split('-').at(-1);
  let currentCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  currentCartProducts = currentCartProducts.filter(
    (item) => parseInt(item.id) !== parseInt(productId)
  );
  console.log(currentCartProducts);
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
  console.log(productsBefore);

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
  console.log(tempCartProducts);

  // convert to set and then to array - to eliminate duplicates
  let jsonObject = tempCartProducts.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let uniqueFilteredProducts = Array.from(uniqueSet).map(JSON.parse);
  console.log(uniqueFilteredProducts);

  const updatedCartProducts = uniqueFilteredProducts;
  console.log(updatedCartProducts);
  localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
  window.location.reload();
}

function handleClickClearCart(e) {
  e.preventDefault();
  var userAnswer = window.confirm(
    'All Cart Items will be cleared. Are you sure?'
  );
  if (userAnswer) {
    console.log('removed');
    localStorage.removeItem('cartProducts');
    window.location.reload();
  }
}
