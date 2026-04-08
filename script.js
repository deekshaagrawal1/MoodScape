const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const darkToggle = document.getElementById("darkToggle");

let allData = [];
let currentData = [];

// FETCH
async function fetchData() {
  loading.classList.remove("hidden");
  resultsDiv.innerHTML = "";

  try {
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();

    allData = data.quotes.slice(0, 10);
    currentData = [...allData];

    displayData(currentData);

  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching data 😢</p>";
  }

  loading.classList.add("hidden");
}

// DISPLAY
function displayData(data) {
  resultsDiv.innerHTML = "";

  data.map(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <p>"${item.quote}"</p>
      <small>- ${item.author}</small>
      <br>
      <button class="favBtn">❤️</button>
    `;

    const btn = card.querySelector(".favBtn");
    btn.addEventListener("click", () => {
      btn.innerText = "💖";
    });

    resultsDiv.appendChild(card);
  });
}

// SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  currentData = allData.filter(item =>
    item.quote.toLowerCase().includes(value)
  );

  displayData(currentData);
});

// FILTER
filterSelect.addEventListener("change", () => {
  if (filterSelect.value === "short") {
    currentData = allData.filter(item => item.quote.length < 80);
  } else if (filterSelect.value === "long") {
    currentData = allData.filter(item => item.quote.length >= 80);
  } else {
    currentData = [...allData];
  }

  displayData(currentData);
});

// SORT
sortSelect.addEventListener("change", () => {
  let sorted = [...currentData];

  if (sortSelect.value === "length") {
    sorted.sort((a, b) => a.quote.length - b.quote.length);
  }

  displayData(sorted);
});

// TOGGLE VIDEO SWITCH 🔥
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const video = document.getElementById("bgVideo");
  const source = video.querySelector("source");

  if (document.body.classList.contains("light")) {
    source.src = "bglight.mp4";
  } else {
    source.src = "bg.mp4";
  }

  video.load();
});

// BUTTON
searchBtn.addEventListener("click", fetchData);