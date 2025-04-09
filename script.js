// script.js
document.addEventListener("DOMContentLoaded", () => {
  const orgForm = document.getElementById("orgForm");

  const remoteLocation1 = document.getElementById("remoteLocation1");
  const remoteLocation2 = document.getElementById("remoteLocation2");
  const remoteLocation3 = document.getElementById("remoteLocation3");
  const remoteToggle1 = document.getElementById("remoteToggle1");
  const remoteToggle2 = document.getElementById("remoteToggle2");

  const employeeCount = document.getElementById("employeeCount");
  const employeeContainer = document.getElementById("employeeContainer");

  const assetCount = document.getElementById("assetCount");
  const assetContainer = document.getElementById("assetContainer");

  function toggleRemoteLocations() {
    remoteLocation1.style.display = document.getElementById("remoteYes1").checked ? "block" : "none";
    remoteToggle1.style.display = document.getElementById("remoteYes1").checked ? "block" : "none";
    remoteLocation2.style.display = document.getElementById("remoteYes2").checked ? "block" : "none";
    remoteToggle2.style.display = document.getElementById("remoteYes2").checked ? "block" : "none";
    remoteLocation3.style.display = document.getElementById("remoteYes3").checked ? "block" : "none";
  }

  document.querySelectorAll("input[name='remote1']").forEach(el => el.addEventListener("change", toggleRemoteLocations));
  document.querySelectorAll("input[name='remote2']").forEach(el => el.addEventListener("change", toggleRemoteLocations));
  document.querySelectorAll("input[name='remote3']").forEach(el => el.addEventListener("change", toggleRemoteLocations));

  function generateEmployees(count) {
    employeeContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const div = document.createElement("div");
      div.classList.add("employee-block");
      div.innerHTML = `
        <h3>Employee ${i + 1}</h3>
        <input type="text" name="firstName${i}" placeholder="First Name" required>
        <input type="text" name="lastName${i}" placeholder="Last Name" required>
        <input type="email" name="orgEmail${i}" placeholder="Organizational Email">
        <input type="email" name="personalEmail${i}" placeholder="Personal Email" required>
        <input type="text" name="mobile${i}" placeholder="Mobile Number (+xx xxxxxxxxxx)" required>
        <input type="text" name="position${i}" placeholder="Position">
        <select name="status${i}">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select name="location${i}">
          <option value="Headquarters">Headquarters</option>
          <option value="Remote1">Remote Location 1</option>
          <option value="Remote2">Remote Location 2</option>
          <option value="Remote3">Remote Location 3</option>
        </select>
      `;
      employeeContainer.appendChild(div);
    }
  }

  employeeCount.addEventListener("change", () => {
    generateEmployees(parseInt(employeeCount.value));
  });

  function generateAssets(count) {
    assetContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const div = document.createElement("div");
      div.classList.add("asset-block");
      div.innerHTML = `
        <h3>Asset ${i + 1}</h3>
        <select name="deviceType${i}" class="deviceType">
          <option>Anti-Virus</option><option>Others</option><option>Wifi</option><option>Website</option><option>Telephone</option>
          <option>Tablet</option><option>Switch</option><option>Smartphone</option><option>Router</option><option>Peripherals</option>
          <option>Workstation</option><option>UPS</option><option>SSL Certificates</option><option>Server</option><option>Printer</option>
          <option>Networking</option><option>Laptop</option><option>Firewall</option><option>Domain</option><option>Desktop</option>
        </select>
        <input type="text" name="deviceName${i}" placeholder="Name of Device">
        <input type="text" name="serial${i}" placeholder="Serial Number / Product ID">
        <input type="text" name="manufacturer${i}" placeholder="Manufacturer">
        <input type="text" name="model${i}" placeholder="Model">
        <input type="text" name="os${i}" placeholder="Operating System">
        <input type="text" name="internalIP${i}" placeholder="Internal IP Address">
        <input type="text" name="mac${i}" placeholder="MAC Address">
        <select name="locationAsset${i}">
          <option value="Headquarters">Headquarters</option>
          <option value="Remote1">Remote Location 1</option>
          <option value="Remote2">Remote Location 2</option>
          <option value="Remote3">Remote Location 3</option>
        </select>
      `;
      assetContainer.appendChild(div);
    }
  }

  assetCount.addEventListener("change", () => {
    generateAssets(parseInt(assetCount.value));
  });

  orgForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(orgForm);
    const json = Object.fromEntries(data.entries());

    fetch("https://sheetdb.io/api/v1/YOUR_SHEETDB_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: json })
    })
    .then(res => res.json())
    .then(data => {
      alert("Submission Successful!");
      orgForm.reset();
    })
    .catch(err => {
      console.error("Error submitting form", err);
      alert("Submission Failed. Try again later.");
    });
  });
});
