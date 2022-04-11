window.onload = function () {
   let element = document.getElementById("cart-number");
   // localStorage.setItem("numOfItems", 1)
   
   let numOfItems = localStorage.getItem("numOfItems")
   if (numOfItems) {
      element.innerHTML += `<p style="color:white;">${numOfItems}</p>`
   }
   // localStorage.clear()
}

window.addEventListener('storage', () => {
   // When local storage changes, dump the list to
   // the console.
   // console.log(JSON.parse(window.localStorage.getItem('sampleList')));
   let element = document.getElementById("cart-number");
   // localStorage.setItem("numOfItems", 1)
   
   let numOfItems = localStorage.getItem("numOfItems")
   if (numOfItems) {
      element.innerHTML = `<p style="color:white;">${numOfItems}</p>`
   }
 });