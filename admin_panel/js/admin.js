document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        const target = event.target.getAttribute('data-target');
        
        // Hide all sections
        sections.forEach(section => section.classList.add('hidden'));
        
        // Show the target section
        const targetSection = document.getElementById(target);
        targetSection.classList.remove('hidden');
        
        // Highlight the active navigation link
        navLinks.forEach(nav => nav.classList.remove('active'));
        event.target.classList.add('active');
      });
    });
  
    // Variables for category management
    const productDisplayContainer = document.getElementById("product-display-container");
    const productList = document.getElementById("product-list");
    const subcategoryTitle = document.getElementById("subcategory-title");
    let currentCategory = "";  // Track the current category

    const apiEndpoints = {
        sarees: "http://localhost:5000/api/sarees",
        lehengas: "http://localhost:5000/api/lehengas",
        bridalwear: "http://localhost:5000/api/bridalwear",
        coordset: "http://localhost:5000/api/coordset",
        blazers: "http://localhost:5000/api/blazers",
        sherwani: "http://localhost:5000/api/sherwani",
        kurtas: "http://localhost:5000/api/kurtas",  
        jackets: "http://localhost:5000/api/jackets",
    };
  
    const subcategoryButtons = document.querySelectorAll(".subcategory-btn");
    subcategoryButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            currentCategory = e.target.getAttribute("data-type");  // Update currentCategory based on button clicked
            const apiUrl = apiEndpoints[currentCategory];
            if (!apiUrl) {
                console.error(`API URL for subcategory '${currentCategory}' is not defined.`);
                return;
            }
            subcategoryTitle.textContent = `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Products`;
            fetchAndDisplayProducts(apiUrl, currentCategory);
            productDisplayContainer.classList.remove("hidden");
        });
    });

    // Fetch and display products
    async function fetchAndDisplayProducts(apiUrl, category) {
        productList.innerHTML = "<p>Loading products...</p>";
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const products = await response.json();
            renderProducts(products, category);
        } catch (error) {
            console.error("Error fetching products:", error);
            productList.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        }
    }

    function renderProducts(products, category) {
        productList.innerHTML = "";
        if (Array.isArray(products) && products.length > 0) {
            products.forEach((product) => {
                const productItem = createProductHTML(product, category);
                productList.appendChild(productItem);
                addSaveDeleteListeners(productItem, category);
            });
        } else {
            productList.innerHTML = "<p>No products available at the moment.</p>";
        }
    }

    function createProductHTML(product, category) {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.setAttribute("data-product-id", product._id);
        productItem.setAttribute("data-category", category);
    
        let price = parseFloat(product.price);
        const formattedPrice = !isNaN(price) && price > 0
            ? `₹${price.toLocaleString()}`
            : "Price unavailable";
    
        productItem.innerHTML = `
            <img src="${product.image || '/uploads/default-placeholder.jpg'}" alt="${product.name || "Unnamed Product"}" class="product-image" />
            <h3 class="product-name">${product.name || "Unnamed Product"}</h3>
            <p class="price">${formattedPrice}</p>
            <p class="description">${product.description || "No description available."}</p>
            <div class="actions">
                <button class="save-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    
        return productItem;
    }

    function addSaveDeleteListeners(productItem, category) {
        const saveButton = productItem.querySelector(".save-btn");
        const deleteButton = productItem.querySelector(".delete-btn");

        saveButton.addEventListener("click", () => {
            const productId = productItem.getAttribute("data-product-id");
            saveProduct(productId, category);
        });

        deleteButton.addEventListener("click", () => {
            const productId = productItem.getAttribute("data-product-id");
            deleteProduct(productId, category);
        });
    }

    // Show the modal and populate fields
    function saveProduct(productId, category) {
        const productItem = document.querySelector(`[data-product-id="${productId}"]`);
        const currentName = productItem.querySelector(".product-name").textContent;
        const currentPrice = productItem.querySelector(".price").textContent.replace('₹', '').trim();
        const currentDescription = productItem.querySelector(".description").textContent;
    
        const editModal = document.getElementById("edit-product-modal");
        const editNameField = document.getElementById("edit-product-name");
        const editPriceField = document.getElementById("edit-product-price");
        const editDescriptionField = document.getElementById("edit-product-description");
    
        // Populate the modal fields with the current product data
        editNameField.value = currentName;
        editPriceField.value = currentPrice;
        editDescriptionField.value = currentDescription;
    
        // Show the modal by removing the 'hidden' class
        editModal.classList.remove("hidden");
    
        // Close the modal when the cancel button is clicked
        const cancelButton = document.getElementById("cancel-edit-product");  // Corrected ID
        cancelButton.addEventListener("click", () => {
            editModal.classList.add("hidden"); // Close the modal
        });
    
        // Submit form to update the product
        const editProductForm = document.getElementById("edit-product-form");
        editProductForm.onsubmit = async (e) => {
            e.preventDefault();
    
            const updatedDetails = {
                name: editNameField.value,
                price: editPriceField.value,
                description: editDescriptionField.value,
            };
    
            if (!updatedDetails.name || !updatedDetails.price || !updatedDetails.description) {
                alert("All fields are required.");
                return;
            }
    
            const apiUrl = `http://localhost:5000/api/${category}/${productId}`;
    
            try {
                const response = await fetch(apiUrl, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedDetails),
                });
    
                if (!response.ok) throw new Error("Failed to update product.");
    
                const data = await response.json();
                console.log("Product updated:", data);
                alert("Product updated successfully.");
    
                // Refresh the product list for the current category
                fetchAndDisplayProducts(apiEndpoints[category], category);
    
                // Close the modal and reset the form
                editModal.classList.add("hidden");
                editProductForm.reset();
            } catch (error) {
                console.error("Error updating product:", error);
                alert("Failed to update product.");
            }
        };
    }
    



    
    

    function deleteProduct(productId, category) {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const apiUrl = `http://localhost:5000/api/${category}/${productId}`;
        
        fetch(apiUrl, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
            console.log("Product deleted:", data);
            alert("Product deleted successfully.");
            fetchAndDisplayProducts(apiEndpoints[category], category);
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        });
    }

    // Modal for adding product
    const addProductBtn = document.getElementById("add-product-btn");
    const addProductModal = document.getElementById("add-product-modal");
    const cancelAddProductBtn = document.getElementById("cancel-add-product");
    const addProductForm = document.getElementById("add-product-form");

    addProductBtn.addEventListener("click", () => {
        addProductModal.classList.remove("hidden");
    });

    cancelAddProductBtn.addEventListener("click", () => {
        addProductModal.classList.add("hidden");
    });

    addProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const description = document.getElementById("product-description").value;
        const imageFile = document.getElementById("product-image").files[0];

        if (!name || !price || !description || !imageFile) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", imageFile);

        const apiUrl = `http://localhost:5000/api/${currentCategory}`;
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to add product.");

            const data = await response.json();
            console.log("Product added:", data);
            alert("Product added successfully!");

            // Refresh the product list for the current category
            fetchAndDisplayProducts(apiUrl, currentCategory);

            // Hide the modal and reset the form
            addProductModal.classList.add("hidden");
            addProductForm.reset();
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardStats();
});

