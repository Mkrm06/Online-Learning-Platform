// Example functionality: show an alert when "Explore courses" is clicked
document.addEventListener("DOMContentLoaded", function() {
  const exploreBtn = document.querySelector(".btn-primary");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function(e) {
      e.preventDefault();
      alert("Explore Courses clicked!");
    });
  }
});
