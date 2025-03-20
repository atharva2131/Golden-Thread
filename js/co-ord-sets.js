document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    // Display a loading message while waiting for data
    productGrid.innerHTML = "<p>Loading products...</p>";

    try {
        // Fetch data from the backend API for CO-ORD Sets
        const response = await fetch("http://localhost:5000/api/coordset");

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response from the API
        const products = await response.json();

        // Clear the loading message
        productGrid.innerHTML = "";

        // Check if products exist and render them
        if (products && products.length > 0) {
            products.forEach((product) => {
                // Use the correct field for the product ID (_id or id)
                const productId = product._id || product.id;

                // Skip rendering products without a valid ID and log a warning
                if (!productId) {
                    console.warn("Product is missing ID:", product);
                    return;
                }

                const productItem = document.createElement("div");
                productItem.className = "product-item";

                // Set up redirection to the product details page on click, including the type
                const productType = "coordset"; // Set the type dynamically
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${productId}&type=${productType}`;
                };

                // Create an image element for the product
                const img = document.createElement("img");
                img.src = product.image || "/uploads/default-placeholder.jpg"; // Ensure the fallback is correct
                img.alt = product.name || "Product Image";
                img.classList.add("product-image");

                // Ensure the price is a valid number and format it correctly
                let price = parseFloat(product.price);
                if (typeof product.price === "string") {
                    // Remove any non-numeric characters (e.g., currency symbols)
                    price = parseFloat(product.price.replace(/[^\d.-]/g, ""));
                }

                // Format the price or provide a fallback message
                const formattedPrice =
                    isNaN(price) || price <= 0
                        ? "Price unavailable"
                        : `&#8377;${price.toLocaleString()}`;

                // Construct product information HTML dynamically
                const productInfo = `
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${formattedPrice}</div>
                    </div>
                `;

                // Append the image and product info to the product item
                productItem.innerHTML = productInfo;
                productItem.insertBefore(img, productItem.firstChild);

                // Append the product item to the grid
                productGrid.appendChild(productItem);
            });
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
