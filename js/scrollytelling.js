/* =========================================================
   PORTFOLIO PROJECTS
   GSAP SCROLLYTELLING + PROJECT MODAL + SEARCH + NAV
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

const portfolioReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPortfolio();

});


/* =========================================================
   MAIN PORTFOLIO INITIALIZATION
   ========================================================= */

function initPortfolio() {

    const section =
        document.getElementById(
            "portfolio-scrollytelling"
        );

    const deck =
        document.getElementById(
            "card-deck"
        );

    const counter =
        document.getElementById(
            "project-counter"
        );

    const progressFill =
        document.getElementById(
            "stack-progress"
        );

    const dots =
        gsap.utils.toArray(
            ".dot-nav-item"
        );

    const cards =
        gsap.utils.toArray(
            ".project-card-frame"
        );

    const infoCards =
        gsap.utils.toArray(
            ".info-card"
        );


    /* =====================================================
       MODAL HARUS SELALU DIINITIALISASI
       ===================================================== */

    initProjectModal(
        portfolioReducedMotion
    );


    /* =====================================================
       INTRO
       ===================================================== */

    initIntroAnimation(
        portfolioReducedMotion
    );


    /* =====================================================
       SCROLLYTELLING
       ===================================================== */

    if (
        section &&
        deck &&
        cards.length &&
        infoCards.length
    ) {

        const TOTAL =
            Math.min(
                cards.length,
                infoCards.length
            );


        initScrollytelling({

            section,
            deck,
            counter,
            progressFill,
            dots,
            cards,
            infoCards,
            TOTAL,
            prefersReducedMotion:
                portfolioReducedMotion

        });

    } else {

        console.warn(
            "Portfolio scrollytelling: required elements were not found."
        );

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    initProjectSearch();


    /* =====================================================
       FLOATING NAVIGATION
       ===================================================== */

    initFloatingNavigation();


    /* =====================================================
       RESPONSIVE INFO CARD
       ===================================================== */

    initResponsiveInfoCards();


    /* =====================================================
       MOBILE SCROLL SAFETY
       ===================================================== */

    initMobileScrollSafety();


    /* =====================================================
   GLOBAL RESIZE
   ===================================================== */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        /*
         * Mobile keyboard dapat memicu resize.
         *
         * Jangan refresh ScrollTrigger ketika
         * search input sedang aktif karena dapat
         * mengganggu viewport dan menyebabkan
         * keyboard tertutup.
         */

        if (
            window.matchMedia(
                "(max-width: 767px)"
            ).matches &&
            document.activeElement ===
                document.getElementById(
                    "project-search-input"
                )
        ) {

            return;

        }


        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    ScrollTrigger.refresh();

                },
                150
            );

    }
);


}


/* =========================================================
   INTRO ANIMATION
   ========================================================= */

function initIntroAnimation(
    prefersReducedMotion
) {

    const intro =
        document.querySelector(
            ".project-intro-content"
        );

    if (!intro) {
        return;
    }


    const label =
        intro.querySelector(
            ".project-intro-label"
        );

    const title =
        intro.querySelector(
            ".project-intro-title"
        );

    const description =
        intro.querySelector(
            ".project-intro-description"
        );

    const indicator =
        intro.querySelector(
            ".project-scroll-indicator"
        );


    if (prefersReducedMotion) {

        gsap.set(
            [
                label,
                title,
                description,
                indicator
            ],
            {
                clearProps: "all"
            }
        );

        return;
    }


    gsap.set(
        [
            label,
            title,
            description,
            indicator
        ],
        {
            opacity: 0,
            y: 20
        }
    );


    const timeline =
        gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });


    timeline

        .to(
            label,
            {
                opacity: 1,
                y: 0,
                duration: 0.6
            }
        )

        .to(
            title,
            {
                opacity: 1,
                y: 0,
                duration: 0.8
            },
            "-=0.35"
        )

        .to(
            description,
            {
                opacity: 1,
                y: 0,
                duration: 0.7
            },
            "-=0.45"
        )

        .to(
            indicator,
            {
                opacity: 1,
                y: 0,
                duration: 0.6
            },
            "-=0.35"
        );


    if (indicator) {

        gsap.to(
            indicator,
            {
                y: 6,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1
            }
        );

    }

}


/* =========================================================
   SCROLLYTELLING
   ========================================================= */

