document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const registerModal = document.getElementById("registerModal");

  function syncBodyLock() {
    const shouldLock =
      mobileMenu?.classList.contains("open") ||
      registerModal?.classList.contains("open");

    document.body.style.overflow = shouldLock ? "hidden" : "";
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) {
      return;
    }

    mobileMenu.classList.remove("open");
    hamburger.classList.remove("is-open");
    syncBodyLock();
  }

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 24);
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      hamburger.classList.toggle("is-open");
      syncBodyLock();
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const statCards = document.querySelectorAll("[data-count]");
  let statsStarted = false;

  function runCountUp() {
    statCards.forEach((card) => {
      const target = Number(card.dataset.count || 0);
      const duration = 1200;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.round(progress * target);
        card.textContent = `${value}+`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          card.textContent = `${target}+`;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const impactSection = document.querySelector(".impact-stats");
  if (impactSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsStarted) {
            statsStarted = true;
            runCountUp();
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    statsObserver.observe(impactSection);
  }

  const registerForm = document.getElementById("registerForm");
  const registerSuccess = document.getElementById("registerSuccess");
  const registerTriggers = document.querySelectorAll(".btn-register-trigger");
  const closeModalButton = registerModal?.querySelector(".modal-close");
  const closeSuccessButton = registerModal?.querySelector(".btn-close-success");

  function openRegisterModal() {
    if (!registerModal || !registerForm || !registerSuccess) {
      return;
    }

    registerForm.reset();
    registerForm.hidden = false;
    registerSuccess.hidden = true;
    registerModal.classList.add("open");
    registerModal.setAttribute("aria-hidden", "false");
    closeMobileMenu();
    syncBodyLock();
  }

  function closeRegisterModal() {
    if (!registerModal) {
      return;
    }

    registerModal.classList.remove("open");
    registerModal.setAttribute("aria-hidden", "true");
    syncBodyLock();
  }

  registerTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openRegisterModal);
  });

  closeModalButton?.addEventListener("click", closeRegisterModal);
  closeSuccessButton?.addEventListener("click", closeRegisterModal);

  registerModal?.addEventListener("click", (event) => {
    if (event.target === registerModal) {
      closeRegisterModal();
    }
  });

  registerForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = registerForm.querySelector("button[type='submit']");
    if (!(submitButton instanceof HTMLButtonElement) || !registerSuccess) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Đang gửi thông tin...";

    window.setTimeout(() => {
      registerForm.hidden = true;
      registerSuccess.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = "Gửi thông tin đăng ký";
    }, 900);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && registerModal?.classList.contains("open")) {
      closeRegisterModal();
    }
  });
});
