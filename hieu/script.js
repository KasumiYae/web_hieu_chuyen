// script.js
// DEBUG ASSET
// SECTION 1: khu_vuc_1_1.jpeg
// SECTION 2: khu_vuc_2_1.jpg, khu_vuc_2_2.jpeg, khu_vuc_2_3.jpg, khu_vuc_2_4.jpg, khu_vuc_2_5.jpg, khu_vuc_2_6.jpg, khu_vuc_2_7.jpg, khu_vuc_2_8.jpg
// SECTION 3: khu_vuc_3_1.jpg, khu_vuc_3_2.png
// SECTION 4: khu_vuc_4_1.jpg, khu_vuc_4_2.jpg, khu_vuc_4_3.JPG, khu_vuc_4_4.jpg, khu_vuc_4_5.JPG, khu_vuc_4_6.jpeg, khu_vuc_4_7.jpeg, khu_vuc_4_8.jpeg, khu_vuc_4_9.jpeg, khu_vuc_4_10.jpeg, khu_vuc_4_11.jpeg, khu_vuc_4_12.jpeg, khu_vuc_4_13.jpeg, khu_vuc_4_14.jpeg, khu_vuc_4_15.jpeg, khu_vuc_4_16.jpeg

// Global Navigation Missing Page Handler
function handleMissingPage(event) {
    event.preventDefault();
    alert("Trang đang được phát triển");
    return false;
}

// Mobile Navbar Hamburger Toggle Engine
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Popups Management Engine
function openPopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Popups Closer Engine
function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Background Overlay Click Dismissal
document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closePopup(this.id);
        }
    });
});

// Interactive Image Carousel Engine
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (!track || !nextBtn || !prevBtn) return;

    let currentIndex = 0;

    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4;
    }

    function updateSlider() {
        const slides = document.querySelectorAll('.slide');
        const maxIndex = slides.length - getSlidesPerView();
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 20; // sync with CSS layout gap
        const amountToMove = currentIndex * (slideWidth + gap);
        
        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.slide');
        const maxIndex = slides.length - getSlidesPerView();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Wrap back loop
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        const slides = document.querySelectorAll('.slide');
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - getSlidesPerView(); // Wrap forward loop
        }
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
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
