const rules: {
  [url: string]: () => void;
} = {
  "https://www.nytimes.com/section/technology": filterNYTTechnology,
};

function filterNYTTechnology() {
  const adDivs = document.querySelectorAll("div.ad");

  adDivs.forEach((div) => (div.innerHTML = ""));
}
