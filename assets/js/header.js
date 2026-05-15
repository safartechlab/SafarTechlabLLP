fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

  const toggle = document.getElementById("aboutToggle");
  const dropdown = document.getElementById("aboutDropdown");
  const arrow = toggle.querySelector(".dropdown-arrow");

  toggle.addEventListener("click", function () {
    dropdown.classList.toggle("active");
    arrow.classList.toggle("rotate");
  });

  document.addEventListener("click", function (e) {
    if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
      arrow.classList.remove("rotate");
    }
  });
});
