// script.js

function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(e => e.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('remoteSelect').addEventListener('change', function () {
      const show = this.value === 'Yes';
      document.getElementById('remote1').style.display = show ? 'block' : 'none';
      document.getElementById('moreRemoteLabel2').style.display = show ? 'block' : 'none';
    });
  
    document.getElementById('remoteMore2').addEventListener('change', function () {
      const show = this.value === 'Yes';
      document.getElementById('remote2').style.display = show ? 'block' : 'none';
      document.getElementById('moreRemoteLabel3').style.display = show ? 'block' : 'none';
    });
  
    document.getElementById('remoteMore3').addEventListener('change', function () {
      const show = this.value === 'Yes';
      document.getElementById('remote3').style.display = show ? 'block' : 'none';
    });
  });
  
  function toggleAssetFields() {
    const type = document.getElementById('deviceType').value;
    const contactDevices = ['Laptop', 'Desktop', 'Smartphone', 'Tablet', 'Server'];
    const networkDevices = ['Router', 'Switch', 'Firewall', 'Networking', 'Wifi'];
  
    document.getElementById('contactFields').style.display = contactDevices.includes(type) ? 'block' : 'none';
    document.getElementById('osField').style.display = contactDevices.includes(type) ? 'block' : 'none';
    document.getElementById('ipField').style.display = networkDevices.includes(type) ? 'block' : 'none';
    document.getElementById('macField').style.display = networkDevices.includes(type) ? 'block' : 'none';
  }
  
  function generateEmployeeFields() {
    const count = parseInt(document.getElementById('employeeCount').value, 10);
    const section = document.getElementById('employeeSection');
    section.innerHTML = '';
  
    const locations = ['Primary Location'];
    if (document.getElementById('remote1').style.display === 'block') locations.push('Remote Location #1');
    if (document.getElementById('remote2').style.display === 'block') locations.push('Remote Location #2');
    if (document.getElementById('remote3').style.display === 'block') locations.push('Remote Location #3');
  
    for (let i = 0; i < count; i++) {
      const empNum = i + 1;
      let locationOptions = '';
      locations.forEach(loc => {
        locationOptions += `<option value="${loc}">${loc}</option>`;
      });
  
      section.innerHTML += `
        <div class="employee-block">
          <h3>Employee #${empNum}</h3>
          <input type="text" class="firstName" placeholder="First Name" required />
          <input type="text" class="lastName" placeholder="Last Name" required />
          <input type="email" placeholder="Organizational Email (optional)" />
          <input type="email" class="personalEmail" placeholder="Personal Email" required />
          <input type="tel" placeholder="Mobile Number (+xx xxxxxxxxxx)" pattern="\\+\\d{2} \\d{10}" required />
          <input type="text" placeholder="Position" />
          <label>Status
            <select>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <label>Location
            <select>
              ${locationOptions}
            </select>
          </label>
        </div>
      `;
    }
  }
  
  function populateEmployeeDropdown() {
    const dropdown = document.getElementById('employeeDropdown');
    dropdown.innerHTML = '';
    const employees = document.querySelectorAll('.employee-block');
    employees.forEach(emp => {
      const first = emp.querySelector('.firstName').value;
      const last = emp.querySelector('.lastName').value;
      const option = document.createElement('option');
      option.textContent = `${first} ${last}`;
      dropdown.appendChild(option);
    });
  }
  
