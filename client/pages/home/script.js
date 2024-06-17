document.addEventListener("DOMContentLoaded", function () {
  const premieresContainer = document.getElementById("premieres-shows");
  // Add click event listeners to poster items
  premieresContainer.addEventListener("click", function (event) {
    const posterElement = event.target.closest(".premieres__shows-show");
    if (posterElement) {
      window.location.href = `../poster-details/index.html`;
    }
  });

  // Mock logic to determine if there are more than 5 shows
  const moreShowsAvailable = true;

  // Add "More" button if there are more than 5 shows
  if (moreShowsAvailable) {
    const moreButton = document.createElement("button");
    moreButton.classList.add("btn", "btn--more");
    moreButton.innerText = "More";
    moreButton.addEventListener("click", function () {
      window.location.href = "../posters/index.html";
    });
    premieresContainer.appendChild(moreButton);
  }

  const newsWrapper = document.getElementById("news-wrapper");
  // Add click event listeners to news items
  newsWrapper.addEventListener("click", function (event) {
    const newsElement = event.target.closest(".news-item");
    if (newsElement) {
      window.location.href = `../news-details/index.html`;
    }
  });
});
