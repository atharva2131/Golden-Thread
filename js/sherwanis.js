document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    // Create and display a loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerText = "Loading products...";
    productGrid.appendChild(loadingSpinner);

    try {
        // Fetch data from the backend API for Sherwanis
        const response = await fetch("http://localhost:5000/api/sherwani");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const products = await response.json();

        // Remove the loading spinner after data is fetched
        loadingSpinner.remove();

        // Clear any existing products
        productGrid.innerHTML = "";

        // Check if products exist
        if (Array.isArray(products) && products.length > 0) {
            products.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.className = "product-item";

                // Set up redirection to the product details page, passing the type dynamically
                const productType = "sherwani"; // You can customize this if needed
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${product._id}&type=${productType}`;
                };

                // Debug: Log the product data to ensure price is correct
                console.log("Product Data:", product);

                // Ensure the price is a valid number and format it correctly
                let price = product.price;

                // If the price is a string, remove non-numeric characters
                if (typeof price === "string") {
                    price = parseFloat(price.replace(/[^\d.-]/g, ""));
                }

                // Log the parsed price to debug NaN issues
                console.log("Parsed Price:", price);

                // If price is valid, format it; otherwise, display "Price unavailable"
                const formattedPrice = isNaN(price) || price <= 0 ? "Price unavailable" : `&#8377;${price.toLocaleString()}`;

                // Render product details with fallback image and formatted price
                productItem.innerHTML = `
                    <img 
                        alt="${product.name || "Unnamed Product"}" 
                        title="${product.name || "Unnamed Product"}" 
                        src="${product.image || '/uploads/default-placeholder.jpg'}" 
                        class="product-image"
                    />
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${formattedPrice}</div>
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
