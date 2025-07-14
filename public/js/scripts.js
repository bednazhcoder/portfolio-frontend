document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeMenu");
  const menuLinks = mobileMenu.querySelectorAll(".nav-links a");

  // Menü öffnen
  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });

  // Menü schließen
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Menü schließen beim Klick auf einen Link
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});

  // Kontaktformular Feedback
  const form = document.getElementById("contactForm");
  if (form) {
    const statusDiv = document.getElementById("statusMessage");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch("https://portfolio-backend-mbs7.onrender.com/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        statusDiv.textContent = json.message;
        statusDiv.className = "status-message " + (res.ok ? "success" : "error");
        if (res.ok) form.reset();
      } catch {
        statusDiv.textContent = "Serverfehler. Bitte später erneut.";
        statusDiv.className = "status-message error";
      }
      statusDiv.style.display = "block";
      setTimeout(() => statusDiv.style.display = "none", 5000);
    });
  }

