getData();

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {
    const root = document.createElement("p");
    const name = document.createElement("div");
    const email = document.createElement("div");
    const username = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement("img");
    name.textContent = `Name: ${item.name}`;
    email.textContent = `Email : ${item.email}`;
    username.textContent = `Unique Username: ${item.username}`;
    geo.textContent = `${item.lat.toFixed(3)}°, ${item.lon.toFixed(3)}°  at ${
      item.location
    } `;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;
    image.alt = "User's face";

    root.append(name, email, username, geo, date, image);
    document.body.append(root);
  }
  console.log(data);
}
