window.onload = function () {
   // localStorage.setItem("numOfItems", 1)
   let clearCartButton = document.getElementById("clear_cart");
   clearCartButton.addEventListener('click', clearCart)
   function clearCart() {
      localStorage.setItem("numOfItems", 0)
      // localStorage.clear()
   }
}