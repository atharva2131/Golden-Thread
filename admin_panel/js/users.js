// Event listener for sidebar link clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Hide all content sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.add('hidden'));

        // Show the corresponding section
        const target = this.getAttribute('data-target');
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.remove('hidden');

            // If the "users" section is clicked, fetch the users data
            if (target === 'users') {
                fetchUsers();  // Fetch and display users
            }
        }
    });
});

// Updated fetchUsers function to populate users table
async function fetchUsers() {
    try {
        const response = await fetch("http://localhost:5000/api/user");
        const users = await response.json();

        console.log("Users response:", users);

        if (!Array.isArray(users)) {
            console.error("Invalid data format received.");
            alert("Failed to load users.");
            return;
        }

        const usersList = document.getElementById("users-list");
        usersList.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const userId = user._id || "N/A";
            const username = user.name || "Unknown";
            const email = user.email || "No email provided";
            const mobilenumber = user.mobilenumber || "No phone number provided";
            const address = user.address || "No address provided";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${userId}</td>
                <td>${username}</td>
                <td>${email}</td>
                <td>${mobilenumber}</td>
                <td>${address}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="deleteUser('${userId}')">Delete</button>
                </td>
            `;
            usersList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
    }
}

// Function to delete a user
async function deleteUser(userId) {
    try {
        const apiUrl = `http://localhost:5000/api/user/${userId}`;
        const response = await fetch(apiUrl, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete user.");

        fetchUsers();  // Refresh the user list after deletion
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
    }
}

// Function to filter users based on search input
function filterUsers() {
    const searchTerm = document.getElementById("user-search").value.toLowerCase();
    const rows = document.querySelectorAll("#users-list tr");

    rows.forEach(row => {
        const username = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        if (username.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
