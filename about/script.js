/* ===================================================
   HIỂU-CHUYỆN — About Us — script.js
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR scroll shadow ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---------- Hamburger ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ---------- AOS (scroll reveal) ---------- */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('aos-visible'), parseInt(delay));
        aosObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  aosEls.forEach(el => aosObs.observe(el));

  /* ---------- Mission block scroll reveal ---------- */
  const missionBlocks = document.querySelectorAll('.mission-block');
  const missionObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
        missionObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  missionBlocks.forEach(b => missionObs.observe(b));

  /* ---------- Section 3 slide-in (trigger on scroll) ---------- */
  const debateLeft = document.getElementById('debateLeft');
  const debateRight = document.getElementById('debateRight');
  const debateQuote = document.getElementById('debateQuote');

  if (debateLeft) {
    debateLeft.style.transform = 'translateX(-100%)';
    debateLeft.style.transition = 'none';
    debateRight.style.transform = 'translateX(100%)';
    debateRight.style.transition = 'none';
    debateQuote.style.opacity = '0';
    debateQuote.style.transition = 'none';

    const debateObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        debateLeft.style.transition = 'transform .9s cubic-bezier(.4,0,.2,1)';
        debateRight.style.transition = 'transform .9s cubic-bezier(.4,0,.2,1) .1s';
        debateQuote.style.transition = 'opacity .7s ease .7s';
        debateLeft.style.transform = 'translateX(0)';
        debateRight.style.transform = 'translateX(0)';
        debateQuote.style.opacity = '1';
        debateObs.disconnect();
      }
    }, { threshold: 0.2 });
    debateObs.observe(debateLeft.closest('.debate-section') || debateLeft);
  }

  /* ---------- Mentor carousel ---------- */
  const mentorData = [
    {
      name: 'Nguyễn Nhật Hùng',
      role: 'Đồng sáng lập & Giám đốc học thuật',
      img: 'image/section5_1hung.png',
      detail: `<ul>
        <li>Học bổng Đại sứ "Một vành đai, một con đường" 2018 – Đại học Bắc Kinh, Trung Quốc</li>
        <li>Học bổng Thủ lĩnh trẻ YSEALI Academic Fellowship 2023 – Đại học Connecticut, Mỹ</li>
        <li>Cố vấn chuyên môn: Tranh biện Tiếng Nói Xanh (Vingroup), VTV7 Teen & The Debaters</li>
        <li>Trưởng Ban Giám khảo – VMDC 2022 & 2025; Hanoi BP Debate Open 2025; VBC 2021 & 2022</li>
        <li>Giám khảo xuất sắc nhất – VUDC 2022; Southern Vietnam BP Debate Academy 2024</li>
        <li>Giám khảo chung kết – Cornell-Yonsei Debate Invitational 2019, Hàn Quốc</li>
        <li>Giám khảo của hơn 120+ cuộc thi tranh biện cấp quốc gia, quốc tế trong 10 năm</li>
      </ul>`
    },
    {
      name: 'Nguyễn Khánh Linh',
      role: 'Đồng sáng lập & Giám đốc Điều hành',
      img: 'image/section5_linh.png',
      detail: `<ul>
        <li>Học bổng Global UGRAD – Bộ Ngoại giao Hoa Kỳ, học tại Washington, Hoa Kỳ</li>
        <li>Cố vấn chuyên môn UPR – hợp tác với UNDP Việt Nam</li>
        <li>Trưởng Ban giám khảo VUDC 2022, HDT 2022, CDLO 2024 (Campuchia)</li>
        <li>Huấn luyện viên đội Quán quân & Á quân Trường Teen và The Debaters, VTV7</li>
        <li>Quán quân Giải Tranh biện Quốc gia Luật Nghị viện Anh 2020 & Toàn quốc 2022</li>
        <li>Á quân VUDC 2022; Đại diện thanh niên UNODC Malaysia, AStW Thái Lan</li>
      </ul>`
    },
    {
      name: 'Vũ Hoàng Anh',
      role: 'Huấn luyện viên',
      img: 'image/section5_hoang.png',
      detail: `<ul>
        <li>Học bổng Global UGRAD – Bộ Ngoại giao Hoa Kỳ, học tại Missouri, Hoa Kỳ</li>
        <li>Top 10 Tranh biện viên xuất sắc nhất Châu Á, EFL – ABP 2024</li>
        <li>Quán quân, Top Người nói xuất sắc – Hanoi Debate Tournament 2021</li>
        <li>Quán quân – Giải Tranh biện Thế giới Intertext Pre-WUDC 2023</li>
        <li>Á quân – Giải Tranh biện Quốc gia Việt Nam bậc Đại học 2023</li>
        <li>Quý quân – Vienna BP Open 2025 (Áo)</li>
        <li>Cố vấn UPR – hợp tác với UNDP Việt Nam</li>
      </ul>`
    },
    {
      name: 'Nguyễn Quỳnh Trang',
      role: 'Huấn luyện viên',
      img: 'image/section5_trang.png',
      detail: `<ul>
        <li>IELTS Academic 8.0 Overall</li>
        <li>Giám khảo ABP 2024; Diliman Pre-ABP 2023; Intertext Pre-ABP 2024</li>
        <li>Top Giám khảo Xuất sắc nhất VBC 2023–2025, NSDC 2023, HDT 2024 & 2025</li>
        <li>Giám khảo khách mời 50+ giải đấu trong nước, bao gồm Oxford Schools Vietnam Qualifier 2026</li>
        <li>Ban Tổ chức Giải Vô địch Thế giới WSDC 2023 & WUDC 2024 tại Việt Nam</li>
        <li>Phó Trưởng Ban Giám khảo Bảng Việt – VBC 2026</li>
      </ul>`
    },
    {
      name: 'Đỗ Thị Ngọc Anh',
      role: 'Huấn luyện viên',
      img: 'image/section5_anh.png',
      detail: `<ul>
        <li>Quán quân – Diễn án Luật Nhân đạo quốc tế Vòng Quốc gia 2025</li>
        <li>Đại diện Việt Nam, Top 8 vòng Châu Á Thái Bình Dương – IHL 2025, Hồng Kông</li>
        <li>Trưởng ban Giám khảo Bảng Tiểu học – Vietnam Middle School Championship 2026</li>
        <li>Phó Trưởng ban Giám khảo – Hanoi BP Debating Championship 2025</li>
        <li>Quán quân – Hanoi Debate Tournament 2021</li>
        <li>Top Giám khảo xuất sắc nhất HDT 2023, NSDC 2023, VMDC 2023, HCM Debate Open 2024, HDT 2024</li>
      </ul>`
    },
    {
      name: 'Lương Hải Anh',
      role: 'Huấn luyện viên',
      img: 'image/section5_haianh.png',
      detail: `<ul>
        <li>IELTS Academic 8.0 Overall</li>
        <li>Trưởng Ban giám khảo – National Schools Debating Championships 2026</li>
        <li>Phó Trưởng ban giám khảo – VBC 2025; Vietnam Women and Queer Open 2023</li>
        <li>Giám khảo xuất sắc nhất – HDT 2025, NSDC 2025</li>
        <li>Á quân – Giải đấu Quốc tế Thượng Hải 2023; NEU Debate Open 2024</li>
        <li>Quý quân – VBC 2022</li>
      </ul>`
    }
  ];

  const track = document.getElementById('mentorTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');
  const overlay = document.getElementById('mentorOverlay');
  const popup = document.getElementById('mentorPopup');
  const popupClose = document.getElementById('popupClose');

  const VISIBLE = 4; // cards shown at once on desktop
  let currentIndex = 0;

  // Build dots
  const totalSlides = Math.ceil(mentorData.length / VISIBLE);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }

  function getVisibleCount() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : VISIBLE;
  }

  function updateCarousel() {
    const vis = getVisibleCount();
    const total = mentorData.length;
    const maxIdx = Math.max(0, total - vis);
    currentIndex = Math.min(currentIndex, maxIdx);

    const cardWidth = track.children[0]?.offsetWidth || 0;
    const gap = 24;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIdx;

    // dots
    const dotsTotal = Math.ceil(total / vis);
    const dots = dotsWrap.querySelectorAll('span');
    dots.forEach((d, i) => d.classList.toggle('active', i === Math.floor(currentIndex / vis)));
  }

  function goTo(slideIdx) {
    const vis = getVisibleCount();
    currentIndex = slideIdx * vis;
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => { currentIndex = Math.max(0, currentIndex - 1); updateCarousel(); });
  nextBtn.addEventListener('click', () => {
    const vis = getVisibleCount();
    const maxIdx = Math.max(0, mentorData.length - vis);
    currentIndex = Math.min(currentIndex + 1, maxIdx);
    updateCarousel();
  });

  window.addEventListener('resize', () => { currentIndex = 0; updateCarousel(); });

  // Click card to open popup
  document.querySelectorAll('.mentor-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.mentor);
      const m = mentorData[idx];
      document.getElementById('popupImg').src = m.img;
      document.getElementById('popupImg').alt = m.name;
      document.getElementById('popupName').textContent = m.name;
      document.getElementById('popupRole').textContent = m.role;
      document.getElementById('popupDetail').innerHTML = m.detail;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';

      document.querySelectorAll('.mentor-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.mentor-card').forEach(c => c.classList.remove('active'));
  }

  popupClose.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

  // Init carousel after layout
  setTimeout(updateCarousel, 50);

  /* ---------- Smooth scroll for CTA nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// ==========================================================================
// REGISTRATION MODAL FUNCTIONALITY
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Modal control utilities
  function openModal(modalEl) {
    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    modalEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Set up generic close buttons for all modals
  const closeButtons = document.querySelectorAll(".modal-close");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const openModalEl = e.target.closest(".modal-overlay");
      if (openModalEl) closeModal(openModalEl);
    });
  });

  // Close modal on overlay click
  const modalOverlays = document.querySelectorAll(".modal-overlay");
  modalOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Escape Key listener to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal-overlay.open");
      if (activeModal) closeModal(activeModal);
    }
  });

  // Registration form modal
  const registerModal = document.getElementById("registerModal");
  const registerForm = document.getElementById("registerForm");
  const registerSuccess = document.getElementById("registerSuccess");
  const regTriggers = document.querySelectorAll(".btn-register-trigger");

  regTriggers.forEach(btn => {
    btn.addEventListener("click", () => {
      registerForm.reset();
      registerForm.style.display = "flex";
      registerSuccess.style.display = "none";
      openModal(registerModal);
    });
  });

  // Form Submission
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        birthYear: document.getElementById("birthYear").value,
        role: document.getElementById("role").value,
        message: document.getElementById("message").value,
      };

      console.log("Submitting Register Form:", formData);

      const submitBtn = registerForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Đang gửi thông tin...";

      setTimeout(() => {
        registerForm.style.display = "none";
        registerSuccess.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.textContent = "Gửi thông tin đăng ký";
      }, 1200);
    });
  }

  const btnCloseSuccess = document.querySelector(".btn-close-success");
  if (btnCloseSuccess) {
    btnCloseSuccess.addEventListener("click", () => {
      closeModal(registerModal);
    });
  }
});