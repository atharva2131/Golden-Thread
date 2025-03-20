document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = String(urlParams.get("id"));
    const productType = String(urlParams.get("type"));

    const productDetailsContainer = document.querySelector(".container");

    // Validate product ID and type
    if (!productId || productId === "null" || !productType) {
        productDetailsContainer.innerHTML = `<div class="details-section"><p>Invalid product type or ID.</p></div>`;
        return;
    }

    // API routes for different product types
    const apiRoutes = {
        bridalwear: "http://localhost:5000/api/bridalwear",
        blazers: "http://localhost:5000/api/blazers",
        jackets: "http://localhost:5000/api/jackets",
        kurta: "http://localhost:5000/api/kurtas",
        sherwani: "http://localhost:5000/api/sherwani",
        coordset: "http://localhost:5000/api/coordset",
        sarees: "http://localhost:5000/api/sarees",
        lehenga: "http://localhost:5000/api/lehengas",
    };

    const apiEndpoint = apiRoutes[productType];
    if (!apiEndpoint) {
        productDetailsContainer.innerHTML = `<div class="details-section"><p>Invalid product type.</p></div>`;
        return;
    }

    // Display loading message
    productDetailsContainer.innerHTML = `<div class="details-section"><p>Loading product details...</p></div>`;

    try {
        const response = await fetch(`${apiEndpoint}/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const product = await response.json();
        if (product) {
            // Hardcoded color and size options
            const colors = ["Red", "Blue", "Green", "Black"];
            const sizes = ["S", "M", "L", "XL", "XXL"];

            // Render color options
            const colorsHtml = colors.map(color => `
                <div class="circle-option">
                    <input type="radio" name="color" id="color-${color}" value="${color}">
                    <label for="color-${color}" style="background-color: ${color.toLowerCase()};"></label>
                </div>
            `).join('');

            // Render size options
            const sizesHtml = sizes.map(size => `
                <div class="circle-option">
                    <input type="radio" name="size" id="size-${size}" value="${size}">
                    <label for="size-${size}" class="size-label">${size}</label>
                </div>
            `).join('');

            // Render product details
            const productDetailsHtml = `
                <div class="image-section">
                    <img src="${product.image || '/uploads/default-placeholder.jpg'}" alt="${product.name || 'Product Image'}">
                </div>
                <div class="details-section">
                    <h1>${product.name || 'Unnamed Product'}</h1>
                    <p>${product.description || 'No description available.'}</p>

                    <!-- Color Selection -->
                    <div class="selection-group">
                        <h3>Choose Color:</h3>
                        <div class="circle-options-container">${colorsHtml}</div>
                    </div>

                    <!-- Size Selection -->
                    <div class="selection-group">
                        <h3>Choose Size:</h3>
                        <div class="circle-options-container">${sizesHtml}</div>
                    </div>

                    <!-- Price -->
                    <div class="price">
                        ${product.price ? `&#8377;${parseFloat(String(product.price).replace(/[^\d.-]/g, "")).toLocaleString()}` : 'Price unavailable'}
                    </div>
                    <div class="taxes">
                    MRP Inclusive of all taxes
                    </div>



                    <!-- Add to Cart Button -->
                    <div class="add-to-cart">
                        <button type="button" id="add-to-cart-btn">Add to Cart</button>
                    </div>

                    <div>
                        <p>Disclaimer</p>
                        The colour of the product may vary slightly from how it appears here. This may be due to different display settings on various devices and also because of any lighting filters or special effects used during the shoot.
                    </div>
                </div>
            `;
            productDetailsContainer.innerHTML = productDetailsHtml;

            // Add event listener to Add to Cart button
            const addToCartButton = document.getElementById("add-to-cart-btn");

            let isRedirecting = false; // Prevent multiple redirects
            let isToastVisible = false; // Prevent multiple toast messages

            addToCartButton.addEventListener("click", async () => {
                if (isRedirecting || isToastVisible) return; // Prevent further clicks if toast is visible or redirect is active

                const selectedColor = document.querySelector('input[name="color"]:checked')?.value;
                const selectedSize = document.querySelector('input[name="size"]:checked')?.value;

                // Case 1: If color and size are not selected
                if (!selectedColor || !selectedSize) {
                    showToastMessage("Please select both color and size", "error");
                    isToastVisible = true; // Set flag to true to avoid multiple toast messages
                    return;
                }

                // Case 2: If color and size are selected and product is successfully added to the cart
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingProductIndex = cart.findIndex(item => 
                    item.id === product.id && item.color === selectedColor && item.size === selectedSize
                );

                if (existingProductIndex !== -1) {
                    // If product exists, update quantity
                    cart[existingProductIndex].quantity += 1;
                } else {
                    // Otherwise, add new product to cart
                    const cartProduct = {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image || '/uploads/default-placeholder.jpg',
                        color: selectedColor,
                        size: selectedSize,
                        quantity: 1,
                    };
                    cart.push(cartProduct);
                }

                // Update localStorage
                localStorage.setItem("cart", JSON.stringify(cart));

                // Show success toast message and redirect after a delay
                isRedirecting = true; // Ensure redirection happens only once
                showToastMessage("Product added to cart!", "success", () => {
                    window.location.href = "view_cart.html";
                });
            });
        } else {
            productDetailsContainer.innerHTML = `<div class="details-section"><p>Product not found.</p></div>`;
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        productDetailsContainer.innerHTML = ` 
            <div class="details-section">
                <p>Failed to load product details. Please try again later.</p>
                <button onclick="window.location.reload()">Retry</button>
            </div>
        `;
    }
});

// Toast Message Function
const showToastMessage = (message, type, callback) => {
    const toast = document.createElement("div");
    toast.classList.add("toast-message");
    toast.textContent = message;
    
    // Apply styles based on the type (success or error)
    if (type === "error") {
        toast.style.backgroundColor = "red";
    } else if (type === "success") {
        toast.style.backgroundColor = "green";
    }

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
        if (callback) callback(); // Trigger the callback after toast disappears
    }, 3000);
};

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
