const API_URL = "http://localhost:3000/users";

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const ageInput = document.getElementById("age");
const countryInput = document.getElementById("country");
const birthdateInput = document.getElementById("birthdate");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("eventTableBody");

let editingUserId = null;

async function loadUsers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderUsers(data);
}

function renderUsers(users) {
  tableBody.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.surname}</td>
      <td>${user.age}</td>
      <td>${user.country}</td>
      <td>${user.birthdate}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editUser(${user.id})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

addBtn.addEventListener("click", async () => {
  const user = {
    name: nameInput.value,
    surname: surnameInput.value,
    age: ageInput.value,
    country: countryInput.value,
    birthdate: birthdateInput.value,
  };

  if (editingUserId) {
    await fetch(`${API_URL}/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    editingUserId = null;
    addBtn.textContent = "Add User";
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  clearForm();
  loadUsers();
});

function editUser(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(user => {
      nameInput.value = user.name;
      surnameInput.value = user.surname;
      ageInput.value = user.age;
      countryInput.value = user.country;
      birthdateInput.value = user.birthdate;
      editingUserId = id;
      addBtn.textContent = "Save Changes";
    });
}

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadUsers();
  }
}

function clearForm() {
  nameInput.value = "";
  surnameInput.value = "";
  ageInput.value = "";
  countryInput.value = "";
  birthdateInput.value = "";
}

loadUsers();
