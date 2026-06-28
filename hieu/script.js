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

  const chapterImage = document.getElementById("chapterImage");
  const chapterKicker = document.getElementById("chapterKicker");
  const chapterNote = document.getElementById("chapterNote");
  const chapterSteps = Array.from(document.querySelectorAll(".chapter-step"));

  function activateChapter(step) {
    if (!step || !chapterImage || !chapterKicker || !chapterNote) {
      return;
    }

    chapterSteps.forEach((item) => item.classList.remove("is-active"));
    step.classList.add("is-active");

    chapterImage.style.opacity = "0.3";
    window.setTimeout(() => {
      chapterImage.src = step.dataset.image || chapterImage.src;
      chapterImage.alt = step.dataset.alt || "";
      chapterKicker.textContent = step.dataset.kicker || "";
      chapterNote.textContent = step.dataset.note || "";
      chapterImage.style.opacity = "1";
    }, 140);
  }

  if (chapterSteps.length > 0) {
    activateChapter(chapterSteps[0]);

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          activateChapter(visible[0].target);
        }
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-12% 0px -28% 0px",
      }
    );

    chapterSteps.forEach((step) => chapterObserver.observe(step));
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