async function fetchDashboardStats() {
    try {
        const response = await fetch('http://localhost:5000/api/dashboard/dash');
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();

        document.getElementById('total-products').textContent = data.totalProducts;
        document.getElementById('total-orders').textContent = data.totalOrders;
        document.getElementById('total-users').textContent = data.totalUsers;
    } catch (error) {
        console.error('Error:', error);

        document.getElementById('total-products').textContent = 'Error';
        document.getElementById('total-orders').textContent = 'Error';
        document.getElementById('total-users').textContent = 'Error';
    }
}

document.getElementById('general-settings-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const siteName = document.getElementById('site-name').value;
    const siteEmail = document.getElementById('site-email').value;

    if (!siteName || !siteEmail) {
        alert("All fields are required.");
        return;
    }

    // Save settings to the backend (example API call)
    const settingsData = {
        siteName,
        siteEmail,
    };

    try {
        const response = fetch("http://localhost:5000/api/settings/general", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settingsData),
        });

        if (!response.ok) throw new Error("Failed to save settings.");
        alert("General settings saved successfully.");
    } catch (error) {
        console.error("Error saving general settings:", error);
        alert("Failed to save settings.");
    }
});

// Function to handle user roles settings form submission
document.getElementById('user-roles-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const adminRole = document.getElementById('admin-role').value;
    const userRole = document.getElementById('user-role').value;

    if (!adminRole || !userRole) {
        alert("Both roles are required.");
        return;
    }

    // Save roles settings to the backend (example API call)
    const rolesData = {
        adminRole,
        userRole,
    };

    try {
        const response = fetch("http://localhost:5000/api/settings/roles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rolesData),
        });

        if (!response.ok) throw new Error("Failed to save roles.");
        alert("User roles saved successfully.");
    } catch (error) {
        console.error("Error saving user roles:", error);
        alert("Failed to save roles.");
    }
});

// Function to handle password change form submission
document.getElementById('change-password-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    // Save password change to the backend (example API call)
    const passwordData = {
        oldPassword,
        newPassword,
    };

    try {
        const response = fetch("http://localhost:5000/api/settings/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passwordData),
        });

        if (!response.ok) throw new Error("Failed to change password.");
        alert("Password changed successfully.");
    } catch (error) {
        console.error("Error changing password:", error);
        alert("Failed to change password.");
    }
});

// Function to handle notification preferences form submission
document.getElementById('notification-settings-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailNotifications = document.getElementById('email-notifications').checked;
    const smsNotifications = document.getElementById('sms-notifications').checked;

    // Save notification preferences to the backend (example API call)
    const notificationData = {
        emailNotifications,
        smsNotifications,
    };

    try {
        const response = fetch("http://localhost:5000/api/settings/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(notificationData),
        });

        if (!response.ok) throw new Error("Failed to save notification preferences.");
        alert("Notification preferences saved successfully.");
    } catch (error) {
        console.error("Error saving notification preferences:", error);
        alert("Failed to save preferences.");
    }
});


// Get the necessary DOM elements
const logoutSection = document.getElementById('logout');
const confirmLogoutBtn = document.getElementById('confirm-logout');
const cancelLogoutBtn = document.getElementById('cancel-logout');
const loggedOutMessage = document.getElementById('logged-out-message');
const logoutMessage = document.querySelector('.logout-message');

// Show the logout confirmation message
function showLogoutConfirmation() {
    logoutMessage.classList.remove('hidden');
    loggedOutMessage.classList.add('hidden');
}

// Hide the logout confirmation and show the logged out message
function showLoggedOutMessage() {
    logoutMessage.classList.add('hidden');
    loggedOutMessage.classList.remove('hidden');
}

// Handle the confirmation of logout
confirmLogoutBtn.addEventListener('click', async function () {
    try {
        // Call API to logout from the backend (if applicable)
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('Logged out successfully');
            showLoggedOutMessage();

            // Redirect to login page after a brief delay
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Logout failed. Please try again.');
    }
});

// Handle the cancellation of logout
cancelLogoutBtn.addEventListener('click', function () {
    logoutMessage.classList.add('hidden');
    // You can return to the dashboard or the previous page
    window.history.back();
});

// Trigger the logout confirmation dialog when accessing the logout section
showLogoutConfirmation();
    