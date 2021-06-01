function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(200, 140);

  let lat, lon, location;
  const button = document.getElementById("submit");
  button.addEventListener("click", async (event) => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    const data = { lat, lon, name, email, username, location, image64 };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
  });

  if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById("latitude").textContent = lat.toFixed(3);
      document.getElementById("longitude").textContent = lon.toFixed(3);
      const api_url = `/location/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      document.getElementById("location value").textContent =
        json.results[0].components.city +
        " , " +
        json.results[0].components.state;
      console.log(
        json.results[0].components.city,
        json.results[0].components.state
      );
      location =
        json.results[0].components.city +
        " " +
        json.results[0].components.state;
    });
  } else {
    console.log("geolocation not available");
  }
}
//
