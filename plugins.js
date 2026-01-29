document.addEventListener("DOMContentLoaded", () => {

  // TAB FUNCTIONALITY
  function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll(".tabcontent");
    const tablinks = document.querySelectorAll(".tablinks");

    tabcontent.forEach(tab => (tab.style.display = "none"));
    tablinks.forEach(link => link.classList.remove("active"));

    const targetTab = document.getElementById(tabName);
    if (targetTab) targetTab.style.display = "block";
    evt.currentTarget.classList.add("active");
  }
  window.openTab = openTab; // make available to HTML onclick

  // Set default tab open (if exists)
  const defaultOpen = document.getElementById("defaultOpen");
  if (defaultOpen) defaultOpen.click();

  // VARIABLES
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  const loadingOverlay = document.getElementById("loading");
  const backToTop = document.querySelector(".back2top");
  const homeSection = document.querySelector("#home");

  // ACTIVE NAV HIGHLIGHT ON SCROLL
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });

    // Back to top visibility
    if (homeSection) {
      const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
      if (scrollPos > homeBottom - 100) {
        backToTop?.classList.add("show");
      } else {
        backToTop?.classList.remove("show");
      }
    }
  });

  // SMOOTH SCROLL + LOADING ON NAV CLICK
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target || !loadingOverlay) return;

      loadingOverlay.classList.add("active");
      setTimeout(() => {
        loadingOverlay.classList.remove("active");
        target.scrollIntoView({ behavior: "smooth" });
      }, 600);
    });
  });

  // BACK TO TOP CLICK (with loader)
  if (backToTop && homeSection && loadingOverlay) {
    backToTop.addEventListener("click", e => {
      e.preventDefault();
      loadingOverlay.classList.add("active");
      setTimeout(() => {
        loadingOverlay.classList.remove("active");
        homeSection.scrollIntoView({ behavior: "smooth" });
      }, 1500);
    });
  }

  // BANNER FLOAT MODALS
  document.querySelectorAll(".bannerfloat").forEach(bannerfloat => {
    const thumb = bannerfloat.querySelector(".banner-thumb");
    const modal = document.querySelector(".banner-modal");
    const modalImg = modal?.querySelector(".banner-modal-content");
    const closeBtn = modal?.querySelector(".banner-close");
    const closeSmall = bannerfloat.querySelector(".banner-close-small");

    if (!thumb || !modal || !modalImg) return;

    // Open modal
    thumb.addEventListener("click", () => {
      thumb.style.display = "none";
      if (closeSmall) closeSmall.style.display = "none";
      modal.style.display = "block";
      modalImg.src = thumb.src.replace("small", "large");
    });

    // Close modal
    const closeModal = () => {
      modal.style.display = "none";
      thumb.style.display = "block";
      if (closeSmall) closeSmall.style.display = "grid";
    };

    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });

    // Close small banner permanently
    closeSmall?.addEventListener("click", () => {
      bannerfloat.style.display = "none";
    });
  });

});
