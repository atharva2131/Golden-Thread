

// Function to fetch all orders
// Function to fetch all orders
// Function to fetch all orders
async function fetchOrders() {
    try {
        // Replace with the actual API endpoint to fetch orders
        const response = await fetch("http://localhost:5000/api/orders");
        const orders = await response.json();

        // Populate orders table
        const ordersList = document.getElementById("orders-list");
        ordersList.innerHTML = ''; // Clear the existing rows

        orders.forEach(order => {
            const row = document.createElement("tr");

            // Extracting data from the API response
            const orderId = order._id || 'N/A'; // Use '_id' for the unique order identifier
            const orderNumber = order.orderNumber || 'N/A'; // Use 'orderNumber' from the API response
            const customerName = order.customer?.name || 'Unknown'; // Safely access 'name' from 'customer'
            const totalAmount = order.totalAmount || 0; // Ensure totalAmount is handled gracefully
            const status = order.status || 'pending'; // Default status if missing

            row.innerHTML = `
                <td>${orderId}</td> <!-- Display the correct order ID -->
                <td>${customerName}</td>
                <td>₹${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td>
                    <span class="status ${status}">${status}</span>
                </td>
                <td>
                    <button class="action-btn approve-btn" onclick="updateOrderStatus('${order._id}', 'approved')">Approve</button>
                    <button class="action-btn reject-btn" onclick="updateOrderStatus('${order._id}', 'rejected')">Reject</button>
                    <button class="action-btn shipped-btn" onclick="updateOrderStatus('${order._id}', 'shipped')">Ship</button>
                </td>
            `;

            ordersList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to load orders.");
    }
}



// Function to filter orders based on search input
function filterOrders() {
    const searchTerm = document.getElementById("order-search").value.toLowerCase();
    const rows = document.querySelectorAll("#orders-list tr");

    rows.forEach(row => {
        const orderId = row.querySelector("td").textContent.toLowerCase();
        if (orderId.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to update the status of an order
async function updateOrderStatus(orderId, status) {
    try {
        const apiUrl = `http://localhost:5000/api/orders/${orderId}`;
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        if (!response.ok) throw new Error("Failed to update order status.");

        // Re-fetch orders after updating status
        fetchOrders();
    } catch (error) {
        console.error("Error updating order status:", error);
        alert("Failed to update order status.");
    }
}

// Load orders on page load
window.onload = fetchOrders;
