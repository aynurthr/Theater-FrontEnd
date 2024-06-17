// document.addEventListener("DOMContentLoaded", () => {
//   const newsWrapper = document.getElementById("news-wrapper");
//   const prevBtn = document.getElementById("prev-btn");
//   const nextBtn = document.getElementById("next-btn");
//   const pageNum = document.getElementById("page-num");

//   let currentPage = 1;
//   const itemsPerPage = 6;

//   const newsItems = Array.from(newsWrapper.children);

//   const renderNews = (page) => {
//     newsWrapper.innerHTML = "";
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const paginatedItems = newsItems.slice(start, end);

//     paginatedItems.forEach((item) => {
//       newsWrapper.appendChild(item);
//     });

//     prevBtn.disabled = page === 1;
//     nextBtn.disabled = end >= newsItems.length;
//     pageNum.textContent = page;
//   };

//   prevBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       renderNews(currentPage);
//     }
//   });

//   nextBtn.addEventListener("click", () => {
//     if (currentPage * itemsPerPage < newsItems.length) {
//       currentPage++;
//       renderNews(currentPage);
//     }
//   });

//   renderNews(currentPage);
// });
