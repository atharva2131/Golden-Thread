document.addEventListener('DOMContentLoaded', function () {
    // Cart functionality
    const cartCount = document.querySelector('.cart sup');
    
    // Get cart count from localStorage
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    // cartCount.textContent = count; // Update cart count in the header
  
    // Search functionality
    const searchInput = document.getElementById('search');
    const productCards = document.querySelectorAll('.product-card');
  
    // searchInput.addEventListener('input', () => {
    //   const filter = searchInput.value.toLowerCase();
    //   productCards.forEach(card => {
    //     const title = card.getAttribute('data-title').toLowerCase();
    //     card.style.display = title.includes(filter) ? 'block' : 'none';
    //   });
    // });
  
    // Add to Cart Button (for demonstration)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));
        addToCart(productName, productPrice);
      });
    });
  });
  
  // Add item to cart
  function addToCart(name, price, imgSrc) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Create a new item object
    const newItem = {
      name: name,
      price: price,
      imgSrc: imgSrc,
      quantity: 1,
    };
  
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === name);
  
    if (existingItemIndex > -1) {
      // Item already exists, increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to the cart
      cart.push(newItem);
    }
  
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
  }
  
  // Display cart items on cart page
  function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');  // Make sure this element exists in your cart page
  
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
  
  // Clear cart (optional)
  function clearCart() {
    localStorage.removeItem('cart');
    alert("Your cart has been cleared!");
    displayCart();
  }
  
  // Function to update the cart count displayed in the header
  function updateCartCount(cart) {
    const cartCount = document.querySelector('.cart sup');
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalCount;
    localStorage.setItem('cartCount', totalCount);
  }
  
  // Slideshow functionality
  let slideIndex = 0;
  function showSlides(n) {
    const slides = document.querySelectorAll(".slide");
    
    // Check if slides array is non-empty
    if (slides.length === 0) {
      console.error("No slides found.");
      return; // Exit early if no slides are found
    }
  
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
  
    // Hide all slides
    slides.forEach(slide => slide.classList.remove("active"));
    
    // Show the current slide
    if (slides[slideIndex]) {  // Ensure slide exists before modifying
      slides[slideIndex].classList.add("active");
    }
  }
  
  
  function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
    resetTimer();
  }
  
  let timer = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 3000);
  
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      slideIndex++;
      showSlides(slideIndex);
    }, 3000);
  }
  
  showSlides(slideIndex);
  