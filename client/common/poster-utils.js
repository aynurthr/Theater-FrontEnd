import { formatLongDate } from "./format-date.js";
import { truncateText } from "./truncate-text.js";

//to render poster items for the home page
export const renderHomePagePosters = (postersContainer, posters, limit = 0) => {
  const now = new Date();
  const upcomingShows = [];

  Object.keys(posters).forEach((id) => {
    const poster = posters[id];
    poster.showDates.forEach((showDate) => {
      const date = new Date(showDate);
      if (date > now) {
        upcomingShows.push({
          id,
          ...poster,
          showDate: date,
        });
      }
    });
  });

  //to sort by show date and remove duplicates
  upcomingShows.sort((a, b) => a.showDate - b.showDate);

  const uniqueShowIds = new Set();
  const sortedUniqueShows = [];
  for (const show of upcomingShows) {
    if (!uniqueShowIds.has(show.id)) {
      uniqueShowIds.add(show.id);
      sortedUniqueShows.push(show);
    }
  }

  const showsToDisplay = limit
    ? sortedUniqueShows.slice(0, limit)
    : sortedUniqueShows;

  showsToDisplay.forEach((show) => {
    const showElement = document.createElement("div");
    showElement.classList.add("premieres__shows-show");
    showElement.setAttribute("data-id", show.id);

    showElement.innerHTML = `
      <img src="${show.imageSrc}" alt="show${show.id}" />
      <div class="premieres__shows-show__shadow"></div>
      <div class="premieres__shows-show__top">
        <date>${formatLongDate(new Date(show.showDate))}</date>
        <age>${show.age}</age>
      </div>
      <div class="premieres__shows-show__bottom">
        <h5>${show.title}</h5>
        <p class="description">${truncateText(
          show.description.replace(/<br\s*\/?>/gi, " "),
          100
        )}</p>
      </div>
    `;

    showElement.addEventListener("click", function () {
      window.location.href = `../poster-details/index.html?id=${show.id}`;
    });

    postersContainer.appendChild(showElement);
  });

  return sortedUniqueShows.length > limit;
};

//to render poster items for the all-posters page
export const renderAllPostersPage = (postersContainer, posters) => {
  const now = new Date();
  const upcomingShows = [];

  Object.keys(posters).forEach((id) => {
    const poster = posters[id];
    poster.showDates.forEach((showDate) => {
      const date = new Date(showDate);
      if (date > now) {
        upcomingShows.push({
          id,
          ...poster,
          showDate: date,
        });
      }
    });
  });

  //to sort by show date and remove duplicates
  upcomingShows.sort((a, b) => a.showDate - b.showDate);

  const uniqueShowIds = new Set();
  const sortedUniqueShows = [];
  for (const show of upcomingShows) {
    if (!uniqueShowIds.has(show.id)) {
      uniqueShowIds.add(show.id);
      sortedUniqueShows.push(show);
    }
  }

  sortedUniqueShows.forEach((show) => {
    const showElement = document.createElement("div");
    showElement.classList.add("shows-item");
    showElement.setAttribute("data-id", show.id);

    showElement.innerHTML = `
      <img src="${show.imageSrc}" alt="show${show.id}" />
      <div class="shows-item__shadow"></div>
      <div class="shows-item__top">
        <date>${formatLongDate(new Date(show.showDate))}</date>
        <age>${show.age}</age>
      </div>
      <div class="shows-item__bottom">
        <h5>${show.title}</h5>
        <p class="description">${truncateText(
          show.description.replace(/<br\s*\/?>/gi, " ")
        )}</p>
      </div>
    `;

    showElement.addEventListener("click", function () {
      window.location.href = `../poster-details/index.html?id=${show.id}`;
    });

    postersContainer.appendChild(showElement);
  });

  return sortedUniqueShows.length > limit;
};
