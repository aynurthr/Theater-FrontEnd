import { posters } from "../../common/posters.js";
import { actors } from "../../common/actors.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id && posters[id]) {
    const poster = posters[id];
    document.querySelector("h1").innerText = poster.title;
    document.querySelector(".genre").innerText = poster.genre;
    document.querySelector(".duration").innerText = poster.duration;
    document.querySelector(".age").innerText = poster.age;
    document.querySelector("#about p").innerHTML = poster.description;
    document.querySelector(".poster-image").src = poster.imageSrc;

    const buyTicketBtn = document.getElementById("buy-ticket-btn");
    buyTicketBtn.href = `../buy-ticket/index.html?id=${id}`;

    // to change the page title
    document.title = `${poster.title} │ About`;

    // Populate cast
    const teamContent = document.querySelector(".team-content");
    poster.cast.forEach((castMember) => {
      const actor = actors[castMember.actor];
      if (actor) {
        const castElement = document.createElement("div");
        castElement.classList.add("cast-member");
        castElement.innerHTML = `
          <img src="${actor.imageSrc}" alt="${actor.fullName}" />
          <div class="cast-info">
          <p class="role">${castMember.role}</p>
            <h3>${actor.fullName}</h3>
            <p>${actor.title}</p>
          </div>
        `;
        teamContent.appendChild(castElement);
      }
    });
  } else {
    document.querySelector(".container").innerHTML = "<p>Poster not found.</p>";
  }

  // tab functionality
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      const target = this.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => (content.style.display = "none"));

      this.classList.add("active");
      document.getElementById(target).style.display = "block";
    });
  });

  tabs[0].classList.add("active");
  tabContents[0].style.display = "block";
});
