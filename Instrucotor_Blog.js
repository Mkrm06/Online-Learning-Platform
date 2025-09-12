// Example: Add interactivity if needed
document.addEventListener("DOMContentLoaded", () => {
  console.log("Course Blog Page Loaded");

  // Example: Highlight active nav
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
