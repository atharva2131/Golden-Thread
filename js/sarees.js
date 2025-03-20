document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");
    
    // Set the product type dynamically
    const productType = "sarees"; // Change this as needed for other product types
    
    // Create and display a loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerText = "Loading products...";
    productGrid.appendChild(loadingSpinner);

    try {
        // Fetch data from the backend API for the specified product type
        const response = await fetch(`http://localhost:5000/api/${productType}`);

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

                // Set up redirection to product details page with type and ID
                const productId = product._id || product.id; // Use _id or id depending on the backend structure
                productItem.onclick = () => {
                    if (productId) {
                        window.location.href = `product_details.html?id=${productId}&type=${productType}`;
                    } else {
                        console.warn("Product missing ID:", product);
                    }
                };

                // Log the product to inspect the price value
                console.log("Product price:", product.price);

                // Handle price parsing and validation
                let price = null;

                if (product.price !== undefined && product.price !== null) {
                    if (typeof product.price === "string") {
                        // Remove any non-numeric characters (e.g., commas, currency symbols)
                        price = parseFloat(product.price.replace(/[^\d.-]/g, ""));
                    } else if (typeof product.price === "number") {
                        price = product.price;
                    }
                }

                // Check if price is valid
                const formattedPrice = price && !isNaN(price) && price > 0
                    ? `&#8377;${Math.round(price).toLocaleString()}`
                    : "Price unavailable";

                // Render product details with fallback image and price
                productItem.innerHTML = `
                    <img alt="${product.name || "Product Image"}" 
                         title="${product.name || "Product Image"}" 
                         src="${product.image || '/uploads/default-placeholder.jpg'}" />
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${formattedPrice}</div>
                    </div>
                `;
                productGrid.appendChild(productItem);
            });
        } else {
            productGrid.innerHTML = "<p>No products available at the moment.</p>";
        }
    } catch (error) {
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
