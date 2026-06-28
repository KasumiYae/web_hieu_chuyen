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

  const confessionTrack = document.getElementById("confessionTrack");
  const confessionCards = confessionTrack ? Array.from(confessionTrack.children) : [];
  const confessionDots = document.getElementById("confessionDots");
  const confessionPrev = document.getElementById("confessionPrev");
  const confessionNext = document.getElementById("confessionNext");
  let confessionIndex = 0;

  function renderConfessionDots() {
    if (!confessionDots || confessionCards.length === 0) {
      return;
    }

    confessionDots.innerHTML = "";

    confessionCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = index === confessionIndex ? "is-active" : "";
      dot.setAttribute("aria-label", `Tâm sự ${index + 1}`);
      dot.addEventListener("click", () => updateConfession(index));
      confessionDots.appendChild(dot);
    });
  }

  function updateConfession(index) {
    if (!confessionTrack || confessionCards.length === 0) {
      return;
    }

    if (index < 0) {
      confessionIndex = confessionCards.length - 1;
    } else if (index >= confessionCards.length) {
      confessionIndex = 0;
    } else {
      confessionIndex = index;
    }

    confessionTrack.style.transform = `translateX(-${confessionIndex * 100}%)`;
    confessionCards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === confessionIndex);
    });

    if (confessionDots) {
      confessionDots.querySelectorAll("button").forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === confessionIndex);
      });
    }
  }

  if (confessionCards.length > 0) {
    renderConfessionDots();
    updateConfession(0);
    confessionPrev?.addEventListener("click", () => updateConfession(confessionIndex - 1));
    confessionNext?.addEventListener("click", () => updateConfession(confessionIndex + 1));
  }

  document.querySelectorAll(".like-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const count = button.querySelector("span");
      if (!count) {
        return;
      }

      const current = Number(count.textContent || 0);
      const isLiked = button.classList.toggle("is-liked");
      count.textContent = String(isLiked ? current + 1 : current - 1);
    });
  });

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
