chrome.storage.local.get("shows", ({ shows }) => {
  console.log(shows);

  for (const show of shows) {
    renderShow(show);
  }
});

function renderShow(show) {
  const showDiv = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = show.show.name;

  const image = document.createElement("img");
  image.src = show.show.image?.medium;

  showDiv.appendChild(image);
  showDiv.appendChild(title);

  document.body.appendChild(showDiv);
}
