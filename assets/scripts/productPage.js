// Get url parameters to know the id & type of the product
const urlParams = new URLSearchParams(window.location.search);
let urlProductType = urlParams.get('type');
let urlProductId = urlParams.get('id');

// fetch product details & display
fetch(
  `http://localhost:4000/api/products/getProductByID?productID=${urlProductId}`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Populating the Product Details
    document.getElementById('product-title').innerText = data[0].productName;
    document.getElementById('prod-img').src = '.' + data[0].productImageUrl;
    document.getElementById(
      'product-info-description'
    ).innerHTML = `<b>Description:</b> ${data[0].productDescription}`;
    document.getElementById(
      'product-info-price'
    ).innerHTML += `${data[0].productPrice}`;
  })
  .catch((err) => console.error(err));

// working with adding product to cart
let addToCartBtn = document.getElementById('product-info-button');
addToCartBtn.addEventListener('click', onClickAddProductToCart);
function onClickAddProductToCart() {
  let quantityDropdown = document.getElementById('quantity');
  let quantity = quantityDropdown.options[quantityDropdown.selectedIndex].value;
  const currentCartProducts =
    JSON.parse(localStorage.getItem('cartProducts')) || [];
  // Before adding any cart product
  // check if the cart is empty
  if (currentCartProducts.length === 0) {
    // add the current cart product directly
    currentCartProducts.push({
      id: parseInt(urlProductId),
      quantity: parseInt(quantity),
      type: urlProductType,
    });
  }
  // if the cart is not empty
  else {
    // check if the product that you are trying to add already exists in the cart
    let cartProductExists = currentCartProducts.filter(
      (prod) => prod.id == urlProductId
    );
    //  if yes, then increase its quantity
    if (cartProductExists.length !== 0) {
      currentCartProducts.forEach((prod) => {
        if (prod.id == urlProductId) {
          let updatedQuantity = parseInt(
            parseInt(prod.quantity) + parseInt(quantity)
          );
          // update the quantity only if it is less than 9
          if (updatedQuantity <= 9) {
            prod.quantity = updatedQuantity;
          }
          // else throw an alert and navigate user to the cart
          else {
            alert(
              'Sorry, Maximum quantity of a product is 9.\nPlease check your Cart'
            );
            // send user to the cart page.. both of these will work
            // window.location.href = `/src/cart.html`;
            window.location.assign(`/src/cart.html`); // preferred
          }
        }
      });
    }
    // if no, add the cart product directly to the cart
    else {
      currentCartProducts.push({
        id: parseInt(urlProductId),
        quantity: parseInt(quantity),
        type: urlProductType,
      });
    }
  }

  localStorage.setItem('cartProducts', JSON.stringify(currentCartProducts));

  // reload the navbar to update cart count
  var navbarIframe = document.getElementById('navbar-iframe');
  navbarIframe.contentWindow.location.reload();
}
