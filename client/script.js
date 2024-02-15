document.addEventListener("DOMContentLoaded", function () {
  const colorPicker = document.getElementById("colorPicker");
  const redInput = document.getElementById("red");
  const greenInput = document.getElementById("green");
  const blueInput = document.getElementById("blue");
  const rgbForm = document.getElementById("rgbForm");

  colorPicker.addEventListener("input", function () {
    const color = this.value;
    const rgb = hexToRgb(color);
    redInput.value = rgb.r;
    greenInput.value = rgb.g;
    blueInput.value = rgb.b;
  });

  rgbForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const red = parseInt(redInput.value);
    const green = parseInt(greenInput.value);
    const blue = parseInt(blueInput.value);
    const rgbValues = { r: red, g: green, b: blue };

    fetch("http://localhost:4000/send-color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rgbValues),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("RGB values sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending RGB values:", error);
        alert("Failed to send RGB values. Please try again.");
      });
  });

  function hexToRgb(hex) {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
});
