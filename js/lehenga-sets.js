document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    // Add a loading spinner while fetching data
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerText = "Loading products...";
    productGrid.appendChild(loadingSpinner);

    try {
        // Fetch data from the backend API for Lehengas
        const response = await fetch("http://localhost:5000/api/lehengas");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const products = await response.json();

        // Remove the loading spinner
        loadingSpinner.remove();

        // Clear any existing content in the grid
        productGrid.innerHTML = "";

        // Check if products exist and render them
        if (Array.isArray(products) && products.length > 0) {
            products.forEach((product) => {
                const productId = product._id || product.id;

                // Skip invalid products and log a warning
                if (!productId) {
                    console.warn("Product missing ID:", product);
                    return;
                }

                const productItem = document.createElement("div");
                productItem.className = "product-item";

                // Set up redirection to product details page, including product type
                const productType = "lehenga"; // Define the product type dynamically
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${productId}&type=${productType}`;
                };

                // Construct the product item HTML
                productItem.innerHTML = `
                    <img 
                        alt="${product.name || "Product Image"}" 
                        title="${product.name || "Product Image"}" 
                        src="${product.image || "/uploads/default-placeholder.jpg"}" 
                        class="product-image"
                    />
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">
                            ${product.price ? `&#8377;${parseFloat(product.price).toLocaleString()}` : "Price unavailable"}
                        </div>
                    </div>
                `;

                // Append the product item to the grid
                productGrid.appendChild(productItem);
            });
        } else {
            // Display a fallback message if no products are available
            productGrid.innerHTML = "<p>No products available at the moment.</p>";
        }
    } catch (error) {
        // Handle errors and display an error message
        console.error("Error fetching products:", error);
        productGrid.innerHTML = `
            <p>Failed to load products. Please try again later.</p>
            <button onclick="window.location.reload()">Retry</button>
        `;
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
