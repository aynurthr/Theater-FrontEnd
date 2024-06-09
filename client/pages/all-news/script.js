import { news } from "../../common/news.js";
import { renderNews } from "../../common/news-utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const newsWrapper = document.getElementById("news-wrapper");
  renderNews(newsWrapper, news);
});
