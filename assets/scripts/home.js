// Fetch products data from json file and display the products on the home page
// Inserting to the DOM along with the classnames.
// Any change in the json file - updates the home page automatically
fetch('../assets/data/products.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.Succulents.forEach((succulent) => {
      document.getElementById(
        'succulents-div'
      ).innerHTML += `<div class="product-container">
          <a href="./src/productPage.html?type=Succulents&id=${succulent.id}">
            <img class="product-img" width="300" height="300" src="${succulent.imageUrl}">
          </a>
          <div class="product-description-container">
            <p class="product-name">${succulent.name}</p>
            <p class="product-price"> $${succulent.price}</p>
          </div>
        </div>`;
    });
    data.IndoorPlants.forEach((indoorPlant) => {
      document.getElementById(
        'indoor-plants-div'
      ).innerHTML += `<div class="product-container">
            <a href="./src/productPage.html?type=IndoorPlants&id=${indoorPlant.id}">
              <img class="product-img" width="300" height="300" src="${indoorPlant.imageUrl}">
            </a>
            <div class="product-description-container">
              <p class="product-name">${indoorPlant.name}</p>
              <p class="product-price"> $${indoorPlant.price}</p>
            </div>
          </div>`;
    });
    data.Herbs.forEach((herb) => {
      document.getElementById(
        'herbs-div'
      ).innerHTML += `<div class="product-container">
              <a href="./src/productPage.html?type=Herbs&id=${herb.id}">
                <img class="product-img" width="300" height="300" src="${herb.imageUrl}">
              </a>
              <div class="product-description-container">
                <p class="product-name">${herb.name}</p>
                <p class="product-price"> $${herb.price}</p>
              </div>
            </div>`;
    });
    data.Shrubs.forEach((shrub) => {
      document.getElementById(
        'shrubs-div'
      ).innerHTML += `<div class="product-container">
                <a href="./src/productPage.html?type=Shrubs&id=${shrub.id}">
                  <img class="product-img" width="300" height="300" src="${shrub.imageUrl}">
                </a>
                <div class="product-description-container">
                  <p class="product-name">${shrub.name}</p>
                  <p class="product-price"> $${shrub.price}</p>
                </div>
              </div>`;
    });
  });

document.querySelectorAll('.product-container').forEach((productContainer) => {
  productContainer.addEventListener('click', productContainerClick);
});

function productContainerClick(e) {
  console.log(e.target);
}
