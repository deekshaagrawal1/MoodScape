const searchBtn = document.getElementById("searchBtn");
const moodInput = document.getElementById("moodInput");
const resultsDiv = document.getElementById("results");
const loading = document.getElementById("loading");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let allData = [];

// FETCH DATA
async function fetchData() {
  loading.classList.remove("hidden");
  resultsDiv.innerHTML = "";

  try {
    // Advice API
    const adviceRes = await fetch("https://api.adviceslip.com/advice?timestamp=" + new Date().getTime());
    const adviceData = await adviceRes.json();

    // Bored API
    const activityRes = await fetch("https://www.boredapi.com/api/activity");
    const activityData = await activityRes.json();

    // Store data
    allData = [
      {
        type: "advice",
        text: adviceData.slip.advice
      },
      {
        type: "activity",
        text: activityData.activity
      }
    ];

    displayData(allData);

  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching data 😢</p>";
  }

  loading.classList.add("hidden");
}

// DISPLAY DATA
function displayData(data) {
  resultsDiv.innerHTML = "";

  data.map(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `<p>${item.text}</p>`;

    resultsDiv.appendChild(card);
  });
}

// SEARCH BUTTON
searchBtn.addEventListener("click", () => {
  fetchData();
});

// FILTER (HOF)
filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;

  const filtered = value === "all"
    ? allData
    : allData.filter(item => item.type === value);

  displayData(filtered);
});

// SORT (HOF)
sortSelect.addEventListener("change", () => {
  let sorted = [...allData];

  if (sortSelect.value === "length") {
    sorted.sort((a, b) => a.text.length - b.text.length);
  }

  displayData(sorted);
});

// ENTER KEY SEARCH
moodInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});