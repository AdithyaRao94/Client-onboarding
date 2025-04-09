// script.js

// Gradient background animation (optional)
// You can add more logic here if needed for smooth transitions or other effects

document.addEventListener("DOMContentLoaded", () => {
  // Organization Section
  const remoteToggle = document.getElementById("remoteToggle");
  const remoteLocations = document.getElementById("remoteLocations");

  remoteToggle.addEventListener("change", (e) => {
    if (e.target.value === "Yes") {
      remoteLocations.style.display = "block";
    } else {
      remoteLocations.style.display = "none";
    }
  });

  // Add employee rows dynamically
  const employeeCount = document.getElementById("employeeCount");
  const employeeSection = document.getElementById("employeeDetails");

  employeeCount.addEventListener("change", () => {
    const count = parseInt(employeeCount.value);
    employeeSection.innerHTML = "";

    for (let i = 1; i <= count; i++) {
      const div = document.createElement("div");
      div.className = "employee-entry p-4 mb-4 bg-white rounded-lg shadow";
      div.innerHTML = `
        <h3 class="text-lg font-semibold mb-2">Employee ${i}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName${i}" placeholder="First Name" required class="input" />
          <input type="text" name="lastName${i}" placeholder="Last Name" required class="input" />
          <input type="email" name="orgEmail${i}" placeholder="Organizational Email" class="input" />
          <input type="email" name="personalEmail${i}" placeholder="Personal Email" required class="input" />
          <input type="text" name="mobile${i}" placeholder="Mobile Number" class="input" />
          <input type="text" name="position${i}" placeholder="Position" class="input" />
          <select name="status${i}" class="input">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select name="location${i}" class="input">
            <!-- Populate with Org Locations -->
            <option value="HQ">Headquarters</option>
            <option value="Remote 1">Remote 1</option>
            <option value="Remote 2">Remote 2</option>
            <option value="Remote 3">Remote 3</option>
          </select>
        </div>
      `;
      employeeSection.appendChild(div);
    }
  });

  // Submit form to SheetDB API
  const form = document.getElementById("onboardingForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const res = await fetch("https://sheetdb.io/api/v1/YOUR_SHEETDB_API_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [jsonData] }),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        form.reset();
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  });
});
