window.onload = function () {
   // localStorage.setItem("numOfItems", 1)
   // localStorage.clear()
   let selector = document.getElementById("quantity");
   let addToCart = document.getElementById("product-info-button");
   
   function setCartNumber(event) {
      let itemQuantity = Number(selector.value);
      let localStorageNum = Number(localStorage.getItem("numOfItems"))
      if(localStorageNum) {
         localStorage.setItem("numOfItems", localStorageNum + itemQuantity);
      } else {
         localStorage.setItem("numOfItems", itemQuantity)
      }
      console.log(localStorage.getItem("numOfItems"))
      event.preventDefault();
   }
   
   addToCart.addEventListener('click', setCartNumber);

   // let numOfItems = localStorage.getItem("numOfItems")
   // if (numOfItems) {
   //    element.innerHTML += `<div>${numOfItems}</div>`
   // }
   // localStorage.clear()
}