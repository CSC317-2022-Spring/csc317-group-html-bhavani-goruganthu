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

  // get filtered cart products from localstorage
  const fetchedCartProducts = JSON.parse(
    localStorage.getItem('fetchedCartProducts')
  );
  console.log(fetchedCartProducts);
  // dynamically fill the checkout page
  fetchedCartProducts.forEach((value) => {
    document.getElementById('checkout-tbody').innerHTML += `<tr>
            <td>
              <a href="./productPage.html?type=${value.type}&id=${parseInt(
      value.products.id
    )}">
                <img class="checkout-product-image" width="50" height="50"
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
              <div>
                <h5>${value.quantity}</h5>
              </div>
            </td>
            <td>
              <h5>$${parseFloat(value.products.price * value.quantity).toFixed(
                2
              )}</h5>
            </td>
          </tr>`;
  });

  let cartSubTotal = localStorage.getItem('cartSubTotal');
  document.getElementById(
    'checkout-subtotal'
  ).innerText = `Subtotal: $${cartSubTotal}`;

  let checkoutTax = ((parseFloat(cartSubTotal) * 18) / 100).toFixed(2);
  document.getElementById('checkout-tax').innerText = `Tax: $${checkoutTax}`;

  let checkoutShipping = 5.0;

  let calculatedTotalCost = parseFloat(
    parseFloat(cartSubTotal) +
      parseFloat(checkoutTax) +
      parseFloat(checkoutShipping)
  ).toFixed(2);
  document.getElementById(
    'checkout-total'
  ).innerText = `Total Price: $${calculatedTotalCost}`;
}
