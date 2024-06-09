import { posters } from "../../common/posters.js";
import { renderAllPostersPage } from "../../common/poster-utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const showsWrapper = document.getElementById("shows-wrapper");
  renderAllPostersPage(showsWrapper, posters);
});
