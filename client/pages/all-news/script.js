document.addEventListener("DOMContentLoaded", function () {
  const newsWrapper = document.getElementById("news-wrapper");
  newsWrapper.addEventListener("click", function (event) {
    const newsElement = event.target.closest(".news-item");
    if (newsElement) {
      window.location.href = `../news-details/index.html`;
    }
  });
});
