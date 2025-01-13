document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerText = "Loading products...";
    productGrid.appendChild(loadingSpinner);

    try {
        // Fetch data from the backend API for Jacket Sets
        const response = await fetch("http://192.168.29.149:5000/api/jacket_sets");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data
        const products = await response.json();
        loadingSpinner.remove();

        // Clear any existing products
        productGrid.innerHTML = "";

        // Check if products exist
        if (Array.isArray(products) && products.length > 0) {
            products.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.className = "product-item";
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${product.id}`;
                };

                productItem.innerHTML = `
                    <img alt="${product.name}" title="${product.name}" src="${product.image_url || '/uploads/default-placeholder.jpg'}" />
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${product.price ? `&#8377;${product.price.toLocaleString()}` : "Price unavailable"}</div>
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
