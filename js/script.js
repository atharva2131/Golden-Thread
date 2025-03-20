// On view_cart.html page
document.addEventListener("DOMContentLoaded", function() {
  const productDetails = JSON.parse(localStorage.getItem('productDetails'));

  if (productDetails) {
      const cartContainer = document.querySelector(".cart-container");

      const cartHtml = `
          <div class="cart-item">
              <img src="${productDetails.image || '/uploads/default-placeholder.jpg'}" alt="${productDetails.name || 'Product Image'}">
              <div class="cart-details">
                  <h2>${productDetails.name || 'Unnamed Product'}</h2>
                  <p>${productDetails.description || 'No description available.'}</p>
                  <div class="price">Price: &#8377;${parseFloat(String(productDetails.price).replace(/[^\d.-]/g, "")).toLocaleString()}</div>
              </div>
          </div>
      `;
      
      
  }
});
  
// This function is responsible for adding items to the cart.
function addToCart(item) {
  // Get the existing cart items from localStorage or initialize as an empty array.
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if the item already exists in the cart (if not, add it).
  const itemExists = cartItems.some(cartItem => cartItem.id === item.id);

  if (!itemExists) {
      cartItems.push(item);
      // Save the updated cart back to localStorage.
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // After adding, update the cart count
  updateCartCount();
}

// This function updates the cart count on the page.
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  
  if (cartCountElement) {
      // Update the cart count with the number of items in the cart
      cartCountElement.textContent = cart.length;
  }
}


// Call this function on page load to ensure the cart count is accurate.
document.addEventListener('DOMContentLoaded', function () {
  updateCartCount(); // This will update the cart count on page load
});


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
