import { posters } from "../../common/posters.js";
import { news } from "../../common/news.js";
import { renderNews } from "../../common/news-utils.js";
import { renderHomePagePosters } from "../../common/poster-utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const premieresContainer = document.getElementById("premieres-shows");
  const moreShowsAvailable = renderHomePagePosters(
    premieresContainer,
    posters,
    5
  );

  //to add "More" button if there are more than 5 shows
  if (moreShowsAvailable) {
    const moreButton = document.createElement("button");
    moreButton.classList.add("btn", "btn--more");
    moreButton.innerText = "More";
    moreButton.addEventListener("click", function () {
      window.location.href =
        "http://127.0.0.1:5500/client/pages/posters/index.html";
    });
    premieresContainer.appendChild(moreButton);
  }

  //to render news (only the 4 most recent)
  const newsWrapper = document.getElementById("news-wrapper");
  renderNews(newsWrapper, news, 4);
});
