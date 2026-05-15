document.addEventListener("DOMContentLoaded", function () {

  /* ===== LOAD HEADER ===== */
  fetch("components/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      /* ===== DROPDOWN LOGIC ===== */
      const toggle = document.getElementById("aboutToggle");
      const dropdown = document.getElementById("aboutDropdown");

      if (toggle && dropdown) {
        const arrow = toggle.querySelector(".dropdown-arrow");

        toggle.addEventListener("click", function (e) {
          e.stopPropagation();
          dropdown.classList.toggle("active");
          arrow.classList.toggle("rotate");
        });

        document.addEventListener("click", function (e) {
          if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
            arrow.classList.remove("rotate");
          }
        });
      }
    });

  /* ===== LOAD FOOTER ===== */
  fetch("components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });

});
