import { news } from "../../common/news.js";
import { formatDate } from "../../common/format-date.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id && news[id]) {
    const newsItem = news[id];
    document.getElementById("news-title").innerText = newsItem.title;
    document.getElementById("news-date").innerText = formatDate(
      new Date(newsItem.date)
    );
    document.getElementById("news-description").innerHTML =
      newsItem.description;
    document.getElementById("news-image").src = newsItem.imageSrc;

    //to change the page title
    document.title = `${newsItem.title} │ About`;
  } else {
    document.querySelector(".news-details").innerHTML =
      "<p>News not found.</p>";
  }
});
