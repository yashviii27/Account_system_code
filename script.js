let entries = [];

function addEntry() {
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details!");
    return;
  }

  entries.push({ type, name, amount });
  renderTable();
  clearForm();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  let totalCredit = 0,
    totalDebit = 0;

  // Show or hide "Actions" column
  const actionsHeader = document.getElementById("actionsHeader");
  if (entries.length === 0) {
    actionsHeader.style.display = "none";
  } else {
    actionsHeader.style.display = "table-cell";
  }

  entries.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.type}</td>
      <td>${entry.name}</td>
      <td>${entry.type === "CR" ? entry.amount : ""}</td>
      <td>${entry.type === "DR" ? entry.amount : ""}</td>
      ${
        entries.length > 0
          ? `
        <td class="actions">
          <button onclick="editEntry(${index})">Edit</button>
          <button onclick="deleteEntry(${index})">Delete</button>
        </td>
      `
          : ""
      }
    `;

    tbody.appendChild(row);

    if (entry.type === "CR") totalCredit += entry.amount;
    else totalDebit += entry.amount;
  });

  // Update totals
  document.getElementById("totalCredit").textContent = totalCredit;
  document.getElementById("totalDebit").textContent = totalDebit;

  // Enable SAVE button only when totals match
  const saveBtn = document.querySelector(".save-btn");
  if (totalCredit === totalDebit && totalCredit !== 0) {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
}

function deleteEntry(index) {
  entries.splice(index, 1);
  renderTable();
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("type").value = entry.type;
  document.getElementById("name").value = entry.name;
  document.getElementById("amount").value = entry.amount;
  deleteEntry(index);
}

// SAVE button action
function saveForm() {
  if (entries.length === 0) {
    alert("No data to save!");
    return;
  }

  alert("Form saved successfully ✅");
}
