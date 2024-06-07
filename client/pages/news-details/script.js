import { news } from "../../common/news.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id && news[id]) {
    const newsItem = news[id];
    document.getElementById("news-title").innerText = newsItem.title;
    document.getElementById("news-date").innerText = newsItem.date;
    document.getElementById("news-description").innerHTML =
      newsItem.description;
    document.getElementById("news-image").src = newsItem.imageSrc;
  } else {
    document.querySelector(".news-details").innerHTML =
      "<p>News not found.</p>";
  }
});
