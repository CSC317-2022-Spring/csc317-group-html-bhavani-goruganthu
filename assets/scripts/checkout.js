let isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn === 'true') {
  // get current cart products from localstorage
  const currentCartProducts =
    JSON.parse(localStorage.getItem('cartProducts')) || [];

  if (currentCartProducts.length === 0) {
    document.querySelector(
      '.checkout-container'
    ).innerHTML = `<h2>Please add items to the cart to Checkout</h2>`;
  } else {
    let cartLength = 0;
    Object.values(currentCartProducts).filter((prod) => {
      cartLength += parseInt(prod.quantity);
    });
    document.getElementById('checkout-count').innerText = `${cartLength} items`;

    let prices = [];
    Object.values(currentCartProducts).forEach((prod) => {
      fetch(
        `http://localhost:4000/api/products/getProductByID?productID=${prod.id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((fetchedCartProducts) => {
          // dynamically fill the checkout page
          fetchedCartProducts.forEach((value) => {
            document.getElementById('checkout-tbody').innerHTML += `<tr>
            <td>
              <a href="./productPage.html?type=${
                value.productCategory
              }&id=${parseInt(value.product_id)}">
                <img class="checkout-product-image" width="50" height="50"
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
              <div>
                <h5>${prod.quantity}</h5>
              </div>
            </td>
            <td>
              <h5>$${parseFloat(value.productPrice * prod.quantity).toFixed(
                2
              )}</h5>
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
            currSubTotal = (
              parseFloat(currSubTotal) + parseFloat(price)
            ).toFixed(2);
          });
          document.getElementById(
            'checkout-subtotal'
          ).innerText = `Subtotal: $${currSubTotal}`;

          let checkoutTax = ((parseFloat(currSubTotal) * 18) / 100).toFixed(2);
          document.getElementById(
            'checkout-tax'
          ).innerText = `Tax: $${checkoutTax}`;

          let checkoutShipping = 5.0;

          let calculatedTotalCost = parseFloat(
            parseFloat(currSubTotal) +
              parseFloat(checkoutTax) +
              parseFloat(checkoutShipping)
          ).toFixed(2);
          document.getElementById(
            'checkout-total'
          ).innerText = `Total Price: $${calculatedTotalCost}`;

          document
            .getElementById('place-order-btn')
            .addEventListener('click', handlePlaceOrder);
        });
    });
  }
} else {
  document.querySelector(
    '.checkout-container'
  ).innerHTML = `<h2>Please login to Checkout</h2>`;
  window.location.pathname = '/src/login.html';
}

function handlePlaceOrder() {
  document
    .getElementById('place-order-btn')
    .parentElement.setAttribute('href', '../index.html');
  localStorage.removeItem('cartProducts');
}
