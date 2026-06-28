document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mentorOverlay = document.getElementById("mentorOverlay");
  const registerModal = document.getElementById("registerModal");

  function syncBodyLock() {
    const shouldLock =
      mobileMenu?.classList.contains("open") ||
      mentorOverlay?.classList.contains("open") ||
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

  const storyImage = document.getElementById("storyImage");
  const storyKicker = document.getElementById("storyKicker");
  const storyNote = document.getElementById("storyNote");
  const storySteps = Array.from(document.querySelectorAll(".field-step"));

  function activateStoryStep(step) {
    if (!step || !storyImage || !storyKicker || !storyNote) {
      return;
    }

    storySteps.forEach((item) => item.classList.remove("is-active"));
    step.classList.add("is-active");

    const nextImage = step.dataset.image;
    const nextAlt = step.dataset.alt || "";
    const nextKicker = step.dataset.kicker || "";
    const nextNote = step.dataset.note || "";

    storyImage.style.opacity = "0.3";
    window.setTimeout(() => {
      storyImage.src = nextImage;
      storyImage.alt = nextAlt;
      storyKicker.textContent = nextKicker;
      storyNote.textContent = nextNote;
      storyImage.style.opacity = "1";
    }, 140);
  }

  if (storySteps.length > 0) {
    activateStoryStep(storySteps[0]);

    const stepObserver = new IntersectionObserver(
      (entries) => {
        const visibleSteps = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSteps[0]) {
          activateStoryStep(visibleSteps[0].target);
        }
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-12% 0px -28% 0px",
      }
    );

    storySteps.forEach((step) => stepObserver.observe(step));
  }

  const mentorData = [
    {
      name: "Nguyễn Nhật Hùng",
      role: "Đồng sáng lập & Giám đốc học thuật",
      image: "image/section5_1hung.png",
      detail: `
        <p>Định hướng phần học thuật của Hiểu-Chuyện bằng tư duy tranh biện, phản biện và thiết kế trải nghiệm học tập có chiều sâu.</p>
        <ul>
          <li>Học bổng Đại sứ “Một vành đai, một con đường” tại Đại học Bắc Kinh.</li>
          <li>YSEALI Academic Fellowship tại Đại học Connecticut, Hoa Kỳ.</li>
          <li>Cố vấn chuyên môn cho nhiều sân chơi tranh biện và giáo dục thanh thiếu niên.</li>
          <li>Đồng hành với hàng trăm giải đấu học thuật trong nước và quốc tế.</li>
        </ul>
      `,
    },
    {
      name: "Nguyễn Khánh Linh",
      role: "Đồng sáng lập & Giám đốc điều hành",
      image: "image/section5_linh.png",
      detail: `
        <p>Kết nối tư duy giáo dục khai phóng với khả năng tổ chức chương trình, đảm bảo mỗi trải nghiệm đều đi tới một mục tiêu phát triển rõ ràng.</p>
        <ul>
          <li>Học bổng Global UGRAD của Bộ Ngoại giao Hoa Kỳ.</li>
          <li>Cố vấn chuyên môn UPR phối hợp cùng UNDP Việt Nam.</li>
          <li>Huấn luyện và điều phối nhiều đội tuyển tranh biện học sinh đạt thành tích cao.</li>
          <li>Đồng kiến tạo mô hình trải nghiệm học tập gắn với cộng đồng.</li>
        </ul>
      `,
    },
    {
      name: "Vũ Hoàng Anh",
      role: "Huấn luyện viên",
      image: "image/section5_hoang.png",
      detail: `
        <p>Mang tới năng lượng tranh biện hiện đại, rõ ràng và gần với học sinh, đặc biệt trong các buổi luyện lập luận và phản hồi.</p>
        <ul>
          <li>Học bổng Global UGRAD tại Missouri, Hoa Kỳ.</li>
          <li>Top 10 tranh biện viên xuất sắc châu Á hạng mục EFL.</li>
          <li>Đạt nhiều thành tích tại các giải đấu tranh biện quốc gia và quốc tế.</li>
          <li>Đồng hành cùng học sinh trong các phiên thực hành và phản tư sau hoạt động.</li>
        </ul>
      `,
    },
    {
      name: "Nguyễn Quỳnh Trang",
      role: "Huấn luyện viên",
      image: "image/section5_trang.png",
      detail: `
        <p>Đảm nhận vai trò xây dựng nhịp học ổn định, sắc nét và có tính tổ chức cao cho các hoạt động đối thoại, phản biện và trình bày.</p>
        <ul>
          <li>IELTS Academic 8.0 Overall.</li>
          <li>Giám khảo và trưởng nhóm học thuật tại nhiều giải đấu tranh biện lớn.</li>
          <li>Kinh nghiệm tổ chức, điều phối và phản biện chuyên sâu cho học sinh.</li>
          <li>Đồng hành với các mô hình đào tạo hướng tới tư duy đa chiều.</li>
        </ul>
      `,
    },
    {
      name: "Đỗ Thị Ngọc Anh",
      role: "Huấn luyện viên",
      image: "image/section5_anh.png",
      detail: `
        <p>Đưa vào chương trình một phong cách làm việc sắc sảo nhưng gần gũi, giúp học sinh dám phát biểu và dám thử sức trong môi trường an toàn.</p>
        <ul>
          <li>Đại diện Việt Nam tại sân chơi IHL khu vực châu Á - Thái Bình Dương.</li>
          <li>Giữ nhiều vai trò giám khảo, trưởng ban chuyên môn ở các giải debate học sinh.</li>
          <li>Giàu kinh nghiệm huấn luyện, phản biện và đồng hành với nhóm nhỏ.</li>
          <li>Tập trung vào kỹ năng đối thoại có trách nhiệm và tư duy công dân.</li>
        </ul>
      `,
    },
    {
      name: "Lương Hải Anh",
      role: "Huấn luyện viên",
      image: "image/section5_haianh.png",
      detail: `
        <p>Khuyến khích học sinh xây dựng tiếng nói cá nhân dựa trên tư duy phản biện, đồng thời giữ được sự lắng nghe và cân bằng trong tranh luận.</p>
        <ul>
          <li>IELTS Academic 8.0 Overall.</li>
          <li>Giữ vai trò trưởng hoặc phó ban giám khảo ở nhiều giải debate dành cho học sinh.</li>
          <li>Có thành tích tại các giải đấu tranh biện trong nước và quốc tế.</li>
          <li>Đồng hành tốt trong các hoạt động phản tư và phát triển sự tự tin.</li>
        </ul>
      `,
    },
  ];

  const popupImg = document.getElementById("popupImg");
  const popupName = document.getElementById("popupName");
  const popupRole = document.getElementById("popupRole");
  const popupDetail = document.getElementById("popupDetail");
  const popupClose = document.getElementById("popupClose");
  const mentorCards = document.querySelectorAll(".mentor-card");

  function openMentorPopup(index) {
    const mentor = mentorData[index];
    if (!mentor || !mentorOverlay || !popupImg || !popupName || !popupRole || !popupDetail) {
      return;
    }

    popupImg.src = mentor.image;
    popupImg.alt = mentor.name;
    popupName.textContent = mentor.name;
    popupRole.textContent = mentor.role;
    popupDetail.innerHTML = mentor.detail;

    mentorOverlay.classList.add("open");
    mentorOverlay.setAttribute("aria-hidden", "false");
    syncBodyLock();
  }

  function closeMentorPopup() {
    if (!mentorOverlay) {
      return;
    }

    mentorOverlay.classList.remove("open");
    mentorOverlay.setAttribute("aria-hidden", "true");
    syncBodyLock();
  }

  mentorCards.forEach((card) => {
    card.addEventListener("click", () => {
      openMentorPopup(Number(card.dataset.mentor));
    });
  });

  popupClose?.addEventListener("click", closeMentorPopup);
  mentorOverlay?.addEventListener("click", (event) => {
    if (event.target === mentorOverlay) {
      closeMentorPopup();
    }
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
    if (event.key !== "Escape") {
      return;
    }

    if (mentorOverlay?.classList.contains("open")) {
      closeMentorPopup();
    }

    if (registerModal?.classList.contains("open")) {
      closeRegisterModal();
    }
  });
});
