import { news } from "../../common/news.js";

document.addEventListener("DOMContentLoaded", function () {
  const newsWrapper = document.getElementById("news-wrapper");

  // Function to truncate description text
  const truncateDescription = (description, maxChars = 200) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const text = tempDiv.innerText || tempDiv.textContent;

    if (text.length <= maxChars) return text;
    return text.substring(0, maxChars) + "...";
  };

  Object.keys(news).forEach((id) => {
    const newsItem = news[id];

    const newsElement = document.createElement("div");
    newsElement.classList.add("news-item");

    newsElement.innerHTML = `
      <img src="${
        newsItem.imageSrc
      }" alt="news${id}" class="news-item__image" />
      <div class="news-item__content">
        <div class="news-item__content__top">
          <h2>${newsItem.title}</h2>
          <date>${newsItem.date}</date>
        </div>
        <p class="news-item__content__description">${truncateDescription(
          newsItem.description.replace(/<br\s*\/?>/gi, " "),
          200
        )}</p>
      </div>
    `;

    newsElement.addEventListener("click", function () {
      window.location.href = `../news-details/index.html?id=${id}`;
    });

    newsWrapper.appendChild(newsElement);
  });
});
