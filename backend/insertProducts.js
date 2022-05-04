const database = require('./db'); // connect to the db
var fs = require('fs');
fs.readFile('../assets/data/products.json', 'utf8', function (err, data) {
  if (err) throw err;
  const products = JSON.parse(data);

  Object.entries(products).forEach((plants) => {
    const prodCategory = plants[0];
    Object.values(plants[1]).forEach((catPlants) => {
      const prodID = catPlants.id;
      const prodName = catPlants.name;
      const prodDescription = catPlants.description;
      const prodImageURL = catPlants.imageUrl;
      const prodPrice = catPlants.price;
      const prodRating = catPlants.rating;
      const prodReviews = JSON.stringify(catPlants.reviews);
      const query =
        `INSERT INTO products (productID, productCategory, productName, productDescription, productImageUrl, productPrice, productRating, productReviews) VALUES ('` +
        prodID +
        `','` +
        prodCategory +
        `','` +
        prodName +
        `','` +
        prodDescription +
        `','` +
        prodImageURL +
        `','` +
        prodPrice +
        `','` +
        prodRating +
        `','` +
        prodReviews +
        `')`;
      // Send product query to db
      database.query(query, (err, result) => {
        if (err) console.log(err);
        console.log('Uploaded product info to db');
      });
    });
  });
});
