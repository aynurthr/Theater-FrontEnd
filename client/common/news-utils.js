import { formatDate } from "./format-date.js";
import { truncateText } from "./truncate-text.js";

//to sort news by date
export const sortNewsByDate = (news) => {
  return Object.keys(news)
    .map((id) => ({ id, ...news[id] }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

//to render news items
export const renderNews = (newsWrapper, news, limit = 0) => {
  const sortedNews = sortNewsByDate(news);
  const newsToDisplay = limit > 0 ? sortedNews.slice(0, limit) : sortedNews;

  newsToDisplay.forEach((newsItem) => {
    const newsElement = document.createElement("div");
    newsElement.classList.add("news-item");

    newsElement.innerHTML = `
        <img src="${newsItem.imageSrc}" alt="news${
      newsItem.id
    }" class="news-item__image" />
        <div class="news-item__content">
          <div class="news-item__content__top">
            <h2>${newsItem.title}</h2>
            <date>${formatDate(new Date(newsItem.date))}</date>
          </div>
          <p class="news-item__content__description">${truncateText(
            newsItem.description.replace(/<br\s*\/?>/gi, " ")
          )}</p>
        </div>
      `;

    newsElement.addEventListener("click", function () {
      window.location.href = `../news-details/index.html?id=${newsItem.id}`;
    });

    newsWrapper.appendChild(newsElement);
  });
};
