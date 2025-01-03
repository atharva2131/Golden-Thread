document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("loading-spinner");
    loadingSpinner.innerText = "Loading products...";
    productGrid.appendChild(loadingSpinner);

    try {
        // Fetch data from the backend API for Blazer Sets
        const response = await fetch("http://192.168.29.32:5000/api/blazer_sets");

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
                    <img alt="${product.name}" title="${product.name}" src="${product.image}" />
                    <div class="product-info">
                        <div class="name">${product.name}</div>
                        <div class="price">&#8377;${product.price.toLocaleString()}</div>
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
