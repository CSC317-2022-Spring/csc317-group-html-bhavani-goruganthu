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
    fetch(
      `http://localhost:4000/api/orders/getOrdersByUserEmail?userEmail=${data.userEmail}`
    )
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
        displayUserOrders(data);
      })
      .catch((err) => {
        // throw caught error as an alert
        // alert(err);
        document.getElementById(
          'orders-tbody'
        ).innerHTML += `<tr height="100px"><td colspan=3>No Orders to Display</td></tr>`;
      });
  })
  .catch((err) => {
    // throw caught error as an alert
    // alert(err);
    window.location.pathname = '/src/login.html';
  });

function displayUserOrders(data) {
  data.forEach((order) => {
    document.getElementById('orders-tbody').innerHTML += `<tr>
    <td>${order.order_id}</td>
    <td id="${order.order_id}" class="order-row"></td>
    <td>$${order.totalPrice}</td>
  </tr>
  `;
    fetchOrderProducts(order);
  });
}

function fetchOrderProducts(order) {
  Object.values(JSON.parse(order.products)).forEach((prod) => {
    fetch(
      `http://localhost:4000/api/products/getProductByID?productID=${prod.id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((fetchedCartProducts) => {
        const value = fetchedCartProducts[0];
        document.getElementById(`${order.order_id}`).innerHTML += `
        <div class="orders-product">
        <a href="./productPage.html?type=${value.productCategory}&id=${parseInt(
          value.product_id
        )}">
            <img class="cart-product-image" width="150" height="150"
              src=".${value.productImageUrl}">
          </a>          
          <h5>${value.productName}</h5>
          <h5>Price/Unit: $${parseFloat(value.productPrice)}</h5>
          <h5>Quantity: ${prod.quantity}</h5>
          </div>
        `;
      });
  });
}
