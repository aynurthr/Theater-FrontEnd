document.addEventListener("DOMContentLoaded", function () {
  const showsWrapper = document.getElementById("shows-wrapper");
  showsWrapper.addEventListener("click", function (event) {
    const showElement = event.target.closest(".shows-item");
    if (showElement) {
      window.location.href = `../poster-details/index.html`;
    }
  });
});
