import { posters } from "../../common/posters.js";
import { halls } from "../../common/halls.js";
import { formatLongDate } from "../../common/format-date.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id && posters[id]) {
    const poster = posters[id];
    document.getElementById("poster-title").innerText = poster.title;
    document.querySelector(".poster-image").src = poster.imageSrc;

    //to change the page title
    document.title = `${poster.title} │ Buy Ticket`;

    //populate show dates, filtering out past dates
    const now = new Date();
    const bookingDatesContainer = document.querySelector(".booking__dates");
    let firstFutureDate = true;

    poster.showDates.forEach((showDate) => {
      const date = new Date(showDate);
      if (date > now) {
        const dateButton = document.createElement("button");
        dateButton.classList.add("booking__date");
        if (firstFutureDate) {
          dateButton.classList.add("active");
          firstFutureDate = false;
        }
        dateButton.innerText = formatLongDate(date);
        dateButton.dataset.date = date.toISOString();
        bookingDatesContainer.appendChild(dateButton);
      }
    });

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

    //seat selection and price change
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

    //handle date selection
    document
      .querySelector(".booking__dates")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("booking__date")) {
          document
            .querySelectorAll(".booking__date")
            .forEach((btn) => btn.classList.remove("active"));
          event.target.classList.add("active");
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

  //create seating
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
