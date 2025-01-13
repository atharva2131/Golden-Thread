document.addEventListener("DOMContentLoaded", async () => {
    const productDetailsContainer = document.querySelector(".product-details");

    // Extract the product ID from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        productDetailsContainer.innerHTML = "<p>Invalid product. No ID provided.</p>";
        return;
    }

    try {
        // Display a loading message
        productDetailsContainer.innerHTML = "<p>Loading product details...</p>";

        // Fetch product details from the backend API using the correct ID
        const response = await fetch(`http://192.168.29.149:5000/api/blazerset_detail/677dfe37a4c6d8ca92ce98d1/${productId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }

        const product = await response.json();

        // Clear the loading message
        productDetailsContainer.innerHTML = "";

        // Construct the product details
        const productDetailsHTML = `
            <div class="product-detail-item">
                <img src="${product.image_url || "/uploads/default-placeholder.jpg"}" alt="${product.name || "Product Image"}" />
                <h1 class="product-name">${product.name || "Unnamed Product"}</h1>
                <p class="product-price">${product.price ? `&#8377;${parseInt(product.price).toLocaleString()}` : "Price unavailable"}</p>
                <p class="product-description">${product.description || "No description available."}</p>
            </div>
        `;

        productDetailsContainer.innerHTML = productDetailsHTML;
    } catch (error) {
        console.error("Error fetching product details:", error);
        productDetailsContainer.innerHTML = `<p>Failed to load product details. Error: ${error.message}</p>`;
    }
});
