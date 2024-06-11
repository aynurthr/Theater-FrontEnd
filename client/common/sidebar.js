  // side bar
  const burgerBtn = document.getElementById("burger-btn");
  const sidebarMenu = document.querySelector(".sidebar-menu");
  const closeBtn = document.createElement("button");

  // Function to toggle the sidebar
  function toggleSidebar() {
    sidebarMenu.classList.toggle("sidebar-menu--active");
  }

  burgerBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleSidebar();
  });

  // Close the sidebar when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !sidebarMenu.contains(event.target) &&
      !burgerBtn.contains(event.target)
    ) {
      sidebarMenu.classList.remove("sidebar-menu--active");
    }
  });

  // Prevent clicks inside the sidebar from closing it
  sidebarMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Close the sidebar when resizing the window to desktop mode
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1067) {
      sidebarMenu.classList.remove("sidebar-menu--active");
    }
  });