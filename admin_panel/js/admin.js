function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown if clicked outside
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('profileDropdown');
    const profileMenu = document.querySelector('.profile-menu');
    if (!profileMenu.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function editProduct(button) {
    const productItem = button.closest('.product-item');
    const nameElement = productItem.querySelector('.product-name');
    const priceElement = productItem.querySelector('.price');
    const descriptionElement = productItem.querySelector('.description');

    // If already in edit mode, save the changes
    if (button.textContent === 'Save') {
        const newName = productItem.querySelector('.name-input').value;
        const newPrice = productItem.querySelector('.price-input').value;
        const newDescription = productItem.querySelector('.description-input').value;

        nameElement.textContent = newName;
        priceElement.textContent = `$${newPrice}`;
        descriptionElement.textContent = newDescription;

        // Change button text back to Edit
        button.textContent = 'Edit';
    } else {
        // Switch to edit mode
        const currentName = nameElement.textContent;
        const currentPrice = priceElement.textContent.replace('$', '');
        const currentDescription = descriptionElement.textContent;

        nameElement.innerHTML = `<input class="name-input" type="text" value="${currentName}" />`;
        priceElement.innerHTML = `<input class="price-input" type="number" value="${currentPrice}" />`;
        descriptionElement.innerHTML = `<input class="description-input" type="text" value="${currentDescription}" />`;

        // Change button text to Save
        button.textContent = 'Save';
    }
}

// Function to delete a product
function deleteProduct(button) {
    const productItem = button.closest('.product-item');
    productItem.remove(); // Remove the product item from the DOM
}

function addProduct(sectionId) {
    alert('Add product functionality to be implemented for section: ' + sectionId);
}

function addCategory(section) {
    alert('Add category functionality to be implemented for section: ' + section);
}


// Function to edit user information
function editUser (button) { 
    const userItem = button.closest('.user-item');
    const nameElement = userItem.querySelector('h3');
    const emailElement = userItem.querySelector('p:nth-of-type(1)');

    // Store current values
    const currentName = nameElement.textContent;
    const currentEmail = emailElement.textContent.replace('Email: ', '');

    // Create input fields for editing
    nameElement.innerHTML = `<input type="text" value="${currentName}" />`;
    emailElement.innerHTML = `<input type="text" value="${currentEmail}" />`;

    // Change button text to "Save"
    button.textContent = 'Save';
    button.setAttribute('onclick', 'updateUser (this)');
}

// Function to update user information


// Function to delete a user
function deleteUser(button) {
    const userItem = button.closest('.user-item');
    userItem.remove(); // Remove the user item from the DOM
}

function editOrder(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    // Store current values
    const currentOrderId = cells[0].textContent;
    const currentCustomerName = cells[1].textContent;
    const currentProduct = cells[2].textContent;
    const currentQuantity = cells[3].textContent;
    const currentTotalPrice = cells[4].textContent.replace('$', '');
    const currentStatus = cells[5].textContent;

    // Create input fields for editing
    cells[1].innerHTML = `<input type="text" value="${currentCustomerName}" />`;
    cells[2].innerHTML = `<input type="text" value="${currentProduct}" />`;
    cells[3].innerHTML = `<input type="number" value="${currentQuantity}" />`;
    cells[4].innerHTML = `<input type="text" value="${currentTotalPrice}" />`;
    cells[5].innerHTML = `<input type="text" value="${currentStatus}" />`;

    // Change button text to "Save"
    button.textContent = 'Save';
    button.setAttribute('onclick', 'updateOrder(this)');
    
    // Hide the delete button
    const deleteButton = row.querySelector('button[onclick="deleteOrder(this)"]');
    deleteButton.style.display = 'none';
}

// Function to update order information
function updateOrder(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    // Update the order information
    const newCustomerName = cells[1].querySelector('input[type="text"]').value;
    const newProduct = cells[2].querySelector('input[type="text"]').value;
    const newQuantity = cells[3].querySelector('input[type="number"]').value;
    const newTotalPrice = cells[4].querySelector('input[type="text"]').value;
    const newStatus = cells[5].querySelector('input[type="text"]').value;

    cells[1].textContent = newCustomerName;
    cells[2].textContent = newProduct;
    cells[3].textContent = newQuantity;
    cells[4].textContent = `$${newTotalPrice}`;
    cells[5].textContent = newStatus;

    // Change button text back to "Edit"
    button.textContent = 'Edit';
    button.setAttribute('onclick', 'editOrder(this)');

    // Show the delete button again
    const deleteButton = row.querySelector('button[onclick="deleteOrder(this)"]');
    deleteButton.style.display = 'inline-block';
}

// Function to delete an order
function deleteOrder(button) {
    const row = button.closest('tr');
    row.remove(); // Remove the order row from the DOM
}

function addCategory(type) {
    // Get the category list element
    const categoryList = document.getElementById('categories');

    // Create a new list item
    const newCategoryItem = document.createElement('li');

    // Create a prompt to get the category name from the user
    const categoryName = prompt(`Enter the name for the new ${type} category:`);

    // Check if the user entered a category name
    if (categoryName) {
        // Set the text of the new list item
        newCategoryItem.textContent = `${categoryName} (${type})`;

        // Append the new category item to the category list
        categoryList.appendChild(newCategoryItem);
    } else {
        alert('Category name cannot be empty.');
    }
}

settingsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const siteTitle = document.getElementById('siteTitle').value;
    const siteDescription = document.getElementById('siteDescription').value;
    localStorage.setItem('siteTitle', siteTitle);
    localStorage.setItem('siteDescription', siteDescription);
    alert(`Settings Saved:\nTitle: ${siteTitle}\nDescription: ${siteDescription}`);
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('siteTitle').value = localStorage.getItem('siteTitle') || '';
    document.getElementById('siteDescription').value = localStorage.getItem('siteDescription') || '';
});
function confirmDelete(action, item) {
    if (confirm(`Are you sure you want to delete this ${item}?`)) {
        action();
    }
}
function validatePositiveNumber(value, fieldName) {
    if (isNaN(value) || value < 0) {
        alert(`${fieldName} must be a positive number.`);
        return false;
    }
    return true;
}
// Function to show the dashboard content
function showDashboardSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the dashboard section
    const dashboardSection = document.getElementById(sectionId);
    if (dashboardSection) {
        dashboardSection.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");

    // Display a loading message while waiting for data
    productGrid.innerHTML = "<p>Loading products...</p>";

    try {
        // Fetch data from the backend API for Blazer Sets
        const response = await fetch("http://192.168.29.149:5000/api/blazer_sets");

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
                const productItem = document.createElement("div");
                productItem.className = "product-item";

                // Set up redirection to product details page on click
                productItem.onclick = () => {
                    window.location.href = `product_details.html?id=${product._id}`;
                };

                // Create an image element for the product
                const img = document.createElement("img");
                img.src = product.image_url || "/uploads/default-placeholder.jpg"; // Ensure the fallback is correct
                img.alt = product.name || "Product Image";
                img.classList.add("product-image");

                // Construct product information HTML dynamically
                const productInfo = `
                    <div class="product-info">
                        <div class="name">${product.name || "Unnamed Product"}</div>
                        <div class="price">${product.price ? `&#8377;${Number(product.price).toLocaleString()}` : "Price unavailable"}</div>
                    </div>
                `;

                // Create admin action buttons (Edit, Delete)
                const adminActions = `
                    <div class="admin-actions">
                        <button class="edit-btn" onclick="editProduct('${product._id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
                    </div>
                `;

                // Append the image, product info, and admin actions to the product item
                productItem.innerHTML = productInfo + adminActions;
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

// Admin Edit Function
function editProduct(productId) {
    alert(`Edit product with ID: ${productId}`);
    // Here you can add your logic for editing a product, such as redirecting to an edit page
    window.location.href = `edit_product.html?id=${productId}`;
}

// Admin Delete Function
async function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            const response = await fetch(`http://192.168.29.149:5000/api/blazer_sets/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete product: ${response.status}`);
            }

            alert("Product deleted successfully!");
            window.location.reload(); // Reload the page to reflect the changes
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    }
}
