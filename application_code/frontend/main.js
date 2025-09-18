// Register student
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    course: document.getElementById("course").value,
  };

  await fetch(CONFIG.API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  alert("Student registered successfully!");
});

// Fetch students
async function loadStudents() {
  const response = await fetch(CONFIG.API_BASE_URL);
  const students = await response.json();
  const list = document.getElementById("studentList");

  students.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - ${s.email} (${s.course})`;
    list.appendChild(li);
  });
}
if (document.getElementById("studentList")) loadStudents();
