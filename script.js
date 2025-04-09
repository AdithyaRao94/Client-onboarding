document.getElementById("onboardingForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {};
  Array.from(form.elements).forEach(el => {
    if (el.name) {
      data[el.name] = el.value;
    }
  });

  try {
    const response = await fetch("https://sheetdb.io/api/v1/YOUR_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: data })
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      form.reset();
    } else {
      alert("Error submitting form.");
    }
  } catch (err) {
    console.error(err);
    alert("Submission failed.");
  }
});
