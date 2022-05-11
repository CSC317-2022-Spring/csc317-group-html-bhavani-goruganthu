fetch('http://localhost:4000/userAuth/getUser', {
  // Adding method type
  method: 'GET',
  credentials: 'include', // use this to include cookies in your response
})
  .then((response) => {
    if (!response.ok) {
      // get the text from the response object
      const text = response.text();
      throw new Error(text);
    } else {
      return response.json();
    }
  })
  .then((data) => {
    let userEmail = data.userEmail;
    // get current cart products from localstorage
    const currentCartProducts =
      JSON.parse(localStorage.getItem('cartProducts')) || [];

    if (currentCartProducts.length === 0) {
      document.querySelector(
        '.checkout-container'
      ).innerHTML = `<h2>Please add items to the cart to Checkout</h2>`;
    } else {
      // to calculate cart length
      let cartLength = 0;
      Object.values(currentCartProducts).filter((prod) => {
        cartLength += parseInt(prod.quantity);
      });
      document.getElementById(
        'checkout-count'
      ).innerText = `${cartLength} items`;

      // to calculate prices
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
            let currSubTotal = calculateSubTotal(prices);
            document.getElementById(
              'checkout-subtotal'
            ).innerText = `Subtotal: $${currSubTotal}`;

            let checkoutTax = calculateTax(currSubTotal);
            document.getElementById(
              'checkout-tax'
            ).innerText = `Tax: $${checkoutTax}`;

            let checkoutShipping = 5.0;

            let calculatedTotalCost = calculateTotalPrice(
              currSubTotal,
              checkoutTax,
              checkoutShipping
            );
            document.getElementById(
              'checkout-total'
            ).innerText = `Total Price: $${calculatedTotalCost}`;
          });
      });

      // on Submit listener for the form
      document
        .getElementById('checkoutForm')
        .addEventListener('submit', function (e) {
          placeOrder(e, userEmail, currentCartProducts);
        });
    }
  })
  .catch((err) => {
    // throw caught error as an alert
    // alert(err);
    document.querySelector(
      '.checkout-container'
    ).innerHTML = `<h2>Please login to Checkout</h2>`;
    window.location.pathname = '/src/login.html';
  });

function calculateSubTotal(prices) {
  // calculate sub total
  let currSubTotal = 0.0;
  prices.forEach((price) => {
    currSubTotal = (parseFloat(currSubTotal) + parseFloat(price)).toFixed(2);
  });
  return currSubTotal;
}

function calculateTax(currSubTotal) {
  return ((parseFloat(currSubTotal) * 18) / 100).toFixed(2);
}

function calculateTotalPrice(currSubTotal, checkoutTax, checkoutShipping) {
  return parseFloat(
    parseFloat(currSubTotal) +
      parseFloat(checkoutTax) +
      parseFloat(checkoutShipping)
  ).toFixed(2);
}

function placeOrder(e, userEmail, currentCartProducts) {
  e.preventDefault();
  let prices = [];
  Object.values(currentCartProducts).forEach((prod, i) => {
    fetch(
      `http://localhost:4000/api/products/getProductByID?productID=${prod.id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((fetchedCartProducts) => {
        fetchedCartProducts.forEach((value) => {
          prices.push(
            parseFloat(value.productPrice * prod.quantity).toFixed(2)
          );
        });
        return prices;
      })
      .then((prices) => {
        if (i === currentCartProducts.length - 1) {
          // calculate sub total
          let currSubTotal = calculateSubTotal(prices);
          let checkoutTax = calculateTax(currSubTotal);
          let checkoutShipping = 5.0;
          let calculatedTotalCost = calculateTotalPrice(
            currSubTotal,
            checkoutTax,
            checkoutShipping
          );
          postUserOrder(
            userEmail,
            currentCartProducts,
            currSubTotal,
            checkoutTax,
            checkoutShipping,
            calculatedTotalCost
          );
        }
      });
  });
}

// post orders
function postUserOrder(
  userEmail,
  currentCartProducts,
  currSubTotal,
  checkoutTax,
  checkoutShipping,
  calculatedTotalCost
) {
  fetch('http://localhost:4000/api/orders/addNewOrder', {
    // Adding method type
    method: 'POST',
    // Adding body or contents to send
    body: JSON.stringify({
      userEmail: userEmail,
      currentCartProducts: currentCartProducts,
      currSubTotal: currSubTotal,
      checkoutTax: checkoutTax,
      checkoutShipping: checkoutShipping,
      calculatedTotalCost: calculatedTotalCost,
    }),
    // Adding headers to the request
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        // get the text from the response object
        const text = await response.text();
        throw new Error(text);
      } else {
        return response.text();
      }
    })
    .then((msg) => {
      // success alert
      alert(msg);
      localStorage.removeItem('cartProducts');
      window.location.pathname = '/src/userOrders.html';
    })
    .catch((err) => {
      // throw the error as an alert
      alert(err);
    });
}
