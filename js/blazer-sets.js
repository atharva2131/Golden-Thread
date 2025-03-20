document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    // Display a loading message while waiting for data
    productGrid.innerHTML = "<p>Loading products...</p>";

    try {
        // Fetch data from the backend API for Blazers
        const response = await fetch("http://localhost:5000/api/blazers");

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response from the API
        const products = await response.json();

        // Clear the loading message
        productGrid.innerHTML = "";

        // Initialize an array to store product IDs
        const productIds = [];

        // Define the product type
        const productType = "blazers";

        // Check if products exist and render them
        if (products && products.length > 0) {
            products.forEach((product) => {
                // Use the correct field for the product ID (_id or id)
                const productId = product._id || product.id; // use _id or id based on your data structure

                // Check if productId exists and is valid
                if (productId) {
                    productIds.push(productId);
                } else {
                    console.warn("Product is missing ID:", product);
                }

                const productItem = document.createElement("div");
                productItem.className = "product-item";

                // Set up redirection to product details page on click
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${productId}&type=${productType}`;
                };

                // Create an image element for the product
                const img = document.createElement("img");
                img.src = product.image || "/uploads/default-placeholder.jpg"; // Ensure the fallback is correct
                img.alt = product.name || "Product Image";
                img.classList.add("product-image");

                // Construct product information HTML dynamically
                const productInfo = `
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${product.price ? `&#8377;${Number(product.price).toLocaleString()}` : "Price unavailable"}</div>
                    </div>
                `;

                // Append the image and product info to the product item
                productItem.innerHTML = productInfo;
                productItem.insertBefore(img, productItem.firstChild);

                // Append the product item to the grid
                productGrid.appendChild(productItem);
            });

            // Log the product IDs array to the console
            console.log("Product IDs:", productIds);
        } else {
            // Display a message if no products are available
            productGrid.innerHTML = "<p>No products available at the moment.</p>";
        }
    } catch (error) {
        // Handle any errors and display an error message
        console.error("Error fetching products:", error);
        productGrid.innerHTML = `
            <p>Failed to load products. Please try again later.</p>
            <button onclick="window.location.reload()">Retry</button>
        `;
    }
});

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