import { posters } from "../../common/posters.js";
import { actors } from "../../common/actors.js";
import { users } from "../../common/users.js";

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
    document.querySelector(".rating").innerHTML = poster.rating;

    const buyTicketBtn = document.getElementById("buy-ticket-btn");
    buyTicketBtn.href = `../buy-ticket/index.html?id=${id}`;

    // to change the page title
    document.title = `${poster.title} │ About`;

    // populate cast
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

    // populate comments
    renderComments();

    // comment form submission
    const commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const commentInput = document.getElementById("comment-input");
      const newComment = {
        userId: 1, // Replace with the current logged-in user's ID
        comment: commentInput.value,
        time: new Date(),
      };
      poster.comments.push(newComment);
      commentInput.value = "";
      renderComments();
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

  // toggle eye icon logic
  const toggleIcon = document.getElementById("toggle-icon");
  let isIconActive = false;
  toggleIcon.addEventListener("click", function () {
    isIconActive = !isIconActive;
    if (!isIconActive) {
      currentRating = 0;
      resetStars();
    }
    updateEyeIcon();
    highlightStars(currentRating);
  });

  // star Rating Logic
  const stars = document.querySelectorAll(".star-rating i");
  let currentRating = 0;

  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      resetStars();
      highlightStars(star.getAttribute("data-value"));
    });

    star.addEventListener("mouseout", function () {
      resetStars();
      highlightStars(currentRating);
    });

    star.addEventListener("click", function () {
      const rating = star.getAttribute("data-value");
      if (currentRating == rating) {
        currentRating = 0;
        isIconActive = false;
      } else {
        currentRating = rating;
        isIconActive = true;
      }
      highlightStars(currentRating);
      updateEyeIcon();
    });
  });

  function resetStars() {
    stars.forEach((star) => {
      star.classList.remove("fa-solid");
      star.classList.add("fa-regular");
      star.style.color = "#282828";
    });
  }

  function highlightStars(rating) {
    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= rating) {
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid");
        star.style.color = "#FFD43B";
      }
    });
  }

  function updateEyeIcon() {
    if (isIconActive) {
      toggleIcon.innerHTML =
        '<i class="fa-solid fa-eye" style="color: #fa434b;"></i>';
    } else {
      toggleIcon.innerHTML =
        '<i class="fa-regular fa-eye" style="color: #282828"></i>';
    }
  }

  // to sort comments based on date
  function renderComments() {
    const commentsList = document.getElementById("comments-list");
    const commentsCount = document.getElementById("comments-count");
    const comments = posters[id].comments.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
    commentsCount.textContent = `${comments.length} Comments`;

    commentsList.innerHTML = "";
    comments.forEach((comment) => {
      const user = users[comment.userId];
      if (!user) {
        console.error(`User with ID ${comment.userId} not found.`);
        return;
      }
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.innerHTML = `
        <div class="comment-avatar">
          <img src="${user.profilePicSrc}" alt="${user.username}">
        </div>
        <div class="comment-content">
          <div class="comment-user">${user.username}</div>
          <div class="comment-time">${new Date(
            comment.time
          ).toLocaleString()}</div>
          <div class="comment-text">${comment.comment}</div>
        </div>
      `;
      commentsList.appendChild(commentElement);
    });
  }
});
