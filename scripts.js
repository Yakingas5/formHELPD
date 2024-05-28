document.addEventListener("DOMContentLoaded", function() {
    const adminCredentials = { username: "admin", password: "admin123" };
    const users = [];
    let editIndex = null;

    const loginForm = document.getElementById("login-form");
    const userForm = document.getElementById("user-form");
    const adminSection = document.getElementById("admin-section");
    const userList = document.getElementById("user-list");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            document.getElementById("login-section").style.display = "none";
            adminSection.style.display = "block";
            renderUserList();
        } else {
            alert("Invalid credentials!");
        }
    });

    userForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (editIndex === null) {
            users.push({ id: users.length + 1, name, email });
        } else {
            users[editIndex] = { ...users[editIndex], name, email };
            editIndex = null;
        }

        userForm.reset();
        renderUserList();
    });

    function renderUserList() {
        userList.innerHTML = users.map((user, index) => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="actions">
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `).join("");
    }

    window.editUser = function(index) {
        editIndex = index;
        const user = users[index];
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
    }

    window.deleteUser = function(index) {
        users.splice(index, 1);
        renderUserList();
    }
});
