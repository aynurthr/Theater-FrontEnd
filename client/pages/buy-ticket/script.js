import { posters } from "../../common/posters.js";
import { halls } from "../../common/halls.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id && posters[id]) {
    const poster = posters[id];
    document.getElementById("poster-title").innerText = poster.title;
    document.querySelector(".poster-image").src = poster.imageSrc;

    const hall = poster.hall;
    let seatingChart;

    if (halls[hall]) {
      const hallData = halls[hall];
      seatingChart = generateSeatingChart(hallData.rows, hallData.seatsPerRow);
      document.querySelector(".booking__seating").innerHTML = seatingChart;
    } else {
      document.querySelector(".container").innerHTML =
        "<p>Invalid hall data.</p>";
    }

    let totalPrice = 0;
    updateTotalPrice(totalPrice);

    // for seat selection
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("seat")) {
        event.target.classList.toggle("selected");
        if (event.target.classList.contains("selected")) {
          totalPrice += poster.price;
        } else {
          totalPrice -= poster.price;
        }
        updateTotalPrice(totalPrice);
      }
    });

    document
      .querySelector(".btn--cancel")
      .addEventListener("click", function () {
        window.history.back();
      });
  } else {
    document.querySelector(".container").innerHTML = "<p>Poster not found.</p>";
  }

  function generateSeatingChart(rows, seatsPerRow) {
    let seatingChart = '<div class="seating-chart">';
    for (let i = 1; i <= rows; i++) {
      seatingChart += `<div class="seating-row"> ${i} `;
      for (let j = 1; j <= seatsPerRow[i - 1]; j++) {
        seatingChart += `<span class="seat" data-row="${i}" data-seat="${j}"></span>`;
      }
      seatingChart += "</div>";
    }
    seatingChart += "</div>";
    return seatingChart;
  }

  function updateTotalPrice(price) {
    document.getElementById("total-price").innerText = `${price}$`;
  }
});
