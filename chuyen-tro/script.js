// ==========================================================================
// STORY CONTENT DATA DICTIONARY
// ==========================================================================
const STORIES_DATA = {
    "1": {
        badge: "Câu chuyện 01",
        title: "Lần đầu mình hiểu rằng lắng nghe cũng là một kỹ năng",
        author: "Nguyễn Minh Anh • 15 tuổi",
        paragraphs: [
            "Ngày đầu tiên đến trại hè, mình khá ngại nói chuyện.",
            "Trong hoạt động Debate, mình luôn chuẩn bị rất nhiều ý để phản biện. Nhưng mentor lại yêu cầu cả nhóm dành vài phút chỉ để nghe đối phương trình bày. Lúc đó mình thấy khá lạ.",
            "Sau khi nghe xong, mình mới nhận ra có rất nhiều điều trước đó mình đã hiểu sai chỉ vì vội phản bác.",
            "Điều ấy cũng giống với cách mình nói chuyện với bố mẹ. Có những lần mình nghĩ bố mẹ không hiểu mình. Nhưng thật ra mình cũng chưa từng dành thời gian để hiểu vì sao bố mẹ lại nghĩ như vậy.",
            "Sau chuyến đi, điều thay đổi lớn nhất không phải là mình nói hay hơn. Mà là mình biết dừng lại để lắng nghe nhiều hơn."
        ],
        timeline: [
            { phase: "Trước trại hè", desc: "Ngại trao đổi ý kiến. Muốn bảo vệ quan điểm của mình ngay lập tức." },
            { phase: "Trong trại hè", desc: "Tham gia Debate. Học cách đặt câu hỏi và lắng nghe." },
            { phase: "Sau trại hè", desc: "Bình tĩnh hơn khi trao đổi. Chủ động lắng nghe trước khi phản hồi." }
        ]
    },
    "2": {
        badge: "Câu chuyện 02",
        title: "Những người bạn mình không nghĩ sẽ gặp",
        author: "Lê Gia Huy • 14 tuổi",
        paragraphs: [
            "Mình vốn khá hướng nội. Ngày đầu tiên mình gần như chỉ đi theo mentor.",
            "Trong một buổi làm việc nhóm, mình được xếp cùng các bạn đến từ nhiều tỉnh khác nhau. Ban đầu cả nhóm rất ngại.",
            "Nhưng khi cùng nhau nấu ăn, đi bộ vào bản và chuẩn bị cho đêm lửa trại, mọi người dần nói chuyện nhiều hơn.",
            "Có bạn rất hài hước. Có bạn kể cho mình nghe về cuộc sống ở nơi bạn sống. Có bạn còn hẹn sau này sẽ gặp lại.",
            "Mình nhận ra kết bạn không khó như mình từng nghĩ. Đôi khi chỉ cần một người chủ động mở lời trước."
        ],
        timeline: [
            { phase: "Trước", desc: "Ngại giao tiếp. Chỉ chơi với bạn quen." },
            { phase: "Trong", desc: "Làm việc nhóm. Sinh hoạt cùng các bạn." },
            { phase: "Sau", desc: "Chủ động kết nối. Tự tin hơn khi gặp người mới." }
        ]
    },
    "3": {
        badge: "Câu chuyện 03",
        title: "Điều mình mang về không nằm trong chiếc balo",
        author: "Trần Khánh Linh • 16 tuổi",
        paragraphs: [
            "Đế Xu Phình đẹp hơn mình tưởng. Nhưng điều khiến mình nhớ nhất lại không phải cảnh đẹp.",
            "Đó là những bữa cơm cùng người dân. Là lúc mọi người cùng ngồi kể chuyện sau một ngày dài. Là cách các em nhỏ trong bản luôn cười rất tươi và sẵn sàng chào hỏi người lạ.",
            "Có rất nhiều điều mình từng nghĩ là bình thường. Đến khi đi xa mới thấy đáng quý.",
            "Sau chuyến đi, mình bắt đầu dành nhiều thời gian hơn cho gia đình và bớt dành cả ngày chỉ để nhìn vào điện thoại."
        ],
        timeline: [
            { phase: "Trước", desc: "Nghĩ trại hè chỉ là một chuyến đi." },
            { phase: "Trong", desc: "Trải nghiệm cuộc sống tại Đế Xu Phình. Gặp gỡ người dân địa phương." },
            { phase: "Sau", desc: "Trân trọng gia đình hơn. Biết quan tâm đến mọi người nhiều hơn." }
        ]
    }
};

