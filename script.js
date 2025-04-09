document.addEventListener("DOMContentLoaded", () => {
  const hasRemote = document.getElementById("hasRemote");
  const moreRemote1 = document.getElementById("moreRemote1");
  const moreRemote2 = document.getElementById("moreRemote2");
  const remote1 = document.getElementById("remote1");
  const remote2 = document.getElementById("remote2");
  const remote3 = document.getElementById("remote3");
  const employeeCount = document.getElementById("employeeCount");
  const employeeContainer = document.getElementById("employeeContainer");
  const assetContainer = document.getElementById("assetContainer");
  const addAssetBtn = document.getElementById("addAssetBtn");

  const orgLocations = [];
  const contacts = [];

  function toggleVisibility(selector, visible) {
    document.getElementById(selector).classList.toggle("hidden", !visible);
  }

  hasRemote.addEventListener("change", () => {
    toggleVisibility("remote1", hasRemote.value === "Yes");
  });

  moreRemote1.addEventListener("change", () => {
    toggleVisibility("remote2", moreRemote1.value === "Yes");
  });

  moreRemote2.addEventListener("change", () => {
    toggleVisibility("remote3", moreRemote2.value === "Yes");
  });

  employeeCount.addEventListener("change", () => {
    const count = parseInt(employeeCount.value);
    employeeContainer.innerHTML = "";
    contacts.length = 0;
    for (let i = 1; i <= count; i++) {
      const section = document.createElement("div");
      section.classList.add("form-section");
      section.innerHTML = `
        <h3>Employee ${i}</h3>
        <div class="input-group"><label>First Name</label><input type="text" name="emp${i}First" required></div>
        <div class="input-group"><label>Last Name</label><input type="text" name="emp${i}Last" required></div>
        <div class="input-group"><label>Org Email</label><input type="email" name="emp${i}OrgEmail"></div>
        <div class="input-group"><label>Personal Email</label><input type="email" name="emp${i}Personal" required></div>
        <div class="input-group"><label>Mobile Number</label><input type="tel" name="emp${i}Mobile" pattern="\\+\\d{2} \\d{10}"></div>
        <div class="input-group"><label>Position</label><input type="text" name="emp${i}Position"></div>
        <div class="input-group"><label>Status</label><select name="emp${i}Status"><option>Active</option><option>Inactive</option></select></div>
        <div class="input-group"><label>Location</label><input type="text" name="emp${i}Location"></div>
      `;
      employeeContainer.appendChild(section);
      contacts.push({ name: `Employee ${i}`, email: `emp${i}Personal` });
    }
  });

  addAssetBtn.addEventListener("click", () => {
    const index = assetContainer.children.length + 1;
    const assetDiv = document.createElement("div");
    assetDiv.classList.add("form-section");
    assetDiv.innerHTML = `
      <h3>Asset ${index}</h3>
      <div class="input-group"><label>Device Type</label>
        <select name="asset${index}Type" class="deviceType">
          <option>Anti-Virus</option><option>Others</option><option>Wifi</option><option>Website</option><option>Telephone</option>
          <option>Tablet</option><option>Switch</option><option>Smartphone</option><option>Router</option>
          <option>Peripherals</option><option>Workstation</option><option>UPS</option><option>SSL Certificates</option>
          <option>Server</option><option>Printer</option><option>Networking</option><option>Laptop</option>
          <option>Firewall</option><option>Domain</option><option>Desktop</option>
        </select>
      </div>
      <div class="input-group"><label>Name of Device</label><input type="text" name="asset${index}Name" /></div>
      <div class="input-group"><label>Serial Number / Product ID</label><input type="text" name="asset${index}Serial" /></div>
      <div class="input-group"><label>Manufacturer</label><input type="text" name="asset${index}Manufacturer" /></div>
      <div class="input-group"><label>Model</label><input type="text" name="asset${index}Model" /></div>
      <div class="input-group contact-section hidden">
        <label>Contact</label>
        <select name="asset${index}Contact" class="contactDropdown"></select>
      </div>
      <div class="input-group contact-email hidden"><label>Contact Email-ID</label><input type="email" name="asset${index}ContactEmail" /></div>
      <div class="input-group"><label>Location</label><input type="text" name="asset${index}Location" /></div>
      <div class="input-group os-field hidden"><label>Operating System</label><input type="text" name="asset${index}OS" /></div>
      <div class="input-group ip-field hidden"><label>Internal IP</label><input type="text" name="asset${index}IP" /></div>
      <div class="input-group mac-field hidden"><label>MAC Address</label><input type="text" name="asset${index}MAC" /></div>
    `;
    assetContainer.appendChild(assetDiv);

    const typeSelect = assetDiv.querySelector(".deviceType");
    const contactSection = assetDiv.querySelector(".contact-section");
    const contactEmail = assetDiv.querySelector(".contact-email");
    const osField = assetDiv.querySelector(".os-field");
    const ipField = assetDiv.querySelector(".ip-field");
    const macField = assetDiv.querySelector(".mac-field");

    const contactDropdown = assetDiv.querySelector(".contactDropdown");
    contactDropdown.innerHTML = contacts.map((c, idx) =>
      `<option value="${c.name}">${c.name}</option>`
    ).join('') + `<option value="Others">Others</option>`;

    typeSelect.addEventListener("change", () => {
      const val = typeSelect.value;
      const isComputer = ["Laptop", "Desktop", "Smartphone", "Tablet", "Server"].includes(val);
      const isNetworking = ["Router", "Switch", "Firewall", "Networking", "Wifi"].includes(val);
      contactSection.classList.toggle("hidden", !isComputer);
      contactEmail.classList.toggle("hidden", !isComputer);
      osField.classList.toggle("hidden", !isComputer);
      ipField.classList.toggle("hidden", !isNetworking);
      macField.classList.toggle("hidden", !isNetworking);
    });
  });

  document.getElementById("onboardingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const json = {};
    for (const [key, val] of formData.entries()) json[key] = val;
    try {
      const res = await fetch('https://sheetdb.io/api/v1/YOUR_API_KEY', {
        method: 'POST',
        body: JSON.stringify({ data: json }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await res.json();
      alert('Form submitted successfully!');
    } catch (err) {
      alert('Submission failed. Please try again.');
    }
  });
});
