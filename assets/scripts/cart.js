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
          <div  class="quantity-delete-div">
          <select id="cart-quantity-dropdown" class="quantity-dropdown">
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
