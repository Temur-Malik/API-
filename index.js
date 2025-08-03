const API_URL = "http://localhost:3000/users"; 

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const ageInput = document.getElementById("age");
const countryInput = document.getElementById("country");
const birthdateInput = document.getElementById("birthdate");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("eventTableBody");

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

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  loadUsers();
  nameInput.value = "";
  surnameInput.value = "";
  ageInput.value = "";
  countryInput.value = "";
  birthdateInput.value = "";
});

loadUsers();

