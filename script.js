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