function initScrollytelling({

    section,
    deck,
    counter,
    progressFill,
    dots,
    cards,
    infoCards,
    TOTAL,
    prefersReducedMotion

}) {

    if (TOTAL <= 0) {
        return;
    }


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    if (prefersReducedMotion) {

        gsap.set(
            cards,
            {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                visibility: "visible",
                zIndex: 1
            }
        );


        infoCards.forEach(
            (card, index) => {

                gsap.set(
                    card,
                    {
                        opacity:
                            index === 0
                                ? 1
                                : 0,

                        y: 0,

                        visibility:
                            "visible",

                        pointerEvents:
                            index === 0
                                ? "auto"
                                : "none"
                    }
                );


                card.classList.toggle(
                    "is-active",
                    index === 0
                );

            }
        );


        if (counter) {
            counter.textContent = "01";
        }


        if (progressFill) {
            progressFill.style.width = "0%";
        }


        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "is-active",
                    index === 0
                );

            }
        );


        syncActiveInfoCard(
            0,
            infoCards
        );


        return;
    }


    /* =====================================================
       CLEAN OLD GSAP STATE
       ===================================================== */

    gsap.killTweensOf([
        ...cards,
        ...infoCards,
        deck
    ]);


    /* =====================================================
       INITIAL CARD DECK
       ===================================================== */

    cards.forEach(
        (card, index) => {

            if (index === 0) {

                gsap.set(
                    card,
                    {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                        visibility: "visible",
                        zIndex: 70
                    }
                );

            } else {

                gsap.set(
                    card,
                    {
                        x: 0,

                        y:
                            8 +
                            index * 6,

                        rotate:
                            (index % 2 === 0
                                ? 1
                                : -1) *
                            (4 + index * 1.6),

                        scale:
                            1 -
                            index * 0.018,

                        opacity: 1,

                        visibility:
                            "visible",

                        zIndex:
                            70 -
                            index
                    }
                );

            }

        }
    );


    /* =====================================================
       INITIAL INFO CARDS
       ===================================================== */

    infoCards.forEach(
        (card, index) => {

            gsap.set(
                card,
                {
                    opacity:
                        index === 0
                            ? 1
                            : 0,

                    y:
                        index === 0
                            ? 0
                            : 16,

                    visibility:
                        "visible",

                    pointerEvents:
                        index === 0
                            ? "auto"
                            : "none"
                }
            );


            card.classList.toggle(
                "is-active",
                index === 0
            );

        }
    );


    /* =====================================================
       MASTER TIMELINE
       ===================================================== */

    const timeline =
        gsap.timeline({

            defaults: {
                ease: "power2.inOut"
            },

            scrollTrigger: {

                trigger: section,

                start: "top top",

                end:
                    `+=${TOTAL * 90}%`,

                scrub: 1,

                pin: true,

                pinSpacing: true,

                anticipatePin: 1,

                invalidateOnRefresh: true,


                onUpdate: self => {

                    const progress =
                        self.progress;


                    /* -------------------------------------
                       PROGRESS
                       ------------------------------------- */

                    if (progressFill) {

                        gsap.set(
                            progressFill,
                            {
                                width:
                                    `${progress * 100}%`
                            }
                        );

                    }


                    /* -------------------------------------
                       ACTIVE INDEX
                       ------------------------------------- */

                    const activeIndex =
                        TOTAL <= 1
                            ? 0
                            : Math.min(
                                TOTAL - 1,
                                Math.max(
                                    0,
                                    Math.round(
                                        progress *
                                        (TOTAL - 1)
                                    )
                                )
                            );


                    /* -------------------------------------
                       COUNTER
                       ------------------------------------- */

                    if (counter) {

                        counter.textContent =
                            String(
                                activeIndex + 1
                            ).padStart(
                                2,
                                "0"
                            );

                    }


                    /* -------------------------------------
                       DOTS
                       ------------------------------------- */

                    dots.forEach(
                        (dot, index) => {

                            dot.classList.toggle(
                                "is-active",
                                index === activeIndex
                            );

                        }
                    );


                    /* -------------------------------------
                       IMPORTANT:
                       SYNC ACTIVE INFO CARD
                       ------------------------------------- */

                    syncActiveInfoCard(
                        activeIndex,
                        infoCards
                    );

                }

            }

        });


    /* =====================================================
       INITIAL HOLD
       ===================================================== */

    timeline.to(
        {},
        {
            duration: 0.2
        }
    );


    /* =====================================================
       PROJECT TRANSITIONS
       ===================================================== */

    for (
        let index = 0;
        index < TOTAL - 1;
        index++
    ) {

        const outgoing =
            cards[index];

        const incoming =
            cards[index + 1];

        const outgoingInfo =
            infoCards[index];

        const incomingInfo =
            infoCards[index + 1];


        const exitDirection =
            index % 2 === 0
                ? 1
                : -1;


        const position =
            index + 0.2;


        /* =================================================
           OUTGOING CARD
           ================================================= */

        timeline.to(
            outgoing,
            {
                x:
                    exitDirection *
                    480,

                y: -60,

                rotate:
                    exitDirection *
                    22,

                scale: 0.82,

                opacity: 0,

                duration: 0.7
            },
            position
        );


        /* =================================================
           INCOMING CARD
           ================================================= */

        timeline.to(
            incoming,
            {
                x: 0,

                y: 0,

                rotate: 0,

                scale: 1,

                opacity: 1,

                visibility: "visible",

                zIndex: 70,

                duration: 0.7
            },
            position
        );


        /* =================================================
           CAMERA PUSH
           ================================================= */

        timeline.to(
            deck,
            {
                scale: 1.035,

                duration: 0.32,

                ease: "sine.out"
            },
            position
        );


        timeline.to(
            deck,
            {
                scale: 1,

                duration: 0.38,

                ease: "sine.in"
            },
            position + 0.32
        );


        /* =================================================
           OUTGOING INFO
           ================================================= */

        timeline.to(
            outgoingInfo,
            {
                opacity: 0,

                y: -14,

                pointerEvents: "none",

                duration: 0.35,

                onStart: () => {

                    outgoingInfo.classList.remove(
                        "is-active"
                    );

                    outgoingInfo.style.pointerEvents =
                        "none";

                },

                onReverseComplete: () => {

                    outgoingInfo.classList.add(
                        "is-active"
                    );

                    outgoingInfo.style.pointerEvents =
                        "auto";

                }
            },
            position
        );


        /* =================================================
           INCOMING INFO
           ================================================= */

        timeline.to(
            incomingInfo,
            {
                opacity: 1,

                y: 0,

                pointerEvents: "auto",

                duration: 0.4,

                onStart: () => {

                    incomingInfo.classList.add(
                        "is-active"
                    );

                    incomingInfo.style.pointerEvents =
                        "auto";

                },

                onReverseComplete: () => {

                    incomingInfo.classList.remove(
                        "is-active"
                    );

                    incomingInfo.style.pointerEvents =
                        "none";

                }
            },
            position + 0.25
        );

    }


    /* =====================================================
       FINAL HOLD
       ===================================================== */

    timeline.to(
        {},
        {
            duration: 0.2
        }
    );


    /* =====================================================
       EXPOSE TIMELINE
       ===================================================== */

    window.portfolioScrollTimeline =
        timeline;


    /* =====================================================
       DOT NAVIGATION
       ===================================================== */

    dots.forEach(
        (dot, index) => {

            dot.style.cursor =
                "pointer";


            dot.addEventListener(
                "click",
                () => {

                    const st =
                        timeline.scrollTrigger;


                    if (!st) {
                        return;
                    }


                    const targetProgress =
                        TOTAL <= 1
                            ? 0
                            : index /
                              (TOTAL - 1);


                    const targetScroll =
                        st.start +
                        targetProgress *
                        (
                            st.end -
                            st.start
                        );


                    window.scrollTo({

                        top:
                            targetScroll,

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        }
    );


    /* =====================================================
       KEYBOARD
       ===================================================== */

    initKeyboardNavigation(
        timeline,
        TOTAL
    );

}


/* =========================================================
   ACTIVE INFO CARD SYNCHRONIZATION
   ========================================================= */

function syncActiveInfoCard(
    activeIndex,
    infoCards
) {

    infoCards.forEach(
        (card, index) => {

            const isActive =
                index === activeIndex;


            card.classList.toggle(
                "is-active",
                isActive
            );


            /*
             * SANGAT PENTING:
             *
             * Hanya card aktif yang boleh
             * menerima pointer/click.
             *
             * Ini memperbaiki masalah:
             * tombol project A terlihat,
             * tetapi yang menerima click adalah
             * tombol project B.
             */

            card.style.pointerEvents =
                isActive
                    ? "auto"
                    : "none";


            const buttons =
                card.querySelectorAll(
                    ".info-link, .info-detail-button, button, a"
                );


            buttons.forEach(
                button => {

                    button.style.pointerEvents =
                        isActive
                            ? "auto"
                            : "none";

                }
            );

        }
    );

}


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

function initKeyboardNavigation(
    timeline,
    TOTAL
) {

    document.addEventListener(
        "keydown",
        event => {

            const modal =
                document.getElementById(
                    "project-modal"
                );


            if (
                modal &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                return;

            }


            if (
                event.key === "ArrowDown" ||
                event.key === "PageDown"
            ) {

                event.preventDefault();

                moveToProject(
                    timeline,
                    1,
                    TOTAL
                );

            }


            if (
                event.key === "ArrowUp" ||
                event.key === "PageUp"
            ) {

                event.preventDefault();

                moveToProject(
                    timeline,
                    -1,
                    TOTAL
                );

            }

        }
    );

}


/* =========================================================
   MOVE TO PROJECT
   ========================================================= */

function moveToProject(
    timeline,
    direction,
    TOTAL
) {

    const st =
        timeline.scrollTrigger;


    if (!st) {
        return;
    }


    const currentIndex =
        Math.round(
            st.progress *
            (TOTAL - 1)
        );


    const targetIndex =
        Math.max(
            0,
            Math.min(
                TOTAL - 1,
                currentIndex + direction
            )
        );


    const targetProgress =
        TOTAL <= 1
            ? 0
            : targetIndex /
              (TOTAL - 1);


    const targetScroll =
        st.start +
        targetProgress *
        (
            st.end -
            st.start
        );


    window.scrollTo({

        top:
            targetScroll,

        behavior:
            portfolioReducedMotion
                ? "auto"
                : "smooth"

    });

}


/* =========================================================
   PROJECT MODAL
   ========================================================= */

function initProjectModal(
    prefersReducedMotion
) {

    const modal =
        document.getElementById(
            "project-modal"
        );


    if (!modal) {
        return;
    }


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const backdrop =
        modal.querySelector(
            ".project-modal-backdrop"
        );

    const content =
        modal.querySelector(
            ".project-modal-content"
        );

    const closeButton =
        document.getElementById(
            "modal-close"
        );

    const closeBottom =
        document.getElementById(
            "modal-close-bottom"
        );

    const mainImage =
        document.getElementById(
            "modal-main-image"
        );

    const thumbnailRow =
        document.getElementById(
            "thumbnail-row"
        );

    const galleryPrev =
        document.getElementById(
            "gallery-prev"
        );

    const galleryNext =
        document.getElementById(
            "gallery-next"
        );

    const galleryCurrent =
        document.getElementById(
            "gallery-current"
        );

    const galleryTotal =
        document.getElementById(
            "gallery-total"
        );

    const modalTitle =
        document.getElementById(
            "modal-project-title"
        );

    const modalSecondaryTitle =
        document.getElementById(
            "modal-project-title-secondary"
        );

    const modalDescription =
        document.getElementById(
            "modal-project-description"
        );

    const modalTags =
        document.getElementById(
            "modal-project-tags"
        );


    /* =====================================================
       MODAL STATE
       ===================================================== */

    let currentImages = [];

    let currentImageIndex = 0;

    let isModalOpen = false;

    let lastFocusedElement = null;


    /* =====================================================
       GLOBAL OPEN FUNCTION
       ===================================================== */

    window.openProjectModal =
        function (
            title,
            description,
            mainImagePath,
            images,
            technologies
        ) {

            /* ---------------------------------------------
               NORMALIZE DATA
               --------------------------------------------- */

            title =
                title ||
                "Project";


            description =
                description ||
                "";


            if (
                !Array.isArray(images) ||
                !images.length
            ) {

                images =
                    mainImagePath
                        ? [mainImagePath]
                        : [];

            }


            if (
                !Array.isArray(
                    technologies
                )
            ) {

                technologies = [];

            }


            /* ---------------------------------------------
               IMPORTANT:
               COPY ARRAY AGAR PROJECT SEBELUMNYA
               TIDAK MEMENGARUHI PROJECT BARU
               --------------------------------------------- */

            currentImages =
                images
                    .filter(
                        image =>
                            typeof image ===
                            "string" &&
                            image.trim() !== ""
                    )
                    .map(
                        image =>
                            image.trim()
                    );


            currentImageIndex = 0;


            /* ---------------------------------------------
               SAVE FOCUS
               --------------------------------------------- */

            lastFocusedElement =
                document.activeElement;


            /* ---------------------------------------------
               UPDATE TITLE
               --------------------------------------------- */

            if (modalTitle) {

                modalTitle.textContent =
                    title;

            }


            if (modalSecondaryTitle) {

                modalSecondaryTitle.textContent =
                    title;

            }


            /* ---------------------------------------------
               UPDATE DESCRIPTION
               --------------------------------------------- */

            if (modalDescription) {

                modalDescription.textContent =
                    description;

            }


            /* ---------------------------------------------
               UPDATE TAGS
               --------------------------------------------- */

            renderModalTags(
                modalTags,
                technologies
            );


            /* ---------------------------------------------
               RENDER GALLERY
               --------------------------------------------- */

            renderGallery(
                thumbnailRow,
                currentImages,
                currentImageIndex
            );


            /* ---------------------------------------------
               UPDATE MAIN IMAGE
               --------------------------------------------- */

            updateGalleryImage(
                mainImage,
                galleryCurrent,
                galleryTotal,
                currentImages,
                currentImageIndex,
                prefersReducedMotion
            );


            /* ---------------------------------------------
               UPDATE BUTTON STATES
               --------------------------------------------- */

            updateGalleryControls(
                galleryPrev,
                galleryNext,
                currentImages.length
            );


            /* ---------------------------------------------
               OPEN
               --------------------------------------------- */

            isModalOpen = true;


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );


            openModal(
                modal,
                prefersReducedMotion
            );


            /* ---------------------------------------------
               FOCUS
               --------------------------------------------- */

            window.setTimeout(
                () => {

                    if (closeButton) {

                        closeButton.focus();

                    }

                },
                prefersReducedMotion
                    ? 0
                    : 100
            );

        };


    /* =====================================================
       CLOSE
       ===================================================== */

    function closeProjectModal() {

        if (!isModalOpen) {
            return;
        }


        isModalOpen = false;


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        closeModal(
            modal,
            prefersReducedMotion
        );


        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus ===
                "function"
        ) {

            window.setTimeout(
                () => {

                    try {

                        lastFocusedElement.focus();

                    } catch (error) {

                        /* Ignore focus errors */

                    }

                },
                prefersReducedMotion
                    ? 0
                    : 300
            );

        }

    }


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                closeProjectModal();

            }
        );

    }


    if (closeBottom) {

        closeBottom.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                closeProjectModal();

            }
        );

    }


    /* =====================================================
       BACKDROP
       ===================================================== */

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    backdrop
                ) {

                    closeProjectModal();

                }

            }
        );

    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                changeGalleryImage(
                    -1,
                    mainImage,
                    galleryCurrent,
                    galleryTotal,
                    thumbnailRow,
                    galleryPrev,
                    galleryNext,
                    prefersReducedMotion
                );

            }
        );

    }


    /* =====================================================
       NEXT
       ===================================================== */

    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                changeGalleryImage(
                    1,
                    mainImage,
                    galleryCurrent,
                    galleryTotal,
                    thumbnailRow,
                    galleryPrev,
                    galleryNext,
                    prefersReducedMotion
                );

            }
        );

    }


    /* =====================================================
       THUMBNAILS
       ===================================================== */

    if (thumbnailRow) {

        thumbnailRow.addEventListener(
            "click",
            event => {

                const thumbnail =
                    event.target.closest(
                        "[data-gallery-index]"
                    );


                if (!thumbnail) {
                    return;
                }


                const index =
                    Number(
                        thumbnail.dataset
                            .galleryIndex
                    );


                if (
                    Number.isNaN(index) ||
                    !currentImages[index]
                ) {

                    return;

                }


                currentImageIndex =
                    index;


                updateGalleryImage(
                    mainImage,
                    galleryCurrent,
                    galleryTotal,
                    currentImages,
                    currentImageIndex,
                    prefersReducedMotion
                );


                updateThumbnailState(
                    thumbnailRow,
                    currentImageIndex
                );


                updateGalleryControls(
                    galleryPrev,
                    galleryNext,
                    currentImages.length
                );


                scrollThumbnailIntoView(
                    thumbnailRow,
                    currentImageIndex
                );

            }
        );

    }


    /* =====================================================
       KEYBOARD
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (!isModalOpen) {
                return;
            }


            /* ---------------------------------------------
               ESC
               --------------------------------------------- */

            if (
                event.key === "Escape"
            ) {

                event.preventDefault();

                closeProjectModal();

                return;

            }


            /* ---------------------------------------------
               LEFT
               --------------------------------------------- */

            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                changeGalleryImage(
                    -1,
                    mainImage,
                    galleryCurrent,
                    galleryTotal,
                    thumbnailRow,
                    galleryPrev,
                    galleryNext,
                    prefersReducedMotion
                );

                return;

            }


            /* ---------------------------------------------
               RIGHT
               --------------------------------------------- */

            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                changeGalleryImage(
                    1,
                    mainImage,
                    galleryCurrent,
                    galleryTotal,
                    thumbnailRow,
                    galleryPrev,
                    galleryNext,
                    prefersReducedMotion
                );

            }

        }
    );


    /* =====================================================
       STOP WHEEL PROPAGATION
       ===================================================== */

    if (content) {

        content.addEventListener(
            "wheel",
            event => {

                event.stopPropagation();

            },
            {
                passive: true
            }
        );

    }

}


