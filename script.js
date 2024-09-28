// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Menu filtering and tabbed interface
  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuCategories = document.querySelectorAll(".menu-category");

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      menuTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      menuCategories.forEach((cat) => {
        cat.classList.remove("active");
        if (cat.id === category) {
          cat.classList.add("active");
        }
      });
    });
  });

  // Form validation
  const reservationForm = document.querySelector(".reservation form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const party = document.getElementById("party").value;
      const email = document.getElementById("email").value.trim();

      if (
        name === "" ||
        date === "" ||
        time === "" ||
        party === "" ||
        email === ""
      ) {
        alert("Please fill in all fields");
        return;
      }

      if (parseInt(party) < 1) {
        alert("Party size must be at least 1");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      console.log("Reservation submitted:", { name, date, time, party, email });
      alert("Reservation submitted successfully!");
      reservationForm.reset();
    });
  }

  // Smooth scrolling for menu links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Legendary Testimonial Section
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === index) {
        card.classList.add("active");
      }
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(currentIndex);
  }

  function prevTestimonial() {
    currentIndex =
      (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentIndex);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextTestimonial);
    prevBtn.addEventListener("click", prevTestimonial);
  }

  // Auto-rotate testimonials every 5 seconds
  setInterval(nextTestimonial, 5000);

  // Parallax effect for floating elements
  function handleParallax(e) {
    const elements = document.querySelectorAll(".floating-element");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    elements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-speed") || 0.05);
      const x =
        (window.innerWidth - element.offsetWidth * speed) * mouseX * speed;
      const y =
        (window.innerHeight - element.offsetHeight * speed) * mouseY * speed;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  document.addEventListener("mousemove", handleParallax);

  // Glowing effect on hover for footer sections
  const footerSections = document.querySelectorAll(
    ".footer-nav, .footer-contact, .footer-social"
  );
  footerSections.forEach((section) => {
    section.addEventListener("mouseenter", function () {
      this.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    });
    section.addEventListener("mouseleave", function () {
      this.style.textShadow = "none";
    });
  });

  // Magical sparkle effect
  function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }

  // Add sparkle effect to footer and menu items
  document
    .querySelector(".mythical-footer")
    ?.addEventListener("click", function (e) {
      createSparkle(e.clientX, e.clientY);
    });

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function (e) {
      createSparkle(e.clientX, e.clientY);
    });
  });
});
