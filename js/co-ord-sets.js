document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    try {
        // Display a loading message
        productGrid.innerHTML = "<p>Loading products...</p>";

        // Fetch data from the backend API for CO-ORD Sets
        const response = await fetch("http://192.168.29.149:5000/api/coord_sets");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();

        productGrid.innerHTML = ""; // Clear the loading message

        if (products && products.length > 0) {
            products.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.className = "product-item";
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${product.id}`;
                };

                const img = document.createElement("img");
                img.src = product.image_url || "/uploads/default-placeholder.jpg";
                img.alt = product.name || "Product Image";

                const productInfo = `
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${product.price ? `&#8377;${product.price.toLocaleString()}` : "Price unavailable"}</div>
                    </div>
                `;

                productItem.innerHTML = productInfo;
                productItem.insertBefore(img, productItem.firstChild);
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