/* =========================================================
   MODAL TAGS
   ========================================================= */

function renderModalTags(
    container,
    technologies
) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    technologies.forEach(
        technology => {

            if (
                technology === null ||
                technology === undefined
            ) {

                return;

            }


            const tag =
                document.createElement(
                    "span"
                );


            tag.className =
                "modal-tech-tag";


            tag.textContent =
                String(
                    technology
                );


            container.appendChild(
                tag
            );

        }
    );

}


/* =========================================================
   RENDER GALLERY
   ========================================================= */

function renderGallery(
    container,
    images,
    activeIndex
) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    images.forEach(
        (image, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "gallery-thumbnail";


            button.dataset.galleryIndex =
                String(index);


            button.setAttribute(
                "aria-label",
                `View image ${index + 1}`
            );


            button.setAttribute(
                "aria-current",
                index === activeIndex
                    ? "true"
                    : "false"
            );


            if (
                index === activeIndex
            ) {

                button.classList.add(
                    "is-active"
                );

            }


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                image;


            img.alt =
                `Project screenshot ${index + 1}`;


            img.loading =
                index === 0
                    ? "eager"
                    : "lazy";


            img.decoding =
                "async";


            img.addEventListener(
                "error",
                () => {

                    button.classList.add(
                        "is-error"
                    );

                }
            );


            button.appendChild(
                img
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   UPDATE GALLERY IMAGE
   ========================================================= */

function updateGalleryImage(

    mainImage,
    currentElement,
    totalElement,
    images,
    index,
    prefersReducedMotion

) {

    if (
        !mainImage ||
        !images.length ||
        !images[index]
    ) {

        if (currentElement) {
            currentElement.textContent = "0";
        }

        if (totalElement) {
            totalElement.textContent =
                String(images.length);
        }

        return;
    }


    const imagePath =
        images[index];


    mainImage.alt =
        `Project preview ${index + 1}`;


    if (currentElement) {

        currentElement.textContent =
            String(index + 1);

    }


    if (totalElement) {

        totalElement.textContent =
            String(images.length);

    }


    /* =====================================================
       CANCEL OLD IMAGE ANIMATION
       ===================================================== */

    gsap.killTweensOf(
        mainImage
    );


    /* =====================================================
       IMAGE CHANGE
       ===================================================== */

    if (
        prefersReducedMotion
    ) {

        mainImage.src =
            imagePath;

        return;

    }


    const currentSrc =
        mainImage.getAttribute(
            "src"
        );


    if (
        !currentSrc ||
        currentSrc === imagePath
    ) {

        mainImage.src =
            imagePath;

        gsap.set(
            mainImage,
            {
                opacity: 1
            }
        );

        return;

    }


    gsap.to(
        mainImage,
        {
            opacity: 0,

            duration: 0.12,

            ease: "power1.out",

            onComplete: () => {

                mainImage.src =
                    imagePath;


                gsap.to(
                    mainImage,
                    {
                        opacity: 1,

                        duration: 0.25,

                        ease: "power2.out"
                    }
                );

            }
        }
    );

}


/* =========================================================
   CHANGE GALLERY IMAGE
   ========================================================= */

function changeGalleryImage(

    direction,

    mainImage,
    currentElement,
    totalElement,
    thumbnailRow,
    galleryPrev,
    galleryNext,
    prefersReducedMotion

) {

    if (
        !currentImages.length
    ) {

        return;

    }


    currentImageIndex +=
        direction;


    if (
        currentImageIndex < 0
    ) {

        currentImageIndex =
            currentImages.length - 1;

    }


    if (
        currentImageIndex >=
        currentImages.length
    ) {

        currentImageIndex = 0;

    }


    updateGalleryImage(
        mainImage,
        currentElement,
        totalElement,
        currentImages,
        currentImageIndex,
        prefersReducedMotion
    );


    updateThumbnailState(
        thumbnailRow,
        currentImageIndex
    );


    updateGalleryControls(
        galleryPrev,
        galleryNext,
        currentImages.length
    );


    scrollThumbnailIntoView(
        thumbnailRow,
        currentImageIndex
    );

}


/* =========================================================
   GALLERY CONTROL STATE
   ========================================================= */

function updateGalleryControls(
    previousButton,
    nextButton,
    total
) {

    const disabled =
        total <= 1;


    if (previousButton) {

        previousButton.disabled =
            disabled;

        previousButton.setAttribute(
            "aria-disabled",
            disabled
                ? "true"
                : "false"
        );

    }


    if (nextButton) {

        nextButton.disabled =
            disabled;

        nextButton.setAttribute(
            "aria-disabled",
            disabled
                ? "true"
                : "false"
        );

    }

}


/* =========================================================
   THUMBNAIL ACTIVE STATE
   ========================================================= */

function updateThumbnailState(
    container,
    activeIndex
) {

    if (!container) {
        return;
    }


    const thumbnails =
        container.querySelectorAll(
            "[data-gallery-index]"
        );


    thumbnails.forEach(
        thumbnail => {

            const index =
                Number(
                    thumbnail.dataset
                        .galleryIndex
                );


            const active =
                index === activeIndex;


            thumbnail.classList.toggle(
                "is-active",
                active
            );


            thumbnail.setAttribute(
                "aria-current",
                active
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   SCROLL ACTIVE THUMBNAIL
   ========================================================= */

function scrollThumbnailIntoView(
    container,
    index
) {

    if (!container) {
        return;
    }


    const thumbnail =
        container.querySelector(
            `[data-gallery-index="${index}"]`
        );


    if (!thumbnail) {
        return;
    }


    thumbnail.scrollIntoView({

        behavior:
            portfolioReducedMotion
                ? "auto"
                : "smooth",

        block:
            "nearest",

        inline:
            "center"

    });

}


/* =========================================================
   OPEN MODAL
   ========================================================= */

function openModal(
    modal,
    prefersReducedMotion
) {

    modal.classList.add(
        "is-open"
    );


    if (prefersReducedMotion) {

        gsap.set(
            modal,
            {
                opacity: 1
            }
        );

        return;

    }


    const content =
        modal.querySelector(
            ".project-modal-content"
        );


    gsap.killTweensOf([
        modal,
        content
    ]);


    gsap.set(
        modal,
        {
            opacity: 0
        }
    );


    if (content) {

        gsap.set(
            content,
            {
                opacity: 0,
                y: 30,
                scale: 0.97
            }
        );

    }


    const timeline =
        gsap.timeline();


    timeline.to(
        modal,
        {
            opacity: 1,

            duration: 0.2,

            ease: "power2.out"
        }
    );


    if (content) {

        timeline.to(
            content,
            {
                opacity: 1,

                y: 0,

                scale: 1,

                duration: 0.45,

                ease: "power3.out"
            },
            "-=0.08"
        );

    }

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal(
    modal,
    prefersReducedMotion
) {

    const content =
        modal.querySelector(
            ".project-modal-content"
        );


    if (prefersReducedMotion) {

        modal.classList.remove(
            "is-open"
        );

        gsap.set(
            modal,
            {
                clearProps:
                    "opacity"
            }
        );

        if (content) {

            gsap.set(
                content,
                {
                    clearProps:
                        "opacity,transform"
                }
            );

        }

        return;

    }


    gsap.killTweensOf([
        modal,
        content
    ]);


    const timeline =
        gsap.timeline({

            onComplete: () => {

                modal.classList.remove(
                    "is-open"
                );


                gsap.set(
                    modal,
                    {
                        clearProps:
                            "opacity"
                    }
                );


                if (content) {

                    gsap.set(
                        content,
                        {
                            clearProps:
                                "opacity,transform"
                        }
                    );

                }

            }

        });


    if (content) {

        timeline.to(
            content,
            {
                opacity: 0,

                y: 20,

                scale: 0.98,

                duration: 0.25,

                ease: "power2.in"
            }
        );

    }


    timeline.to(
        modal,
        {
            opacity: 0,

            duration: 0.2,

            ease: "power1.in"
        },
        "-=0.1"
    );

}


/* =========================================================
   GLOBAL IMAGE ERROR
   ========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;


        if (
            element instanceof
            HTMLImageElement
        ) {

            element.classList.add(
                "image-load-error"
            );

        }

    },
    true
);


/* =========================================================
   PAGE SHOW SAFETY
   ========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        /*
         * Jangan meninggalkan body terkunci
         * setelah browser melakukan back/forward cache.
         */

        document.body.classList.remove(
            "modal-open"
        );

    }
);




/* =========================================================
   FLOATING NAVIGATION
   ========================================================= */

function initFloatingNavigation() {

    const floatingNav =
        document.getElementById(
            "floating-nav"
        );

    const trigger =
        document.getElementById(
            "floating-nav-trigger"
        );

    const menu =
        document.getElementById(
            "floating-nav-menu"
        );


    if (
        !floatingNav ||
        !trigger ||
        !menu
    ) {

        return;

    }


    const items =
        Array.from(
            menu.querySelectorAll(
                ".floating-nav-item"
            )
        );


    const prefersReducedMotion =
        portfolioReducedMotion;


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    let currentPage = "";


    if (
        currentPath === "" ||
        currentPath === "index.html"
    ) {

        currentPage =
            "home";

    } else if (
        currentPath === "project.html"
    ) {

        currentPage =
            "projects";

    }


    items.forEach(
        item => {

            if (
                item.dataset.page ===
                currentPage
            ) {

                item.classList.add(
                    "is-active"
                );

                item.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }
    );


    const hasGSAP =
        typeof gsap !== "undefined";


    /* =====================================================
       OPEN
       ===================================================== */

    function openMenu() {

        floatingNav.classList.add(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );


        trigger.setAttribute(
            "aria-label",
            "Close navigation"
        );


        menu.setAttribute(
            "aria-hidden",
            "false"
        );


        if (
            hasGSAP &&
            !prefersReducedMotion
        ) {

            gsap.killTweensOf(
                items
            );


            gsap.to(
                items,
                {
                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: 0.35,

                    stagger: 0.055,

                    ease:
                        "power3.out"
                }
            );

        } else {

            items.forEach(
                item => {

                    item.style.opacity =
                        "1";

                    item.style.transform =
                        "translateY(0) scale(1)";

                }
            );

        }

    }


    /* =====================================================
       CLOSE
       ===================================================== */

    function closeMenu() {

        floatingNav.classList.remove(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );


        trigger.setAttribute(
            "aria-label",
            "Open navigation"
        );


        menu.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            hasGSAP &&
            !prefersReducedMotion
        ) {

            gsap.killTweensOf(
                items
            );


            gsap.to(
                items,
                {
                    opacity: 0,

                    y: 12,

                    scale: 0.96,

                    duration: 0.22,

                    stagger: 0.035,

                    ease:
                        "power2.in"
                }
            );

        } else {

            items.forEach(
                item => {

                    item.style.opacity =
                        "0";

                    item.style.transform =
                        "translateY(12px) scale(0.96)";

                }
            );

        }

    }


    /* =====================================================
       TOGGLE
       ===================================================== */

    trigger.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (
                floatingNav.classList.contains(
                    "is-open"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /* =====================================================
       NAV ITEMS
       ===================================================== */

    items.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        }
    );


    /* =====================================================
       CLICK OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !floatingNav.contains(
                    event.target
                )
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                floatingNav.classList.contains(
                    "is-open"
                )
            ) {

                event.preventDefault();

                closeMenu();

                trigger.focus();

            }

        }
    );


    /* =====================================================
       INITIAL
       ===================================================== */

    items.forEach(
        item => {

            item.style.opacity =
                "0";

        }
    );

}


/* =========================================================
   RESPONSIVE INFO CARD SAFETY
   =========================================================
   
   IMPORTANT FIX:
   Tidak lagi membuat SEMUA button clickable.

   Hanya .info-card.is-active yang menerima pointer.
   ========================================================= */

function initResponsiveInfoCards() {

    const stage =
        document.getElementById(
            "stage"
        );

    const infoPanel =
        document.querySelector(
            ".info-panel"
        );

    const infoCards =
        Array.from(
            document.querySelectorAll(
                ".info-card"
            )
        );


    if (
        !stage ||
        !infoPanel ||
        !infoCards.length
    ) {

        return;

    }


    function isMobile() {

        return window.matchMedia(
            "(max-width: 767px)"
        ).matches;

    }


    function isSmallMobile() {

        return window.matchMedia(
            "(max-width: 480px)"
        ).matches;

    }


    function isLandscapeMobile() {

        return window.matchMedia(
            "(max-width: 767px) and (orientation: landscape)"
        ).matches;

    }


    /* =====================================================
       ACTIVE CARD
       ===================================================== */

    function getActiveInfoCard() {

        return (
            infoCards.find(
                card =>
                    card.classList.contains(
                        "is-active"
                    )
            ) ||
            infoCards[0]
        );

    }


    /* =====================================================
       SYNC POINTERS
       ===================================================== */

    function syncButtons() {

        const active =
            getActiveInfoCard();


        infoCards.forEach(
            card => {

                const isActive =
                    card === active;


                /*
                 * CARD INACTIVE = TIDAK BOLEH CLICK
                 */

                card.style.pointerEvents =
                    isActive
                        ? "auto"
                        : "none";


                const buttons =
                    card.querySelectorAll(
                        ".info-link, .info-detail-button, button, a"
                    );


                buttons.forEach(
                    button => {

                        button.style.pointerEvents =
                            isActive
                                ? "auto"
                                : "none";


                        /*
                         * Jangan paksa visibility.
                         *
                         * CSS / GSAP yang menentukan
                         * apakah elemen terlihat.
                         */

                    }
                );

            }
        );

    }


    /* =====================================================
       PANEL
       ===================================================== */

    function normalizeInfoPanel() {

        const active =
            getActiveInfoCard();


        infoPanel.style.height =
            "auto";


        infoPanel.style.overflow =
            "visible";


        infoPanel.style.minHeight =
            isSmallMobile()
                ? "390px"
                : isMobile()
                    ? "360px"
                    : "380px";


        infoCards.forEach(
            card => {

                card.style.overflow =
                    "visible";

                card.style.height =
                    "auto";

            }
        );


        if (active) {

            const actions =
                active.querySelector(
                    ".info-actions"
                );


            if (actions) {

                actions.style.overflow =
                    "visible";

                actions.style.paddingBottom =
                    isMobile()
                        ? "8px"
                        : "5px";

            }

        }

    }


    /* =====================================================
       STAGE
       ===================================================== */

    function normalizeStage() {

        stage.style.overflow =
            "visible";


        if (isMobile()) {

            stage.style.height =
                "auto";

            stage.style.minHeight =
                "100%";

        }


        if (isLandscapeMobile()) {

            infoPanel.style.minHeight =
                "300px";

        }

    }


    /* =====================================================
       PANEL HEIGHT
       ===================================================== */

    function updatePanelHeight() {

        const active =
            getActiveInfoCard();


        if (!active) {
            return;
        }


        const contentHeight =
            active.scrollHeight;


        if (!contentHeight) {
            return;
        }


        const minimumHeight =
            isSmallMobile()
                ? 390
                : isMobile()
                    ? 360
                    : 380;


        infoPanel.style.minHeight =
            Math.max(
                minimumHeight,
                contentHeight
            ) + "px";

    }


    /* =====================================================
       APPLY
       ===================================================== */

    function applyResponsiveFix() {

        normalizeStage();

        normalizeInfoPanel();

        syncButtons();

        updatePanelHeight();

    }


    /* =====================================================
       INITIAL
       ===================================================== */

    applyResponsiveFix();


    requestAnimationFrame(
        applyResponsiveFix
    );


    setTimeout(
        applyResponsiveFix,
        250
    );


    setTimeout(
        applyResponsiveFix,
        700
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        applyResponsiveFix();

                    },
                    120
                );

        }
    );


    /* =====================================================
       ORIENTATION
       ===================================================== */

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                applyResponsiveFix,
                200
            );

        }
    );


    /* =====================================================
       WATCH ACTIVE CARD
       ===================================================== */

    const observer =
        new MutationObserver(
            mutations => {

                let changed = false;


                mutations.forEach(
                    mutation => {

                        if (
                            mutation.type ===
                                "attributes" &&
                            mutation.attributeName ===
                                "class"
                        ) {

                            changed = true;

                        }

                    }
                );


                if (changed) {

                    requestAnimationFrame(
                        () => {

                            applyResponsiveFix();

                        }
                    );

                }

            }
        );


    infoCards.forEach(
        card => {

            observer.observe(
                card,
                {
                    attributes: true,
                    attributeFilter: [
                        "class"
                    ]
                }
            );

        }
    );


    /* =====================================================
       IMAGE LOAD
       ===================================================== */

    infoCards.forEach(
        card => {

            const images =
                card.querySelectorAll(
                    "img"
                );


            images.forEach(
                image => {

                    if (
                        image.complete
                    ) {

                        return;

                    }


                    image.addEventListener(
                        "load",
                        applyResponsiveFix,
                        {
                            once: true
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       FONT LOAD
       ===================================================== */

    if (
        document.fonts &&
        document.fonts.ready
    ) {

        document.fonts.ready.then(
            applyResponsiveFix
        );

    }

}


/* =========================================================
   MOBILE PAGE SCROLL SAFETY
   ========================================================= */

function initMobileScrollSafety() {

    function unlockPageScroll() {

        /*
         * Jangan mengunci page secara global.
         * Modal akan menambahkan .modal-open ketika aktif.
         */

        if (
            document.body.classList.contains(
                "modal-open"
            )
        ) {

            return;

        }


        document.documentElement.style.overflowX =
            "hidden";

        document.documentElement.style.overflowY =
            "auto";

        document.body.style.overflowX =
            "hidden";

        document.body.style.overflowY =
            "auto";

        document.documentElement.style.height =
            "auto";

        document.body.style.height =
            "auto";

    }


    unlockPageScroll();


    window.addEventListener(
        "resize",
        unlockPageScroll
    );


    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                unlockPageScroll,
                300
            );

        }
    );


    /* =====================================================
       FLOATING NAV
       ===================================================== */

    const floatingNav =
        document.getElementById(
            "floating-nav"
        );

    const trigger =
        document.getElementById(
            "floating-nav-trigger"
        );


    if (
        floatingNav &&
        trigger
    ) {

        trigger.addEventListener(
            "click",
            () => {

                setTimeout(
                    unlockPageScroll,
                    50
                );

            }
        );

    }


    /* =====================================================
       MODAL CLOSE
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const closeButton =
                event.target.closest(
                    "#modal-close, #modal-close-bottom"
                );


            if (closeButton) {

                setTimeout(
                    unlockPageScroll,
                    350
                );

            }

        }
    );

}


/* =========================================================
   END
   ========================================================= */
/* =========================================================
   PROJECT FILTER + SEARCH SYSTEM
   =========================================================

   COPY-PASTE THIS ENTIRE BLOCK AT THE VERY BOTTOM
   OF scrollytelling.js

   FEATURES:
   - Category filter
   - Search
   - Search + category combined
   - Dynamic counter
   - Dynamic total
   - Dynamic dots
   - Dynamic scrollytelling sequence
   - Dynamic keyboard navigation
   - Filter reset to first project
   - Compatible with existing project modal
   ========================================================= */


/* =========================================================
   FILTER SYSTEM STATE
   ========================================================= */

window.portfolioFilterState = {

    category: "all",

    search: "",

    activeIndex: 0,

    activeProjects: [],

    initialized: false

};


/* =========================================================
   OVERRIDE INIT PORTFOLIO
   =========================================================

   Function declaration ini sengaja diletakkan di bawah.
   JavaScript akan menggunakan versi ini ketika
   DOMContentLoaded memanggil initPortfolio().
   ========================================================= */

function initPortfolio() {

    const section =
        document.getElementById(
            "portfolio-scrollytelling"
        );

    if (!section) {
        return;
    }


    /* =====================================================
       EXISTING COMPONENTS
       ===================================================== */

    initProjectModal(
        portfolioReducedMotion
    );


    initIntroAnimation(
        portfolioReducedMotion
    );


    initFloatingNavigation();


    initResponsiveInfoCards();


    initMobileScrollSafety();


    /* =====================================================
       NEW FILTER / SEARCH SYSTEM
       ===================================================== */

    initProjectFilterSystem();

}


/* =========================================================
   MAIN FILTER SYSTEM
   ========================================================= */

function initProjectFilterSystem() {

    if (
        window.__portfolioFilterInitialized
    ) {

        return;

    }


    window.__portfolioFilterInitialized =
        true;


    /* =====================================================
       DOM
       ===================================================== */

    const section =
        document.getElementById(
            "portfolio-scrollytelling"
        );

    const deck =
        document.getElementById(
            "card-deck"
        );

    const counter =
        document.getElementById(
            "project-counter"
        );

    const counterTotal =
        document.querySelector(
            ".project-counter-total"
        );

    const progressFill =
        document.getElementById(
            "stack-progress"
        );

    const searchInput =
        document.getElementById(
            "project-search-input"
        );

    const searchClear =
        document.getElementById(
            "project-search-clear"
        );

    const searchResult =
        document.getElementById(
            "project-search-result"
        );

    const categorySelect =
        document.getElementById(
            "project-category-select"
        );

    const dotNav =
        document.getElementById(
            "dot-nav"
        );


    if (
        !section ||
        !deck
    ) {

        console.warn(
            "Portfolio filter: required elements not found."
        );

        return;

    }


    /* =====================================================
       ORIGINAL PROJECT ELEMENTS
       ===================================================== */

    const cards =
        Array.from(
            deck.querySelectorAll(
                ".project-card-frame"
            )
        );


    const infoCards =
        Array.from(
            document.querySelectorAll(
                ".info-card"
            )
        );


    const totalProjects =
        Math.min(
            cards.length,
            infoCards.length
        );


    if (!totalProjects) {
        return;
    }


    /* =====================================================
       BUILD PROJECT DATA
       ===================================================== */

    const projects =
        buildPortfolioProjectData(
            cards,
            infoCards
        );


    window.portfolioFilterState.activeProjects =
        projects.slice();


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            () => {

                window.portfolioFilterState.category =
                    categorySelect.value ||
                    "all";


                applyPortfolioFilters();

            }
        );

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    let selectedProjectIndex = -1;


    /*
     * Search menggunakan data langsung dari
     * .info-title
     * .info-desc
     * .info-tags span
     *
     * Search dibuat independen dari
     * applyPortfolioFilters() agar mengetik
     * tidak melakukan rebuild scrollytelling.
     */

    const searchProjects = [];


    const searchProjectCount =
        Math.max(
            cards.length,
            infoCards.length
        );


    for (
        let i = 0;
        i < searchProjectCount;
        i++
    ) {

        const card =
            cards[i];

        const info =
            infoCards[i];


        if (!card && !info) {
            continue;
        }


        const title =
            info?.querySelector(
                ".info-title"
            )?.textContent || "";


        const description =
            info?.querySelector(
                ".info-desc"
            )?.textContent || "";


        const tags =
            Array.from(
                info?.querySelectorAll(
                    ".info-tags span"
                ) || []
            )
            .map(
                tag =>
                    tag.textContent
            )
            .join(" ");


        searchProjects.push({

            index: i,

            title:
                title.trim(),

            description:
                description.trim(),

            tags:
                tags.trim(),

            searchText:
                `
                ${title}
                ${description}
                ${tags}
                `.toLowerCase()

        });

    }


    /* =====================================================
       CLEAR SELECTED PROJECT
       ===================================================== */

    function clearSelectedProject() {

        cards.forEach(
            card => {

                card.classList.remove(
                    "project-search-selected"
                );

            }
        );


        infoCards.forEach(
            card => {

                card.classList.remove(
                    "project-search-selected"
                );

            }
        );


        selectedProjectIndex = -1;

    }


    /* =====================================================
       SELECT PROJECT
       ===================================================== */

    function selectProject(index) {

        if (
            index < 0 ||
            index >= searchProjectCount
        ) {

            return;

        }


        clearSelectedProject();


        selectedProjectIndex =
            index;


        if (cards[index]) {

            cards[index]
                .classList.add(
                    "project-search-selected"
                );

        }


        if (infoCards[index]) {

            infoCards[index]
                .classList.add(
                    "project-search-selected"
                );

        }


        const timeline =
            window.portfolioScrollTimeline;


        if (
            !timeline ||
            !timeline.scrollTrigger
        ) {

            return;

        }


        if (searchProjectCount <= 1) {
            return;
        }


        const st =
            timeline.scrollTrigger;


        const targetProgress =
            index /
            (searchProjectCount - 1);


        const targetScroll =
            st.start +
            targetProgress *
            (
                st.end -
                st.start
            );


        window.scrollTo({

            top:
                targetScroll,

            behavior:
                typeof portfolioReducedMotion !==
                    "undefined" &&
                portfolioReducedMotion
                    ? "auto"
                    : "smooth"

        });

    }


    /* =====================================================
       RESULT MESSAGE
       ===================================================== */

    function updateSearchResultMessage(
        query,
        visibleCount
    ) {

        if (!searchResult) {
            return;
        }


        if (!query) {

            searchResult.textContent =
                "";

            searchResult.classList.remove(
                "is-visible",
                "is-empty"
            );

            return;

        }


        searchResult.classList.add(
            "is-visible"
        );


        if (visibleCount === 0) {

            searchResult.textContent =
                "NO PROJECT FOUND";


            searchResult.classList.add(
                "is-empty"
            );


            return;

        }


        searchResult.classList.remove(
            "is-empty"
        );


        searchResult.textContent =
            `${visibleCount} PROJECT${
                visibleCount > 1
                    ? "S"
                    : ""
            } FOUND`;

    }


    /* =====================================================
       PERFORM SEARCH
       ===================================================== */

    function performProjectSearch() {

        if (!searchInput) {
            return;
        }


        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        /*
         * Simpan query untuk state.
         *
         * TIDAK memanggil applyPortfolioFilters()
         * di sini karena fungsi tersebut dapat
         * rebuild scrollytelling dan menyebabkan
         * search input tertutup / kehilangan fokus.
         */

        window.portfolioFilterState.search =
            query;


        if (!query) {

            if (searchClear) {

                searchClear.classList.remove(
                    "is-visible"
                );

            }


            clearSelectedProject();


            updateSearchResultMessage(
                "",
                searchProjects.length
            );


            return;

        }


        if (searchClear) {

            searchClear.classList.add(
                "is-visible"
            );

        }


        const matchedProjects =
            searchProjects.filter(
                project =>
                    project.searchText.includes(
                        query
                    )
            );


        updateSearchResultMessage(
            query,
            matchedProjects.length
        );


        if (!matchedProjects.length) {

            clearSelectedProject();

            return;

        }


        /*
         * Pilih project pertama yang cocok.
         *
         * Sama seperti referensi search awal.
         */

        selectProject(
            matchedProjects[0].index
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performProjectSearch
        );


        /* ================================================
           SEARCH KEYBOARD
           ================================================ */

        searchInput.addEventListener(
            "keydown",
            event => {

                /*
                 * ArrowDown / ArrowUp:
                 * ketika sedang mengetik search,
                 * jangan pindah project.
                 */

                if (
                    event.key === "ArrowDown" ||
                    event.key === "ArrowUp"
                ) {

                    event.stopPropagation();

                }

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
       ===================================================== */

    if (searchClear) {

        searchClear.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                if (searchInput) {

                    searchInput.value =
                        "";

                }


                window.portfolioFilterState.search =
                    "";


                searchClear.classList.remove(
                    "is-visible"
                );


                clearSelectedProject();


                updateSearchResultMessage(
                    "",
                    searchProjects.length
                );


                /*
                 * Jangan rebuild filter/scrollytelling
                 * ketika clear search.
                 *
                 * Ini menjaga search tetap terbuka
                 * dan fokus tetap stabil.
                 */


                if (searchInput) {

                    searchInput.focus();

                }

            }
        );

    }


    /* =====================================================
       "/" SEARCH SHORTCUT
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName ===
                        "INPUT" ||

                    activeElement.tagName ===
                        "TEXTAREA" ||

                    activeElement.isContentEditable
                );


            if (
                event.key === "/" &&
                !isTyping &&
                searchInput
            ) {

                event.preventDefault();

                searchInput.focus();

            }

        }
    );


    /* =====================================================
       ESC SEARCH
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            /*
             * Jangan mengganggu modal.
             */

            const modal =
                document.getElementById(
                    "project-modal"
                );


            if (
                modal &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                return;

            }


            if (
                searchInput &&
                document.activeElement ===
                    searchInput
            ) {

                if (
                    searchInput.value
                ) {

                    searchInput.value =
                        "";


                    window.portfolioFilterState.search =
                        "";


                    if (searchClear) {

                        searchClear.classList.remove(
                            "is-visible"
                        );

                    }


                    clearSelectedProject();


                    updateSearchResultMessage(
                        "",
                        searchProjects.length
                    );

                } else {

                    searchInput.blur();

                }

            }

        }
    );


    /* =====================================================
       INITIAL DOTS
       ===================================================== */

    renderDynamicDots(
        dotNav,
        projects
    );


    /* =====================================================
       INITIAL FILTER
       ===================================================== */

    applyPortfolioFilters();


    /* =====================================================
       MARK INITIALIZED
       ===================================================== */

    window.portfolioFilterState.initialized =
        true;


    /* =====================================================
       HELPER:
       SEARCH CLEAR STATE
       ===================================================== */

    function updateSearchClearState() {

        if (!searchClear) {
            return;
        }


        const hasValue =
            Boolean(
                searchInput &&
                searchInput.value.trim()
            );


        searchClear.classList.toggle(
            "is-visible",
            hasValue
        );

    }


    /* =====================================================
       APPLY FILTERS
       ===================================================== */

    function applyPortfolioFilters() {

        const category =
            window.portfolioFilterState.category;


        const search =
            window.portfolioFilterState.search;


        /* =================================================
           FILTER PROJECTS
           ================================================= */

        const filtered =
            projects.filter(
                project => {

                    const categoryMatch =
                        category === "all" ||
                        project.category ===
                            category;


                    const searchMatch =
                        !search ||
                        project.searchText.includes(
                            search
                        );


                    return (
                        categoryMatch &&
                        searchMatch
                    );

                }
            );


        window.portfolioFilterState.activeProjects =
            filtered;


        /*
         * Reset selalu ke project pertama
         * ketika filter berubah.
         */

        window.portfolioFilterState.activeIndex =
            0;


        /* =================================================
           UPDATE RESULT
           ================================================= */

        updateSearchResult(
            search,
            filtered.length,
            projects.length,
            searchResult
        );


        /* =================================================
           UPDATE VISIBILITY
           ================================================= */

        updateProjectVisibility(
            projects,
            filtered
        );


        /* =================================================
           REBUILD DOTS
           ================================================= */

        renderDynamicDots(
            dotNav,
            filtered
        );


        /* =================================================
           REBUILD SCROLLYTELLING
           ================================================= */

        rebuildFilteredScrollytelling(
            section,
            deck,
            counter,
            counterTotal,
            progressFill,
            dotNav,
            projects,
            filtered
        );

    }

}



/* =========================================================
   BUILD PROJECT DATA
   ========================================================= */

function buildPortfolioProjectData(
    cards,
    infoCards
) {

    const projects = [];


    const categoryMap = {

        jamesastore:
            "ecommerce",

        gratia:
            "company",

        ikuzo:
            "course",

        erp:
            "erp",

        filament:
            "erp",

        duniaanak:
            "ecommerce",

        speech:
            "ai"

    };


    cards.forEach(
        (card, index) => {

            const info =
                infoCards[index];


            if (!info) {
                return;
            }


            const projectId =
                info.dataset.info ||
                card.id.replace(
                    "card-",
                    ""
                );


            const title =
                info.querySelector(
                    ".info-title"
                )?.textContent
                    .trim() ||
                projectId;


            const description =
                info.querySelector(
                    ".info-desc"
                )?.textContent
                    .trim() ||
                "";


            const tags =
                Array.from(
                    info.querySelectorAll(
                        ".info-tags span"
                    )
                )
                .map(
                    tag =>
                        tag.textContent.trim()
                )
                .filter(Boolean);


            const infoTag =
                info.querySelector(
                    ".info-tag"
                )?.textContent
                    .trim() ||
                "";


            /*
             * Jika nanti HTML diberi:
             *
             * data-category="ecommerce"
             *
             * maka data-category akan otomatis
             * diprioritaskan.
             */

            const category =
                card.dataset.category ||
                info.dataset.category ||
                categoryMap[projectId] ||
                "all";


            const searchText =
                [
                    title,
                    description,
                    infoTag,
                    tags.join(" "),
                    projectId,
                    category
                ]
                .join(" ")
                .toLowerCase();


            projects.push({

                id:
                    projectId,

                originalIndex:
                    index,

                card,

                info,

                title,

                description,

                tags,

                category,

                searchText

            });

        }
    );


    return projects;

}


/* =========================================================
   UPDATE PROJECT VISIBILITY
   ========================================================= */

function updateProjectVisibility(
    allProjects,
    activeProjects
) {

    const activeSet =
        new Set(
            activeProjects
        );


    allProjects.forEach(
        project => {

            const isActive =
                activeSet.has(
                    project
                );


            project.card.classList.toggle(
                "project-filter-hidden",
                !isActive
            );


            project.info.classList.toggle(
                "project-filter-hidden",
                !isActive
            );


            /*
             * IMPORTANT:
             *
             * Jangan menggunakan display:none
             * pada card yang sedang dipakai
             * GSAP untuk animasi.
             *
             * Kita gunakan visibility/opacity
             * sementara timeline dibangun ulang.
             */

            if (!isActive) {

                project.card.style.visibility =
                    "hidden";

                project.card.style.pointerEvents =
                    "none";

                project.info.style.visibility =
                    "hidden";

                project.info.style.pointerEvents =
                    "none";

            }

        }
    );


    activeProjects.forEach(
        project => {

            project.card.style.visibility =
                "visible";

            project.card.style.pointerEvents =
                "auto";

            project.info.style.visibility =
                "visible";

        }
    );

}


/* =========================================================
   DYNAMIC DOT NAVIGATION
   ========================================================= */

function renderDynamicDots(
    container,
    projects
) {

    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    projects.forEach(
        (project, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "dot-nav-item";


            if (index === 0) {

                button.classList.add(
                    "is-active"
                );

            }


            button.dataset.dot =
                String(index);


            button.dataset.projectId =
                project.id;


            button.setAttribute(
                "aria-label",
                `Go to ${project.title}`
            );


            button.title =
                project.title;


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   UPDATE SEARCH RESULT
   ========================================================= */

function updateSearchResult(
    search,
    count,
    total,
    resultElement
) {

    if (!resultElement) {
        return;
    }


    if (!search) {

        resultElement.textContent =
            "";


        resultElement.classList.remove(
            "is-visible",
            "is-empty"
        );


        return;

    }


    resultElement.classList.add(
        "is-visible"
    );


    if (!count) {

        resultElement.textContent =
            "NO PROJECT FOUND";


        resultElement.classList.add(
            "is-empty"
        );


        return;

    }


    resultElement.classList.remove(
        "is-empty"
    );


    resultElement.textContent =
        `${count} PROJECT${
            count === 1
                ? ""
                : "S"
        } FOUND`;

}


/* =========================================================
   KILL OLD SCROLLYTELLING
   ========================================================= */

function destroyPortfolioScrollTimeline() {

    const oldTimeline =
        window.portfolioScrollTimeline;


    if (!oldTimeline) {
        return;
    }


    /*
     * Kill ScrollTrigger terlebih dahulu.
     */

    if (
        oldTimeline.scrollTrigger
    ) {

        oldTimeline.scrollTrigger.kill();

    }


    /*
     * Kemudian kill timeline.
     */

    if (
        typeof oldTimeline.kill ===
        "function"
    ) {

        oldTimeline.kill();

    }


    window.portfolioScrollTimeline =
        null;


    /*
     * Pastikan pin lama dibersihkan.
     */

    if (
        typeof ScrollTrigger !==
        "undefined"
    ) {

        ScrollTrigger.refresh();

    }

}


/* =========================================================
   RESET PROJECT VISUAL STATE
   ========================================================= */

function resetPortfolioVisualState(
    allProjects,
    activeProjects
) {

    const activeSet =
        new Set(
            activeProjects
        );


    allProjects.forEach(
        project => {

            const isActive =
                activeSet.has(
                    project
                );


            /*
             * Clear GSAP inline state.
             */

            gsap.killTweensOf(
                project.card
            );


            gsap.killTweensOf(
                project.info
            );


            if (isActive) {

                gsap.set(
                    project.card,
                    {
                        clearProps:
                            "x,y,rotate,scale,opacity,zIndex"
                    }
                );


                gsap.set(
                    project.info,
                    {
                        clearProps:
                            "x,y,opacity"
                    }
                );


                project.card.style.visibility =
                    "visible";

                project.card.style.pointerEvents =
                    "auto";


                project.info.style.visibility =
                    "visible";

                project.info.style.pointerEvents =
                    "none";


            } else {

                gsap.set(
                    project.card,
                    {
                        clearProps:
                            "x,y,rotate,scale,opacity,zIndex"
                    }
                );


                gsap.set(
                    project.info,
                    {
                        clearProps:
                            "x,y,opacity"
                    }
                );


                project.card.style.visibility =
                    "hidden";

                project.card.style.pointerEvents =
                    "none";


                project.info.style.visibility =
                    "hidden";

                project.info.style.pointerEvents =
                    "none";

            }

        }
    );

}


/* =========================================================
   REBUILD FILTERED SCROLLYTELLING
   ========================================================= */

function rebuildFilteredScrollytelling(
    section,
    deck,
    counter,
    counterTotal,
    progressFill,
    dotNav,
    allProjects,
    activeProjects
) {

    /*
     * Hapus timeline lama.
     */

    destroyPortfolioScrollTimeline();


    /*
     * Reset visual state.
     */

    resetPortfolioVisualState(
        allProjects,
        activeProjects
    );


    const cards =
        activeProjects.map(
            project =>
                project.card
        );


    const infoCards =
        activeProjects.map(
            project =>
                project.info
        );


    const TOTAL =
        activeProjects.length;


    /*
     * Empty state
     */

    if (!TOTAL) {

        if (counter) {

            counter.textContent =
                "00";

        }


        if (counterTotal) {

            counterTotal.textContent =
                "/ 00";

        }


        if (progressFill) {

            progressFill.style.width =
                "0%";

        }


        return;

    }


    /*
     * Update counter total.
     */

    if (counterTotal) {

        counterTotal.textContent =
            `/ ${String(TOTAL).padStart(
                2,
                "0"
            )}`;

    }


    /*
     * Set first project active.
     */

    activeProjects.forEach(
        (project, index) => {

            project.info.classList.toggle(
                "is-active",
                index === 0
            );


            project.info.style.pointerEvents =
                index === 0
                    ? "auto"
                    : "none";

        }
    );


    /*
     * Jika reduced motion,
     * jangan membuat ScrollTrigger.
     */

    if (portfolioReducedMotion) {

        cards.forEach(
            (card, index) => {

                gsap.set(
                    card,
                    {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity:
                            index === 0
                                ? 1
                                : 0,
                        visibility:
                            index === 0
                                ? "visible"
                                : "hidden",
                        zIndex:
                            70 - index
                    }
                );

            }
        );


        infoCards.forEach(
            (card, index) => {

                gsap.set(
                    card,
                    {
                        opacity:
                            index === 0
                                ? 1
                                : 0,

                        y: 0,

                        visibility:
                            index === 0
                                ? "visible"
                                : "hidden",

                        pointerEvents:
                            index === 0
                                ? "auto"
                                : "none"
                    }
                );

            }
        );


        if (counter) {

            counter.textContent =
                "01";

        }


        if (progressFill) {

            progressFill.style.width =
                "0%";

        }


        updateDynamicDots(
            dotNav,
            0
        );


        return;

    }


    /*
     * Initial card deck.
     */

    cards.forEach(
        (card, index) => {

            gsap.set(
                card,
                {
                    x: 0,

                    y:
                        index === 0
                            ? 0
                            : 8 +
                              index * 6,

                    rotate:
                        index === 0
                            ? 0
                            : (
                                index % 2 === 0
                                    ? 1
                                    : -1
                            ) *
                            (
                                4 +
                                index * 1.6
                            ),

                    scale:
                        index === 0
                            ? 1
                            : 1 -
                              index * 0.018,

                    opacity: 1,

                    visibility:
                        "visible",

                    zIndex:
                        70 - index
                }
            );

        }
    );


    /*
     * Initial info cards.
     */

    infoCards.forEach(
        (card, index) => {

            gsap.set(
                card,
                {
                    opacity:
                        index === 0
                            ? 1
                            : 0,

                    y:
                        index === 0
                            ? 0
                            : 16,

                    visibility:
                        "visible",

                    pointerEvents:
                        index === 0
                            ? "auto"
                            : "none"
                }
            );


            card.classList.toggle(
                "is-active",
                index === 0
            );

        }
    );


    /*
     * Timeline.
     */

    const timeline =
        gsap.timeline({

            defaults: {
                ease:
                    "power2.inOut"
            },

            scrollTrigger: {

                trigger:
                    section,

                start:
                    "top top",

                end:
                    `+=${Math.max(
                        TOTAL * 90,
                        90
                    )}%`,

                scrub:
                    1,

                pin:
                    true,

                pinSpacing:
                    true,

                anticipatePin:
                    1,

                invalidateOnRefresh:
                    true,


                onUpdate:
                    self => {

                        const progress =
                            self.progress;


                        /*
                         * Progress
                         */

                        if (
                            progressFill
                        ) {

                            gsap.set(
                                progressFill,
                                {
                                    width:
                                        `${
                                            progress *
                                            100
                                        }%`
                                }
                            );

                        }


                        /*
                         * Active index
                         */

                        const activeIndex =
                            TOTAL <= 1
                                ? 0
                                : Math.min(
                                    TOTAL - 1,
                                    Math.max(
                                        0,
                                        Math.round(
                                            progress *
                                            (
                                                TOTAL -
                                                1
                                            )
                                        )
                                    )
                                );


                        window.portfolioFilterState.activeIndex =
                            activeIndex;


                        /*
                         * Counter
                         */

                        if (counter) {

                            counter.textContent =
                                String(
                                    activeIndex +
                                    1
                                ).padStart(
                                    2,
                                    "0"
                                );

                        }


                        /*
                         * Dots
                         */

                        updateDynamicDots(
                            dotNav,
                            activeIndex
                        );


                        /*
                         * Info cards
                         */

                        syncActiveInfoCard(
                            activeIndex,
                            infoCards
                        );

                    }

            }

        });


    /*
     * Initial hold.
     */

    timeline.to(
        {},
        {
            duration:
                0.2
        }
    );


    /*
     * Project transitions.
     */

    for (
        let index = 0;
        index < TOTAL - 1;
        index++
    ) {

        const outgoing =
            cards[index];

        const incoming =
            cards[index + 1];

        const outgoingInfo =
            infoCards[index];

        const incomingInfo =
            infoCards[index + 1];


        const exitDirection =
            index % 2 === 0
                ? 1
                : -1;


        const position =
            index + 0.2;


        /*
         * OUTGOING CARD
         */

        timeline.to(
            outgoing,
            {
                x:
                    exitDirection *
                    480,

                y:
                    -60,

                rotate:
                    exitDirection *
                    22,

                scale:
                    0.82,

                opacity:
                    0,

                duration:
                    0.7
            },
            position
        );


        /*
         * INCOMING CARD
         */

        timeline.to(
            incoming,
            {
                x:
                    0,

                y:
                    0,

                rotate:
                    0,

                scale:
                    1,

                opacity:
                    1,

                visibility:
                    "visible",

                zIndex:
                    70,

                duration:
                    0.7
            },
            position
        );


        /*
         * CAMERA PUSH
         */

        timeline.to(
            deck,
            {
                scale:
                    1.035,

                duration:
                    0.32,

                ease:
                    "sine.out"
            },
            position
        );


        timeline.to(
            deck,
            {
                scale:
                    1,

                duration:
                    0.38,

                ease:
                    "sine.in"
            },
            position + 0.32
        );


        /*
         * OUTGOING INFO
         */

        timeline.to(
            outgoingInfo,
            {
                opacity:
                    0,

                y:
                    -14,

                pointerEvents:
                    "none",

                duration:
                    0.35,

                onStart:
                    () => {

                        outgoingInfo.classList.remove(
                            "is-active"
                        );

                        outgoingInfo.style.pointerEvents =
                            "none";

                    },

                onReverseComplete:
                    () => {

                        outgoingInfo.classList.add(
                            "is-active"
                        );

                        outgoingInfo.style.pointerEvents =
                            "auto";

                    }

            },
            position
        );


        /*
         * INCOMING INFO
         */

        timeline.to(
            incomingInfo,
            {
                opacity:
                    1,

                y:
                    0,

                pointerEvents:
                    "auto",

                duration:
                    0.4,

                onStart:
                    () => {

                        incomingInfo.classList.add(
                            "is-active"
                        );

                        incomingInfo.style.pointerEvents =
                            "auto";

                    },

                onReverseComplete:
                    () => {

                        incomingInfo.classList.remove(
                            "is-active"
                        );

                        incomingInfo.style.pointerEvents =
                            "none";

                    }

            },
            position + 0.25
        );

    }


    /*
     * Final hold.
     */

    timeline.to(
        {},
        {
            duration:
                0.2
        }
    );


    /*
     * Expose new timeline.
     */

    window.portfolioScrollTimeline =
        timeline;


    /*
     * Dynamic dot events.
     */

    const dots =
        dotNav
            ? Array.from(
                dotNav.querySelectorAll(
                    ".dot-nav-item"
                )
            )
            : [];


    dots.forEach(
        (dot, index) => {

            dot.style.cursor =
                "pointer";


            dot.addEventListener(
                "click",
                () => {

                    const st =
                        timeline.scrollTrigger;


                    if (!st) {
                        return;
                    }


                    const targetProgress =
                        TOTAL <= 1
                            ? 0
                            : index /
                              (
                                TOTAL -
                                1
                              );


                    const targetScroll =
                        st.start +
                        targetProgress *
                        (
                            st.end -
                            st.start
                        );


                    window.scrollTo({

                        top:
                            targetScroll,

                        behavior:
                            portfolioReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        }
    );


    /*
     * Keyboard navigation.
     *
     * Kita menggunakan listener baru yang
     * hanya membaca timeline terbaru.
     */

    if (
        !window.__portfolioFilteredKeyboard
    ) {

        window.__portfolioFilteredKeyboard =
            true;


        document.addEventListener(
            "keydown",
            event => {

                const modal =
                    document.getElementById(
                        "project-modal"
                    );


                if (
                    modal &&
                    modal.classList.contains(
                        "is-open"
                    )
                ) {

                    return;

                }


                /*
                 * Jangan hijack keyboard ketika
                 * user sedang mengetik.
                 */

                const active =
                    document.activeElement;


                const isTyping =
                    active &&
                    (
                        active.tagName ===
                            "INPUT" ||

                        active.tagName ===
                            "TEXTAREA" ||

                        active.isContentEditable
                    );


                if (isTyping) {
                    return;
                }


                if (
                    event.key === "ArrowDown" ||
                    event.key === "PageDown"
                ) {

                    event.preventDefault();

                    moveFilteredProject(
                        1
                    );

                }


                if (
                    event.key === "ArrowUp" ||
                    event.key === "PageUp"
                ) {

                    event.preventDefault();

                    moveFilteredProject(
                        -1
                    );

                }

            }
        );

    }


    /*
     * Refresh setelah timeline selesai dibuat.
     */

    requestAnimationFrame(
        () => {

            if (
                timeline.scrollTrigger
            ) {

                timeline.scrollTrigger.refresh();

            }


            if (
                typeof ScrollTrigger !==
                "undefined"
            ) {

                ScrollTrigger.refresh();

            }

        }
    );

}


/* =========================================================
   UPDATE DYNAMIC DOTS
   ========================================================= */

function updateDynamicDots(
    container,
    activeIndex
) {

    if (!container) {
        return;
    }


    const dots =
        container.querySelectorAll(
            ".dot-nav-item"
        );


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "is-active",
                index === activeIndex
            );

        }
    );

}


/* =========================================================
   MOVE FILTERED PROJECT
   ========================================================= */

function moveFilteredProject(
    direction
) {

    const timeline =
        window.portfolioScrollTimeline;


    const projects =
        window.portfolioFilterState
            .activeProjects;


    if (
        !timeline ||
        !timeline.scrollTrigger ||
        !projects.length
    ) {

        return;

    }


    const TOTAL =
        projects.length;


    const st =
        timeline.scrollTrigger;


    const currentIndex =
        Math.round(
            st.progress *
            (
                TOTAL - 1
            )
        );


    const targetIndex =
        Math.max(
            0,
            Math.min(
                TOTAL - 1,
                currentIndex +
                    direction
            )
        );


    const targetProgress =
        TOTAL <= 1
            ? 0
            : targetIndex /
              (
                TOTAL - 1
              );


    const targetScroll =
        st.start +
        targetProgress *
        (
            st.end -
            st.start
        );


    window.scrollTo({

        top:
            targetScroll,

        behavior:
            portfolioReducedMotion
                ? "auto"
                : "smooth"

    });

}


/* =========================================================
   END — PROJECT FILTER SYSTEM
   ========================================================= */