import { posters } from "../../common/posters.js";

document.addEventListener("DOMContentLoaded", function () {
  const showsWrapper = document.getElementById("shows-wrapper");

  Object.keys(posters).forEach((id) => {
    const poster = posters[id];

    const showItem = document.createElement("div");
    showItem.classList.add("shows-item");
    showItem.setAttribute("data-id", id);

    showItem.innerHTML = `
      <img src="${poster.imageSrc}" alt="show${id}" />
      <div class="shows-item__shadow"></div>
      <div class="shows-item__top">
        <date>${poster.date}</date>
        <age>${poster.age}</age>
      </div>
      <div class="shows-item__bottom">
        <h5>${poster.title}</h5>
        <p class="description">${poster.description.replace(
          /<br\s*\/?>/gi,
          " "
        )}</p>
      </div>
    `;

    showItem.addEventListener("click", function () {
      window.location.href = `../poster-details/index.html?id=${id}`;
    });

    showsWrapper.appendChild(showItem);
  });
});
