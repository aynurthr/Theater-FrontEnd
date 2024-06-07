import { posters } from "../../common/posters.js";
import { news } from "../../common/news.js";

document.addEventListener("DOMContentLoaded", function () {
  // Function to truncate description text
  const truncateDescription = (description, length = 100) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const text = tempDiv.innerText || tempDiv.textContent;
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  // Render posters
  const premieresContainer = document.getElementById("premieres-shows");
  Object.keys(posters).forEach((id) => {
    const poster = posters[id];

    const showElement = document.createElement("div");
    showElement.classList.add("premieres__shows-show");
    showElement.setAttribute("data-id", id);

    showElement.innerHTML = `
      <img src="${poster.imageSrc}" alt="show${id}" />
      <div class="premieres__shows-show__shadow"></div>
      <div class="premieres__shows-show__top">
        <date>${poster.date}</date>
        <age>${poster.age}</age>
      </div>
      <div class="premieres__shows-show__bottom">
        <h5>${poster.title}</h5>
        <p>${truncateDescription(
          poster.description.replace(/<br\s*\/?>/gi, " ")
        )}</p>
      </div>
    `;

    showElement.addEventListener("click", function () {
      window.location.href = `../poster-details/index.html?id=${id}`;
    });

    premieresContainer.appendChild(showElement);
  });

  // Render news
  const newsWrapper = document.getElementById("news-wrapper");
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
          newsItem.description.replace(/<br\s*\/?>/gi, " ")
        )}</p>
      </div>
    `;

    newsElement.addEventListener("click", function () {
      window.location.href = `../news-details/index.html?id=${id}`;
    });

    newsWrapper.appendChild(newsElement);
  });
});
