/*
================================================================
DEBUG ASSET BẮT BUỘC
================================================================

SECTION 1 HERO
anh_nen_hero.jpg

SECTION 3 TRAILER
media/mu-cang-chai-trailer.mp4
anh_nen_hero.jpg (Thumbnail fallback)

SECTION 4 GIÁ TRỊ NỔI BẬT
2.jpg (Popup tìm hiểu thêm)
3.jpg (Popup note thấu hiểu)
4.jpg (Popup note đối thoại)
5.jpg (Popup note trưởng thành)
ruong_bac_thang.jpg (Background section)

SECTION 5 HÀNH TRÌNH TRẢI NGHIỆM
card1_hieu.jpg (Card background 1)
card2_truyen_tro.jpg (Card background 2)
card3_tu_viet_cau_chuyen.jpg (Card background 3)

SECTION 6 GIỚI THIỆU SOCIOLOGIC
logo-sociologic.png (Logo popup)
anh_minh_hoa.JPG (Ảnh minh họa popup)
galery_anh_hoat_Dong.jpg (Gallery container)

================================================================
*/

// --- MANAGEMENT OF ABSENT PAGES (ALERT SYSTEM) ---
function handleMissingPage(event) {
    event.preventDefault();
    alert("Trang đang được phát triển");
    return false;
}

document.addEventListener("DOMContentLoaded", () => {

    // --- NAVBAR BURGER & RESPONSIVE MOBILE MENU ---
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const backgroundAudio = document.getElementById("backgroundAudio");
    const audioToggle = document.getElementById("audioToggle");

    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        navMenu.classList.toggle("mobile-open");
    });

    // Close menu when navigation path links clicked
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburgerBtn.classList.remove("active");
            navMenu.classList.remove("mobile-open");
        });
    });

    function setAudioState(isPlaying) {
        if (!audioToggle) return;

        audioToggle.classList.toggle("is-playing", isPlaying);
        audioToggle.setAttribute("aria-pressed", String(isPlaying));
        audioToggle.setAttribute(
            "aria-label",
            isPlaying ? "Tắt âm thanh nền" : "Phát âm thanh nền"
        );
    }

    audioToggle?.addEventListener("click", async () => {
        if (!backgroundAudio) return;

        if (backgroundAudio.paused) {
            try {
                backgroundAudio.volume = 0.7;
                await backgroundAudio.play();
            } catch (error) {
                setAudioState(false);
            }
            return;
        }

        backgroundAudio.pause();
    });

    backgroundAudio?.addEventListener("play", () => {
        setAudioState(true);
    });

    backgroundAudio?.addEventListener("pause", () => {
        if (!backgroundAudio.ended) {
            setAudioState(false);
        }
    });

    backgroundAudio?.addEventListener("ended", () => {
        setAudioState(false);
    });

    // --- STICKY NAV ON SCROLL ---
    const headerElement = document.querySelector(".main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            headerElement.classList.add("scrolled");
        } else {
            headerElement.classList.remove("scrolled");
        }
    });

    // --- HERO PARALLAX & HERO SCROLL DOWN ---
    const leftSide = document.querySelector(".left-side");
    const rightSide = document.querySelector(".right-side");
    const scrollDownBtn = document.getElementById("scrollDownBtn");

    window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        if (scrollPos < window.innerHeight) {
            // Soft differential parallax shifts
            leftSide.style.transform = `translateY(${scrollPos * 0.15}px)`;
            rightSide.style.transform = `translateY(${scrollPos * 0.08}px)`;
        }
    });

    scrollDownBtn.addEventListener("click", () => {
        const nextSection = document.getElementById("section-values");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    });

    // --- ANIMATIONS & TIMELINE PROGRESS VIA SCROLL ---
    const valueItems = document.querySelectorAll(".scroll-animate");
    const timelineProgress = document.getElementById("timelineProgress");
    const valuesSection = document.getElementById("section-values");

    const animateOnScroll = () => {
        if (!valuesSection) return;

        let sectionTop = valuesSection.offsetTop;
        let sectionHeight = valuesSection.offsetHeight;
        let windowScroll = window.scrollY;
        let windowHeight = window.innerHeight;

        // Animate elements visibility sequentially
        valueItems.forEach((item, index) => {
            let itemTriggerPoint = item.offsetTop + sectionTop - windowHeight + 100;
            if (windowScroll > itemTriggerPoint) {
                setTimeout(() => {
                    item.classList.add("visible");
                }, index * 150); // Staggered entry load
            }
        });

        // Compute path line rendering mapping
        let progressStart = sectionTop - windowHeight + 200;
        let progressEnd = sectionTop + sectionHeight - windowHeight;

        if (windowScroll > progressStart && windowScroll < progressEnd) {
            let totalSpread = progressEnd - progressStart;
            let currentOffset = windowScroll - progressStart;
            let finalPercentage = (currentOffset / totalSpread) * 100;
            timelineProgress.style.width = `${Math.min(Math.max(finalPercentage, 0), 100)}%`;
        } else if (windowScroll >= progressEnd) {
            timelineProgress.style.width = "100%";
        } else {
            timelineProgress.style.width = "0%";
        }
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Instant activation call check

    // --- COUNTER LOGIC VIA INTERSECTION OBSERVER ---
    const statsSection = document.getElementById("stats-section");
    const statNumbers = document.querySelectorAll(".stat-number");
    let countersStarted = false;

    const runCounters = () => {
        statNumbers.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute("data-target"), 10);
            let currentValue = 0;

            // Format displays matching original text request
            let appendText = "+";
            if (targetValue === 1000) appendText = "+ Học sinh";
            if (targetValue === 10) appendText = "+ Trại hè và Trại đông chuyên sâu";
            if (targetValue === 20) appendText = "+ Cuộc thi học thuật và giải tranh biện";
            if (targetValue === 50) appendText = "+ Vị trí giám khảo chuyên môn";

            let cycleSpeed = 30;
            let progressiveStep = Math.ceil(targetValue / 40);

            const timer = setInterval(() => {
                currentValue += progressiveStep;
                if (currentValue >= targetValue) {
                    clearInterval(timer);
                    counter.innerText = targetValue.toLocaleString('vi-VN') + appendText;
                } else {
                    counter.innerText = currentValue.toLocaleString('vi-VN') + "+";
                }
            }, cycleSpeed);
        });
    };

    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    runCounters();
                    statsObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    } else {
        // Fallback execution mechanics
        setTimeout(runCounters, 2000);
    }
});

