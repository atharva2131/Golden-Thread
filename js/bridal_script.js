document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    try {
        // Fetch data from the backend API
        const response = await fetch("http://192.168.29.32:5000/api/bridal_wear");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data
        const products = await response.json();

        // Clear any existing products
        productGrid.innerHTML = "";

        // Check if products exist
        if (products && products.length > 0) {
            products.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.className = "product-item";
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${product.id}`;
                };

                // Use the correct image_url or a default placeholder
                const img = document.createElement('img');
                img.src = product.image_url || "http://192.168.29.32:5000/uploads/default-placeholder.jpg";
                img.alt = product.name;

                // Create the inner HTML structure for the product
                const productInfo = `
                    <div class="product-info">
                        <div class="name">${product.name}</div>
                        <div class="price">&#8377;${product.price.toLocaleString()}</div>
                    </div>
                `;

                productItem.innerHTML = productInfo;
                productItem.insertBefore(img, productItem.firstChild); // Insert image at the beginning of the product item
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
    