// ==========================================================================
// APP INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. STICKY NAVBAR SCROLL EVENT
    const mainHeader = document.getElementById("mainHeader");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
    });

    // 2. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpened = navMenu.classList.contains("open");
        menuToggle.innerHTML = isOpened ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu when clicking nav link
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // ==========================================================================
    // MODAL CONTROL UTILITIES
    // ==========================================================================
    function openModal(modalEl) {
        modalEl.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModal(modalEl) {
        modalEl.classList.remove("open");
        document.body.style.overflow = ""; // Restore scroll
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

    // ==========================================================================
    // MODAL 1: INDIVIDUAL STORY POPUP
    // ==========================================================================
    const storyModal = document.getElementById("storyModal");
    const modalStoryBadge = document.getElementById("modalStoryBadge");
    const modalStoryTitle = document.getElementById("modalStoryTitle");
    const modalStoryAuthor = document.getElementById("modalStoryAuthor");
    const modalStoryText = document.getElementById("modalStoryText");
    const modalStoryTimeline = document.getElementById("modalStoryTimeline");

    const readStoryButtons = document.querySelectorAll(".btn-read-story");
    readStoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const storyId = btn.getAttribute("data-story");
            const data = STORIES_DATA[storyId];
            
            if (data) {
                // Set Header Details
                modalStoryBadge.textContent = data.badge;
                modalStoryTitle.textContent = data.title;
                modalStoryAuthor.textContent = data.author;

                // Load Paragraphs
                modalStoryText.innerHTML = data.paragraphs
                    .map(p => `<p>${p}</p>`)
                    .join("");

                // Load Timeline Steps
                modalStoryTimeline.innerHTML = data.timeline
                    .map(step => `
                        <div class="timeline-step">
                            <span class="timeline-phase">${step.phase}</span>
                            <p class="timeline-desc">${step.desc}</p>
                        </div>
                    `)
                    .join("");

                openModal(storyModal);
            }
        });
    });

    // ==========================================================================
    // MODAL 2: MORE STORIES POPUP
    // ==========================================================================
    const moreStoriesModal = document.getElementById("moreStoriesModal");
    const btnMoreStories = document.getElementById("btnMoreStories");
    
    if (btnMoreStories) {
        btnMoreStories.addEventListener("click", () => {
            openModal(moreStoriesModal);
        });
    }

    // ==========================================================================
    // MODAL 3: MORE FEEDBACK POPUP
    // ==========================================================================
    const moreFeedbackModal = document.getElementById("moreFeedbackModal");
    const btnMoreFeedback = document.getElementById("btnMoreFeedback");
    
    if (btnMoreFeedback) {
        btnMoreFeedback.addEventListener("click", () => {
            openModal(moreFeedbackModal);
        });
    }

    // ==========================================================================
    // MODAL 4: REGISTRATION FORM POPUP
    // ==========================================================================
    const registerModal = document.getElementById("registerModal");
    const registerForm = document.getElementById("registerForm");
    const registerSuccess = document.getElementById("registerSuccess");
    const regTriggers = document.querySelectorAll(".btn-register-trigger");

    regTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            // Reset state
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
            
            // Gather input values (could send to backend / Google Sheets via fetch)
            const formData = {
                fullName: document.getElementById("fullName").value,
                phone: document.getElementById("phoneNumber").value,
                email: document.getElementById("email").value,
                birthYear: document.getElementById("birthYear").value,
                role: document.getElementById("role").value,
                message: document.getElementById("message").value,
            };
            
            console.log("Submitting Register Form:", formData);

            // Simulate server request delay
            const submitBtn = registerForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.textContent = "Đang gửi thông tin...";

            setTimeout(() => {
                // Success State transition
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

    // ==========================================================================
    // CHUYỆN PAGE INTERACTIVE COMPONENTS
    // ==========================================================================

    // 1. Parent Story Modal trigger
    const parentStoryModal = document.getElementById("parentStoryModal");
    const btnReadParentStory = document.querySelector(".btn-read-parent-story");
    if (btnReadParentStory && parentStoryModal) {
        btnReadParentStory.addEventListener("click", () => {
            openModal(parentStoryModal);
        });
    }

    // 2. Confession Form Modal triggers
    const confessionFormModal = document.getElementById("confessionFormModal");
    const btnOpenConfessionForm = document.getElementById("btnOpenConfessionForm");
    const confessionForm = document.getElementById("confessionForm");
    const confessionSuccess = document.getElementById("confessionSuccess");

    if (btnOpenConfessionForm && confessionFormModal) {
        btnOpenConfessionForm.addEventListener("click", () => {
            confessionForm.reset();
            confessionForm.style.display = "flex";
            confessionSuccess.style.display = "none";
            openModal(confessionFormModal);
        });
    }

    // Confession Form Submit Handler
    if (confessionForm) {
        confessionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = confessionForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.textContent = "Đang gửi tâm sự...";

            setTimeout(() => {
                confessionForm.style.display = "none";
                confessionSuccess.style.display = "block";
                submitBtn.disabled = false;
                submitBtn.textContent = "Gửi tâm sự của bạn";
            }, 1000);
        });
    }

    const btnCloseConfessionSuccess = document.querySelector(".btn-close-confession-success");
    if (btnCloseConfessionSuccess && confessionFormModal) {
        btnCloseConfessionSuccess.addEventListener("click", () => {
            closeModal(confessionFormModal);
        });
    }

    // 3. Confession Wall Carousel logic
    const confessionTrack = document.getElementById("confessionTrack");
    const confessionCards = document.querySelectorAll(".confession-card");
    const confessionPrev = document.getElementById("confessionPrev");
    const confessionNext = document.getElementById("confessionNext");
    const dotsContainer = document.getElementById("carouselDots");
    let currentConfessionIndex = 1; // Start with card 2 (index 1) active

    if (confessionTrack && confessionCards.length > 0) {
        const totalCards = confessionCards.length;

        function updateCarousel(index) {
            // Bounds check
            if (index < 0) index = totalCards - 1;
            if (index >= totalCards) index = 0;
            currentConfessionIndex = index;

            // Slide track
            const offset = -currentConfessionIndex * 100;
            confessionTrack.style.transform = `translateX(${offset}%)`;

            // Update card states
            confessionCards.forEach((card, i) => {
                if (i === currentConfessionIndex) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });

            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll(".dot");
                dots.forEach((dot, i) => {
                    if (i === currentConfessionIndex) {
                        dot.classList.add("active");
                    } else {
                        dot.classList.remove("active");
                    }
                });
            }
        }

        // Click nav arrows
        if (confessionPrev) {
            confessionPrev.addEventListener("click", () => {
                updateCarousel(currentConfessionIndex - 1);
            });
        }
        if (confessionNext) {
            confessionNext.addEventListener("click", () => {
                updateCarousel(currentConfessionIndex + 1);
            });
        }

        // Click dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach((dot, i) => {
                dot.addEventListener("click", () => {
                    updateCarousel(i);
                });
            });
        }

        // Initial setup
        updateCarousel(currentConfessionIndex);
    }

    // 4. Confession Card Like Button toggling
    const likeButtons = document.querySelectorAll(".confession-like-btn");
    likeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent modal trigger if card has one
            const isLiked = btn.getAttribute("data-liked") === "true";
            const likeCountEl = btn.querySelector(".like-count");
            let likes = parseInt(likeCountEl.textContent, 10);

            if (isLiked) {
                // Unlike
                btn.setAttribute("data-liked", "false");
                btn.classList.remove("liked");
                btn.querySelector("i").className = "fa-regular fa-heart";
                likes--;
            } else {
                // Like
                btn.setAttribute("data-liked", "true");
                btn.classList.add("liked");
                btn.querySelector("i").className = "fa-solid fa-heart";
                likes++;
                // Micro-animation bounce on click
                btn.style.transform = "scale(1.2)";
                setTimeout(() => btn.style.transform = "", 150);
            }
            likeCountEl.textContent = likes;
        });
    });

    // ==========================================================================
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const animatedElements = document.querySelectorAll("[data-aos]");
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("aos-animate");
                    observer.unobserve(entry.target); // Animates only once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.classList.add("aos-animate");
        });
    }
});