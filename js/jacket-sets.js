document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    // Create and append a loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerText = "Loading products...";
    productGrid.appendChild(loadingSpinner);

    try {
        // Fetch all data from the "jackets" collection
        const response = await fetch("http://localhost:5000/api/jackets");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const products = await response.json();
        loadingSpinner.remove(); // Remove loading spinner once data is fetched

        // Clear any existing products
        productGrid.innerHTML = "";

        // Check if products exist and display them
        if (Array.isArray(products) && products.length > 0) {
            products.forEach((product) => {
                const productId = product._id || product.id; // Ensure correct ID field
                const productType = "jackets"; // Product type for redirect

                const productItem = document.createElement("div");
                productItem.className = "product-item";
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${productId}&type=${productType}`;
                };

                // Construct product HTML with dynamic data
                productItem.innerHTML = `
                    <img alt="${product.name}" title="${product.name}" src="${product.image || '/uploads/default-placeholder.jpg'}" />
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${product.price ? `&#8377;${product.price.toLocaleString()}` : "Price unavailable"}</div>
                    </div>
                `;

                // Append the product item to the grid
                productGrid.appendChild(productItem);
            });
        } else {
            // Display a message if no products are available
            productGrid.innerHTML = "<p>No products available at the moment.</p>";
        }
    } catch (error) {
        // Handle errors and show error message
        console.error("Error fetching products:", error);
        productGrid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
});

// Function to update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount(); // Updates the cart count
});