// --- POPUPS ENGINE CONTROLLERS ---
function openPopup(popupId) {
    const modalElement = document.getElementById(popupId);
    if (modalElement) {
        modalElement.classList.add("active");
        document.body.style.overflow = "hidden"; // Retain scroll capture stability
    }
}

function closePopup(popupId) {
    const modalElement = document.getElementById(popupId);
    if (modalElement) {
        modalElement.classList.remove("active");
        document.body.style.overflow = ""; // Reactivate natural global context scrolling
    }
}

// --- TRAILER POPUP SPECIFIC HANDLERS ---
const videoPlayerModal = document.getElementById("popup-video-player");
const nativeVideo = document.getElementById("mainTrailerVideo");

function openVideoPopup() {
    if (videoPlayerModal && nativeVideo) {
        videoPlayerModal.classList.add("active");
        document.body.style.overflow = "hidden";
        nativeVideo.currentTime = 0;
        nativeVideo.play().catch(error => {
            console.log("Auto-play trigger variant captured: ", error);
        });
    }
}

function closeVideoPopup() {
    if (videoPlayerModal && nativeVideo) {
        videoPlayerModal.classList.remove("active");
        document.body.style.overflow = "";
        nativeVideo.pause();
    }
}

// --- FORM DISPATCH CONTROL SYSTEM ---
function handleFormSubmit(event) {
    event.preventDefault();
    // Closes parent modal window container seamlessly
    closePopup('popup-register');

    // External form routing matching requirement exactly
    const clientRedirectUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdWT-OEQNEdGnJjxMEb5JeJTMoPLL8IZgJX_9yKinmZUm02Xg/viewform?fbzx=1842672626731450041";
    window.open(clientRedirectUrl, '_blank');
}

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
