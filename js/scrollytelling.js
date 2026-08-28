/* =========================================================
   PORTFOLIO PROJECTS — GSAP SCROLLYTELLING + PROJECT MODAL
   =========================================================

   FEATURES
   ---------------------------------------------------------
   1. GSAP ScrollTrigger portfolio scrollytelling
   2. Card deck / stacked screenshots
   3. Sequential card peel animation
   4. Reverse animation when scrolling upward
   5. Project counter synchronization
   6. Progress bar synchronization
   7. Dot navigation
   8. Project detail modal
   9. Project image gallery
   10. Thumbnail navigation
   11. Previous / next gallery buttons
   12. Keyboard navigation
   13. ESC closes modal
   14. Arrow keys navigate gallery when modal is open
   15. Body scroll locking while modal is open
   16. Reduced-motion support
   17. Responsive handling
   18. Modal backdrop click-to-close
   19. Automatic thumbnail active state
   20. Dynamic technology / feature tags
   21. Stable reverse-scroll state
   ========================================================= */


gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    /* =====================================================
       SCROLLYTELLING DOM
       ===================================================== */

    const section =
        document.getElementById('portfolio-scrollytelling');

    const deck =
        document.getElementById('card-deck');

    const counter =
        document.getElementById('project-counter');

    const progressFill =
        document.getElementById('stack-progress');

    const dots =
        gsap.utils.toArray('.dot-nav-item');

    const cards =
        gsap.utils.toArray('.project-card-frame');

    const infoCards =
        gsap.utils.toArray('.info-card');


    /* =====================================================
       BASIC VALIDATION
       ===================================================== */

    if (!section || !deck || !cards.length || !infoCards.length) {

        console.warn(
            'Portfolio scrollytelling: required elements were not found.'
        );

        /*
         * Modal tetap diinisialisasi walaupun scrollytelling
         * tidak ditemukan.
         */
        initProjectModal(prefersReducedMotion);

        return;
    }


    /* =====================================================
       TOTAL PROJECTS
       ===================================================== */

    const TOTAL =
        Math.min(
            cards.length,
            infoCards.length
        );


    /* =====================================================
       INTRO ANIMATION
       ===================================================== */

    initIntroAnimation(
        prefersReducedMotion
    );


    /* =====================================================
       SCROLLYTELLING
       ===================================================== */

    initScrollytelling({

        section,
        deck,
        counter,
        progressFill,
        dots,
        cards,
        infoCards,
        TOTAL,
        prefersReducedMotion

    });


    /* =====================================================
       PROJECT MODAL
       ===================================================== */

    initProjectModal(
        prefersReducedMotion
    );


    /* =====================================================
       GLOBAL RESIZE HANDLER
       ===================================================== */

    let resizeTimer;

    window.addEventListener('resize', () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            ScrollTrigger.refresh();

        }, 150);

    });

});


/* =========================================================
   INTRO ANIMATION
   ========================================================= */

function initIntroAnimation(
    prefersReducedMotion
) {

    const intro =
        document.querySelector(
            '.project-intro-content'
        );

    if (!intro) {
        return;
    }


    const label =
        intro.querySelector(
            '.project-intro-label'
        );

    const title =
        intro.querySelector(
            '.project-intro-title'
        );

    const description =
        intro.querySelector(
            '.project-intro-description'
        );

    const indicator =
        intro.querySelector(
            '.project-scroll-indicator'
        );


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    if (prefersReducedMotion) {

        gsap.set(
            [
                label,
                title,
                description,
                indicator
            ],
            {
                clearProps: 'all'
            }
        );

        return;
    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

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


    /* =====================================================
       INTRO TIMELINE
       ===================================================== */

    const introTimeline =
        gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });


    introTimeline

        .to(label, {

            opacity: 1,
            y: 0,
            duration: 0.6

        })

        .to(title, {

            opacity: 1,
            y: 0,
            duration: 0.8

        }, '-=0.35')

        .to(description, {

            opacity: 1,
            y: 0,
            duration: 0.7

        }, '-=0.45')

        .to(indicator, {

            opacity: 1,
            y: 0,
            duration: 0.6

        }, '-=0.35');


    /* =====================================================
       SCROLL INDICATOR FLOAT
       ===================================================== */

    if (indicator) {

        gsap.to(indicator, {

            y: 6,

            duration: 1.2,

            repeat: -1,

            yoyo: true,

            ease: 'sine.inOut',

            delay: 1

        });

    }

}


/* =========================================================
   SCROLLYTELLING INITIALIZATION
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


    /* =====================================================
       REDUCED MOTION MODE
       ===================================================== */

    if (prefersReducedMotion) {

        /* -------------------------------------------------
           RESET ALL CARDS
           ------------------------------------------------- */

        gsap.set(cards, {

            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 1

        });


        /* -------------------------------------------------
           RESET ALL INFO CARDS
           ------------------------------------------------- */

        gsap.set(infoCards, {

            opacity: 0,
            y: 0,
            visibility: 'hidden',
            pointerEvents: 'none'

        });


        /* -------------------------------------------------
           FIRST INFO CARD
           ------------------------------------------------- */

        gsap.set(infoCards[0], {

            opacity: 1,
            y: 0,
            visibility: 'visible',
            pointerEvents: 'auto'

        });


        /* -------------------------------------------------
           COUNTER
           ------------------------------------------------- */

        if (counter) {

            counter.textContent =
                '01';

        }


        /* -------------------------------------------------
           PROGRESS
           ------------------------------------------------- */

        if (progressFill) {

            progressFill.style.width =
                '0%';

        }


        /* -------------------------------------------------
           DOTS
           ------------------------------------------------- */

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                'is-active',
                index === 0
            );

        });


        return;
    }


    /* =====================================================
       IMPORTANT:
       KILL OLD INLINE GSAP PROPERTIES
       ===================================================== */

    gsap.killTweensOf([
        ...cards,
        ...infoCards,
        deck
    ]);


    /* =====================================================
       ESTABLISH RESTING FAN DECK
       ===================================================== */

    cards.forEach((card, index) => {

        if (index === 0) {

            gsap.set(card, {

                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                visibility: 'visible',
                zIndex: 70

            });

        } else {

            gsap.set(card, {

                x: 0,

                y:
                    8 +
                    index * 6,

                rotate:
                    (index % 2 === 0 ? 1 : -1)
                    *
                    (4 + index * 1.6),

                scale:
                    1 -
                    index * 0.018,

                opacity: 1,

                visibility: 'visible',

                zIndex:
                    70 -
                    index

            });

        }

    });


    /* =====================================================
       RESET INFO CARDS
       
       IMPORTANT FIX:
       Jangan menggunakan autoAlpha untuk info card
       transition karena autoAlpha mengubah visibility.
       
       Saat timeline di-reverse, visibility yang sudah
       terlanjur hidden dapat menyebabkan text sebelumnya
       tidak muncul lagi.
       ===================================================== */

    infoCards.forEach((card, index) => {

        gsap.set(card, {

            opacity:
                index === 0
                    ? 1
                    : 0,

            y:
                index === 0
                    ? 0
                    : 16,

            visibility:
                index === 0
                    ? 'visible'
                    : 'visible',

            pointerEvents:
                index === 0
                    ? 'auto'
                    : 'none'

        });


        card.classList.toggle(
            'is-active',
            index === 0
        );

    });


    /* =====================================================
       MASTER TIMELINE
       ===================================================== */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger: section,

                start: 'top top',

                end:
                    `+=${TOTAL * 90}%`,

                scrub: 1,

                pin: true,

                pinSpacing: true,

                anticipatePin: 1,

                invalidateOnRefresh: true,


                /* -----------------------------------------
                   SCROLL UPDATE
                   ----------------------------------------- */

                onUpdate: self => {

                    const progress =
                        self.progress;


                    /* -------------------------------------
                       PROGRESS BAR
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
                       ACTIVE PROJECT
                       ------------------------------------- */

                    const activeIndex =
                        Math.min(

                            TOTAL - 1,

                            Math.max(

                                0,

                                Math.round(
                                    progress
                                    *
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
                            ).padStart(2, '0');

                    }


                    /* -------------------------------------
                       DOT NAVIGATION
                       ------------------------------------- */

                    dots.forEach(
                        (dot, index) => {

                            dot.classList.toggle(

                                'is-active',

                                index ===
                                activeIndex

                            );

                        }
                    );

                }

            },


            defaults: {

                ease:
                    'power2.inOut'

            }

        });


    /* =====================================================
       FIRST PROJECT HOLD
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


        /* =================================================
           ALTERNATING EXIT DIRECTION
           ================================================= */

        const exitDirection =
            index % 2 === 0
                ? 1
                : -1;


        /* =================================================
           TIMELINE POSITION
           ================================================= */

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


        /* =================================================
           INCOMING CARD
           ================================================= */

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
                    'visible',

                zIndex:
                    70,

                duration:
                    0.7

            },

            position

        );


        /* =================================================
           CAMERA PUSH
           ================================================= */

        timeline.to(

            deck,

            {

                scale:
                    1.035,

                duration:
                    0.32,

                ease:
                    'sine.out'

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
                    'sine.in'

            },

            position + 0.32

        );


        /* =================================================
           OUTGOING INFO
           
           IMPORTANT FIX:
           Tidak memakai autoAlpha.
           Tidak mengubah visibility menjadi hidden.
           
           Jadi ketika timeline reverse:
           
           opacity 0
               ↓
           opacity 1
           
           text selalu bisa muncul kembali.
           ================================================= */

        timeline.to(

            outgoingInfo,

            {

                opacity:
                    0,

                y:
                    -14,

                pointerEvents:
                    'none',

                duration:
                    0.35,

                onStart: () => {

                    outgoingInfo
                        .classList
                        .remove(
                            'is-active'
                        );

                },

                onReverseComplete: () => {

                    outgoingInfo
                        .classList
                        .add(
                            'is-active'
                        );

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

                opacity:
                    1,

                y:
                    0,

                pointerEvents:
                    'auto',

                duration:
                    0.4,

                onStart: () => {

                    incomingInfo
                        .classList
                        .add(
                            'is-active'
                        );

                },

                onReverseComplete: () => {

                    incomingInfo
                        .classList
                        .remove(
                            'is-active'
                        );

                }

            },

            position + 0.25

        );

    }


    /* =====================================================
       FINAL PROJECT HOLD
       ===================================================== */

    timeline.to(
        {},
        {
            duration: 0.2
        }
    );

    /* =====================================================
   EXPOSE TIMELINE FOR PROJECT SEARCH
   ===================================================== */

    window.portfolioScrollTimeline = timeline;



    /* =====================================================
       DOT NAVIGATION
       ===================================================== */

    dots.forEach((dot, index) => {

        dot.style.cursor =
            'pointer';


        dot.addEventListener(
            'click',
            () => {

                const scrollTrigger =
                    timeline.scrollTrigger;


                if (!scrollTrigger) {
                    return;
                }


                const targetProgress =
                    index /
                    (TOTAL - 1);


                const scrollTarget =
                    scrollTrigger.start
                    +
                    targetProgress
                    *
                    (
                        scrollTrigger.end
                        -
                        scrollTrigger.start
                    );


                window.scrollTo({

                    top:
                        scrollTarget,

                    behavior:
                        prefersReducedMotion
                            ? 'auto'
                            : 'smooth'

                });

            }
        );

    });


    /* =====================================================
       KEYBOARD NAVIGATION
       ===================================================== */

    initKeyboardNavigation(
        timeline,
        TOTAL
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
        'keydown',
        event => {

            /* ---------------------------------------------
               DO NOT INTERFERE WITH MODAL
               --------------------------------------------- */

            const modal =
                document.getElementById(
                    'project-modal'
                );


            if (
                modal &&
                modal.classList.contains(
                    'is-open'
                )
            ) {

                return;

            }


            /* ---------------------------------------------
               ARROW DOWN
               --------------------------------------------- */

            if (
                event.key === 'ArrowDown' ||
                event.key === 'PageDown'
            ) {

                event.preventDefault();


                moveToProject(
                    timeline,
                    1,
                    TOTAL
                );

            }


            /* ---------------------------------------------
               ARROW UP
               --------------------------------------------- */

            if (
                event.key === 'ArrowUp' ||
                event.key === 'PageUp'
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

    const scrollTrigger =
        timeline.scrollTrigger;


    if (!scrollTrigger) {
        return;
    }


    const currentProgress =
        scrollTrigger.progress;


    let currentIndex =
        Math.round(
            currentProgress
            *
            (TOTAL - 1)
        );


    currentIndex +=
        direction;


    currentIndex =
        Math.max(

            0,

            Math.min(
                TOTAL - 1,
                currentIndex
            )

        );


    const targetProgress =
        currentIndex /
        (TOTAL - 1);


    const targetScroll =
        scrollTrigger.start
        +
        targetProgress
        *
        (
            scrollTrigger.end
            -
            scrollTrigger.start
        );


    window.scrollTo({

        top:
            targetScroll,

        behavior:
            'smooth'

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
            'project-modal'
        );


    if (!modal) {
        return;
    }


    /* =====================================================
       MODAL ELEMENTS
       ===================================================== */

    const backdrop =
        modal.querySelector(
            '.project-modal-backdrop'
        );


    const closeButton =
        document.getElementById(
            'modal-close'
        );


    const closeBottom =
        document.getElementById(
            'modal-close-bottom'
        );


    const mainImage =
        document.getElementById(
            'modal-main-image'
        );


    const thumbnailRow =
        document.getElementById(
            'thumbnail-row'
        );


    const galleryPrev =
        document.getElementById(
            'gallery-prev'
        );


    const galleryNext =
        document.getElementById(
            'gallery-next'
        );


    const galleryCurrent =
        document.getElementById(
            'gallery-current'
        );


    const galleryTotal =
        document.getElementById(
            'gallery-total'
        );


    const modalTitle =
        document.getElementById(
            'modal-project-title'
        );


    const modalSecondaryTitle =
        document.getElementById(
            'modal-project-title-secondary'
        );


    const modalDescription =
        document.getElementById(
            'modal-project-description'
        );


    const modalTags =
        document.getElementById(
            'modal-project-tags'
        );


    /* =====================================================
       STATE
       ===================================================== */

    let currentImages = [];

    let currentImageIndex = 0;

    let isModalOpen = false;


    /* =====================================================
       OPEN PROJECT BUTTONS
       ===================================================== */

    const detailButtons =
        document.querySelectorAll(
            '.info-detail-button'
        );


    detailButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                event => {

                    /*
                     * HTML kamu boleh tetap memakai:
                     *
                     * onclick="openProjectModal(...)"
                     *
                     * Jadi kita tidak mengubah
                     * inline onclick tersebut.
                     */

                    event.stopPropagation();

                }
            );

        }
    );


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
               VALIDATE DATA
               --------------------------------------------- */

            if (!title) {

                title =
                    'Project';

            }


            if (!description) {

                description =
                    '';

            }


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
                !Array.isArray(technologies)
            ) {

                technologies =
                    [];

            }


            /* ---------------------------------------------
               SAVE STATE
               --------------------------------------------- */

            currentImages =
                images.slice();


            currentImageIndex =
                0;


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
               UPDATE TECHNOLOGY TAGS
               --------------------------------------------- */

            renderModalTags(

                modalTags,

                technologies

            );


            /* ---------------------------------------------
               UPDATE GALLERY
               --------------------------------------------- */

            renderGallery(

                thumbnailRow,

                currentImages,

                currentImageIndex

            );


            updateGalleryImage(

                mainImage,

                galleryCurrent,

                galleryTotal,

                currentImages,

                currentImageIndex,

                prefersReducedMotion

            );


            /* ---------------------------------------------
               OPEN MODAL
               --------------------------------------------- */

            openModal(

                modal,

                prefersReducedMotion

            );


            isModalOpen =
                true;


            /* ---------------------------------------------
               ACCESSIBILITY
               --------------------------------------------- */

            modal.setAttribute(

                'aria-hidden',

                'false'

            );


            document.body.classList.add(
                'modal-open'
            );


            /* ---------------------------------------------
               FOCUS CLOSE BUTTON
               --------------------------------------------- */

            setTimeout(
                () => {

                    if (closeButton) {

                        closeButton.focus();

                    }

                },
                100
            );

        };


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeProjectModal() {

        if (!isModalOpen) {
            return;
        }


        closeModal(

            modal,

            prefersReducedMotion

        );


        isModalOpen =
            false;


        modal.setAttribute(

            'aria-hidden',

            'true'

        );


        document.body.classList.remove(

            'modal-open'

        );

    }


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(

            'click',

            closeProjectModal

        );

    }


    if (closeBottom) {

        closeBottom.addEventListener(

            'click',

            closeProjectModal

        );

    }


    /* =====================================================
       BACKDROP CLICK
       ===================================================== */

    if (backdrop) {

        backdrop.addEventListener(

            'click',

            closeProjectModal

        );

    }


    /* =====================================================
       GALLERY PREVIOUS
       ===================================================== */

    if (galleryPrev) {

        galleryPrev.addEventListener(

            'click',

            () => {

                changeGalleryImage(

                    -1,

                    mainImage,

                    galleryCurrent,

                    galleryTotal,

                    thumbnailRow,

                    prefersReducedMotion

                );

            }

        );

    }


    /* =====================================================
       GALLERY NEXT
       ===================================================== */

    if (galleryNext) {

        galleryNext.addEventListener(

            'click',

            () => {

                changeGalleryImage(

                    1,

                    mainImage,

                    galleryCurrent,

                    galleryTotal,

                    thumbnailRow,

                    prefersReducedMotion

                );

            }

        );

    }


    /* =====================================================
       THUMBNAIL EVENTS
       ===================================================== */

    if (thumbnailRow) {

        thumbnailRow.addEventListener(

            'click',

            event => {

                const thumbnail =
                    event.target.closest(
                        '[data-gallery-index]'
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

            }

        );

    }


    /* =====================================================
       KEYBOARD MODAL CONTROLS
       ===================================================== */

    document.addEventListener(

        'keydown',

        event => {

            if (!isModalOpen) {
                return;
            }


            /* ---------------------------------------------
               ESC
               --------------------------------------------- */

            if (
                event.key === 'Escape'
            ) {

                event.preventDefault();

                closeProjectModal();

                return;

            }


            /* ---------------------------------------------
               LEFT
               --------------------------------------------- */

            if (
                event.key === 'ArrowLeft'
            ) {

                event.preventDefault();

                changeGalleryImage(

                    -1,

                    mainImage,

                    galleryCurrent,

                    galleryTotal,

                    thumbnailRow,

                    prefersReducedMotion

                );

                return;

            }


            /* ---------------------------------------------
               RIGHT
               --------------------------------------------- */

            if (
                event.key === 'ArrowRight'
            ) {

                event.preventDefault();

                changeGalleryImage(

                    1,

                    mainImage,

                    galleryCurrent,

                    galleryTotal,

                    thumbnailRow,

                    prefersReducedMotion

                );

            }

        }

    );


    /* =====================================================
       PREVENT MODAL SCROLL PROPAGATION
       ===================================================== */

    const modalContent =
        modal.querySelector(
            '.project-modal-content'
        );


    if (modalContent) {

        modalContent.addEventListener(

            'wheel',

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
   RENDER MODAL TAGS
   ========================================================= */

function renderModalTags(
    container,
    technologies
) {

    if (!container) {
        return;
    }


    container.innerHTML =
        '';


    technologies.forEach(
        technology => {

            const tag =
                document.createElement(
                    'span'
                );


            tag.className =
                'modal-tech-tag';


            tag.textContent =
                technology;


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


    container.innerHTML =
        '';


    images.forEach(
        (image, index) => {

            const button =
                document.createElement(
                    'button'
                );


            button.type =
                'button';


            button.className =
                'gallery-thumbnail';


            button.dataset.galleryIndex =
                index;


            button.setAttribute(

                'aria-label',

                `View image ${index + 1}`

            );


            if (
                index === activeIndex
            ) {

                button.classList.add(
                    'is-active'
                );

            }


            const img =
                document.createElement(
                    'img'
                );


            img.src =
                image;


            img.alt =
                `Project screenshot ${index + 1}`;


            img.loading =
                index === 0
                    ? 'eager'
                    : 'lazy';


            img.addEventListener(
                'error',
                () => {

                    button.classList.add(
                        'is-error'
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
        !images.length
    ) {

        return;

    }


    const imagePath =
        images[index];


    if (!imagePath) {
        return;
    }


    /* =====================================================
       IMAGE TRANSITION
       ===================================================== */

    if (
        !prefersReducedMotion &&
        mainImage.src &&
        mainImage.src !==
            window.location.href
    ) {

        gsap.killTweensOf(
            mainImage
        );


        gsap.to(

            mainImage,

            {

                opacity: 0,

                duration: 0.12,

                ease: 'power1.out',

                onComplete: () => {

                    mainImage.src =
                        imagePath;


                    gsap.to(

                        mainImage,

                        {

                            opacity: 1,

                            duration: 0.25,

                            ease: 'power2.out'

                        }

                    );

                }

            }

        );

    } else {

        mainImage.src =
            imagePath;

    }


    /* =====================================================
       ALT
       ===================================================== */

    mainImage.alt =
        `Project preview ${index + 1}`;


    /* =====================================================
       COUNTER
       ===================================================== */

    if (currentElement) {

        currentElement.textContent =
            index + 1;

    }


    if (totalElement) {

        totalElement.textContent =
            images.length;

    }

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

    prefersReducedMotion

) {

    if (!currentImages.length) {
        return;
    }


    currentImageIndex +=
        direction;


    /* -----------------------------------------------------
       LOOP TO LAST
       ----------------------------------------------------- */

    if (
        currentImageIndex < 0
    ) {

        currentImageIndex =
            currentImages.length - 1;

    }


    /* -----------------------------------------------------
       LOOP TO FIRST
       ----------------------------------------------------- */

    if (
        currentImageIndex >=
        currentImages.length
    ) {

        currentImageIndex =
            0;

    }


    /* -----------------------------------------------------
       UPDATE IMAGE
       ----------------------------------------------------- */

    updateGalleryImage(

        mainImage,

        currentElement,

        totalElement,

        currentImages,

        currentImageIndex,

        prefersReducedMotion

    );


    /* -----------------------------------------------------
       UPDATE THUMBNAILS
       ----------------------------------------------------- */

    updateThumbnailState(

        thumbnailRow,

        currentImageIndex

    );


    /* -----------------------------------------------------
       KEEP ACTIVE THUMBNAIL VISIBLE
       ----------------------------------------------------- */

    scrollThumbnailIntoView(

        thumbnailRow,

        currentImageIndex

    );

}


/* =========================================================
   UPDATE THUMBNAIL STATE
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

            '[data-gallery-index]'

        );


    thumbnails.forEach(
        thumbnail => {

            const index =
                Number(
                    thumbnail.dataset
                        .galleryIndex
                );


            thumbnail.classList.toggle(

                'is-active',

                index === activeIndex

            );

        }
    );

}


/* =========================================================
   SCROLL ACTIVE THUMBNAIL INTO VIEW
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
            'smooth',

        block:
            'nearest',

        inline:
            'center'

    });

}


/* =========================================================
   OPEN MODAL ANIMATION
   ========================================================= */

function openModal(

    modal,

    prefersReducedMotion

) {

    modal.classList.add(
        'is-open'
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

            '.project-modal-content'

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


    gsap.set(

        content,

        {
            opacity: 0,
            y: 30,
            scale: 0.97
        }

    );


    gsap.timeline()

        .to(

            modal,

            {

                opacity: 1,

                duration: 0.2,

                ease: 'power2.out'

            }

        )

        .to(

            content,

            {

                opacity: 1,

                y: 0,

                scale: 1,

                duration: 0.45,

                ease: 'power3.out'

            },

            '-=0.08'

        );

}


/* =========================================================
   CLOSE MODAL ANIMATION
   ========================================================= */

function closeModal(

    modal,

    prefersReducedMotion

) {

    const content =
        modal.querySelector(

            '.project-modal-content'

        );


    if (prefersReducedMotion) {

        modal.classList.remove(
            'is-open'
        );

        return;

    }


    gsap.killTweensOf([
        modal,
        content
    ]);


    gsap.timeline({

        onComplete: () => {

            modal.classList.remove(
                'is-open'
            );


            gsap.set(

                modal,

                {
                    clearProps:
                        'opacity'
                }

            );


            gsap.set(

                content,

                {
                    clearProps:
                        'opacity,transform'
                }

            );

        }

    })

        .to(

            content,

            {

                opacity: 0,

                y: 20,

                scale: 0.98,

                duration: 0.25,

                ease: 'power2.in'

            }

        )

        .to(

            modal,

            {

                opacity: 0,

                duration: 0.2,

                ease: 'power1.in'

            },

            '-=0.1'

        );

}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(

    'error',

    event => {

        const element =
            event.target;


        if (
            element instanceof
            HTMLImageElement
        ) {

            element.classList.add(
                'image-load-error'
            );

        }

    },

    true

);


/* =========================================================
   SAFETY:
   ESCAPE BODY LOCK IF PAGE IS RELOADED / RESTORED
   ========================================================= */

window.addEventListener(

    'pageshow',

    () => {

        document.body.classList.remove(
            'modal-open'
        );

    }

);


/* =========================================================
   PROJECT SEARCH
   ---------------------------------------------------------
   Features:
   - Realtime search
   - Search title
   - Search description
   - Search technologies
   - "/" shortcut to focus search
   - ESC to clear search
   - Clear button
   - Result counter
   - Automatically select matched project
   - Automatically scroll GSAP animation to matched project
   - Keep GSAP timeline stable
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById(
            "project-search-input"
        );

    const clearButton =
        document.getElementById(
            "project-search-clear"
        );

    const resultText =
        document.getElementById(
            "project-search-result"
        );


    if (!searchInput) {
        return;
    }


    /* =====================================================
       FIND PROJECT ELEMENTS
       ===================================================== */

    const projectCards =
        Array.from(
            document.querySelectorAll(
                ".project-card-frame"
            )
        );


    const infoCards =
        Array.from(
            document.querySelectorAll(
                ".info-card"
            )
        );


    const projectCount =
        Math.max(
            projectCards.length,
            infoCards.length
        );


    /* =====================================================
       CREATE SEARCH DATA
       ===================================================== */

    const projects = [];


    for (
        let i = 0;
        i < projectCount;
        i++
    ) {

        const card =
            projectCards[i];

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


        projects.push({

            index: i,

            title:
                title.trim(),

            description:
                description.trim(),

            tags:
                tags.trim(),

            searchText: `
                ${title}
                ${description}
                ${tags}
            `.toLowerCase()

        });

    }


    /* =====================================================
       ACTIVE SEARCH PROJECT
       ===================================================== */

    let selectedProjectIndex = -1;


    /* =====================================================
       CLEAR SELECTED STATE
       ===================================================== */

    function clearSelectedProject() {

        projectCards.forEach(card => {

            card.classList.remove(
                "project-search-selected"
            );

        });


        infoCards.forEach(card => {

            card.classList.remove(
                "project-search-selected"
            );

        });


        selectedProjectIndex = -1;

    }


    /* =====================================================
       SELECT PROJECT
       ===================================================== */

    function selectProject(index) {

        if (
            index < 0 ||
            index >= projectCount
        ) {

            return;

        }


        selectedProjectIndex =
            index;


        /* -------------------------------------------------
           CLEAR PREVIOUS SELECTION
           ------------------------------------------------- */

        clearSelectedProject();


        selectedProjectIndex =
            index;


        /* -------------------------------------------------
           SELECT CARD
           ------------------------------------------------- */

        if (projectCards[index]) {

            projectCards[index]
                .classList.add(
                    "project-search-selected"
                );

        }


        /* -------------------------------------------------
           SELECT INFO
           ------------------------------------------------- */

        if (infoCards[index]) {

            infoCards[index]
                .classList.add(
                    "project-search-selected"
                );

        }


        /* -------------------------------------------------
           GET GSAP TIMELINE
           ------------------------------------------------- */

        const timeline =
            window.portfolioScrollTimeline;


        if (
            !timeline ||
            !timeline.scrollTrigger
        ) {

            return;

        }


        const scrollTrigger =
            timeline.scrollTrigger;


        /* -------------------------------------------------
           CALCULATE PROJECT PROGRESS
           
           Project 0 = 0%
           Project 1 = 1 / TOTAL
           Project 2 = 2 / TOTAL
           etc.
           ------------------------------------------------- */

        const totalProjects =
            projectCount;


        if (totalProjects <= 1) {
            return;
        }


        const targetProgress =
            index /
            (totalProjects - 1);


        /* -------------------------------------------------
           CONVERT PROGRESS → PAGE SCROLL POSITION
           ------------------------------------------------- */

        const targetScroll =
            scrollTrigger.start +
            targetProgress *
            (
                scrollTrigger.end -
                scrollTrigger.start
            );


        /* -------------------------------------------------
           SCROLL TO PROJECT
           ------------------------------------------------- */

        window.scrollTo({

            top:
                targetScroll,

            behavior:
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"

        });

    }


    /* =====================================================
       RESULT MESSAGE
       ===================================================== */

    function updateResultMessage(
        query,
        visibleCount
    ) {

        if (!resultText) {
            return;
        }


        if (!query) {

            resultText.textContent =
                "";

            resultText.classList.remove(
                "is-visible",
                "is-empty"
            );

            return;

        }


        resultText.classList.add(
            "is-visible"
        );


        if (visibleCount === 0) {

            resultText.textContent =
                "NO PROJECT FOUND";


            resultText.classList.add(
                "is-empty"
            );


            return;

        }


        resultText.classList.remove(
            "is-empty"
        );


        resultText.textContent =
            `${visibleCount} PROJECT${
                visibleCount > 1
                    ? "S"
                    : ""
            } FOUND`;

    }


    /* =====================================================
       CLEAR SEARCH
       ===================================================== */

    function clearSearch() {

        searchInput.value =
            "";


        if (clearButton) {

            clearButton.classList.remove(
                "is-visible"
            );

        }


        clearSelectedProject();


        updateResultMessage(
            "",
            projects.length
        );


        /* -------------------------------------------------
           OPTIONAL:
           KEMBALI KE PROJECT PERTAMA
           
           Tidak dipaksa scroll.
           Hanya selection yang dihapus.
           ------------------------------------------------- */

        searchInput.focus();

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    function performSearch() {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        /* =================================================
           EMPTY QUERY
           ================================================= */

        if (!query) {

            if (clearButton) {

                clearButton.classList.remove(
                    "is-visible"
                );

            }


            clearSelectedProject();


            updateResultMessage(
                "",
                projects.length
            );


            return;

        }


        if (clearButton) {

            clearButton.classList.add(
                "is-visible"
            );

        }


        /* =================================================
           FIND MATCHES
           ================================================= */

        const matchedProjects =
            projects.filter(
                project =>
                    project.searchText.includes(
                        query
                    )
            );


        /* =================================================
           RESULT MESSAGE
           ================================================= */

        updateResultMessage(
            query,
            matchedProjects.length
        );


        /* =================================================
           NO RESULT
           ================================================= */

        if (!matchedProjects.length) {

            clearSelectedProject();

            return;

        }


        /* =================================================
           SELECT FIRST MATCH
           ================================================= */

        /*
         * Jika query cocok beberapa project,
         * project pertama langsung dipilih.
         */

        const firstMatch =
            matchedProjects[0];


        selectProject(
            firstMatch.index
        );

    }


    /* =====================================================
       INPUT EVENT
       ===================================================== */

    searchInput.addEventListener(
        "input",
        performSearch
    );


    /* =====================================================
       CLEAR BUTTON
       ===================================================== */

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearSearch
        );

    }


    /* =====================================================
       KEYBOARD SHORTCUT
       "/" = FOCUS SEARCH
       ESC = CLEAR SEARCH
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


            /* ---------------------------------------------
               "/" → FOCUS SEARCH
               --------------------------------------------- */

            if (
                event.key === "/" &&
                !isTyping
            ) {

                event.preventDefault();

                searchInput.focus();

                return;

            }


            /* ---------------------------------------------
               ESC → CLEAR SEARCH
               --------------------------------------------- */

            if (
                event.key === "Escape" &&
                document.activeElement ===
                    searchInput
            ) {

                if (
                    searchInput.value
                ) {

                    clearSearch();

                } else {

                    searchInput.blur();

                }

            }

        }
    );

});

/* =========================================================
   FLOATING NAVIGATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

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
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           DETECT CURRENT PAGE
           ================================================= */

        const currentPath =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        let currentPage;


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


        /* =================================================
           ACTIVE PAGE
           ================================================= */

        items.forEach(
            item => {

                const page =
                    item.dataset.page;


                if (
                    page === currentPage
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


        /* =================================================
           GSAP AVAILABLE?
           ================================================= */

        const hasGSAP =
            typeof gsap !== "undefined";


        /* =================================================
           OPEN MENU
           ================================================= */

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


            /* ---------------------------------------------
               ANIMATION
               --------------------------------------------- */

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


        /* =================================================
           CLOSE MENU
           ================================================= */

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


            /* ---------------------------------------------
               ANIMATION
               --------------------------------------------- */

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


        /* =================================================
           TOGGLE
           ================================================= */

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


        /* =================================================
           NAVIGATION CLICK
           ================================================= */

        items.forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        /*
                         * Jangan mencegah default link.
                         *
                         * Browser akan langsung menuju:
                         *
                         * ./index.html
                         * ./project.html
                         */

                        closeMenu();

                    }
                );

            }
        );


        /* =================================================
           CLICK OUTSIDE
           ================================================= */

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


        /* =================================================
           ESC
           ================================================= */

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


        /* =================================================
           INITIAL STATE
           ================================================= */

        items.forEach(
            item => {

                item.style.opacity =
                    "0";

            }
        );

    }
);

/* =========================================================
   42. PROJECT RESPONSIVE / INFO CARD SAFETY PATCH
   ---------------------------------------------------------
   Fix:
   - Project text kedua/ketiga tidak hilang
   - Button View Details / Visit Website tetap muncul
   - Info card mengikuti project aktif
   - Recalculate layout saat resize/orientation
   - Tidak mengambil alih sistem modal
   - Tidak mengambil alih floating navigation
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const stage =
        document.getElementById("stage");

    const infoPanel =
        document.querySelector(".info-panel");

    const infoCards =
        Array.from(
            document.querySelectorAll(".info-card")
        );

    const cardDeck =
        document.querySelector(".card-deck");


    if (!stage || !infoPanel || !infoCards.length) {
        return;
    }


    /* =====================================================
       HELPER
       ===================================================== */

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
       FIND ACTIVE INFO CARD
       ===================================================== */

    function getActiveInfoCard() {

        let active =
            infoCards.find(
                card =>
                    card.classList.contains(
                        "is-active"
                    )
            );


        /*
         * Kalau JS utama belum memberi is-active,
         * gunakan card pertama sebagai fallback.
         */
        if (!active) {

            active =
                infoCards[0];

        }


        return active;

    }


    /* =====================================================
       NORMALIZE INFO PANEL
       ===================================================== */

    function normalizeInfoPanel() {

        const active =
            getActiveInfoCard();


        /*
         * Pastikan panel tidak memotong konten.
         */
        infoPanel.style.height =
            "auto";

        infoPanel.style.minHeight =
            isSmallMobile()
                ? "390px"
                : isMobile()
                    ? "360px"
                    : "380px";


        infoPanel.style.overflow =
            "visible";


        /*
         * Jangan mengubah opacity / visibility
         * seluruh card di sini.
         *
         * JS scrollytelling tetap bertanggung
         * jawab terhadap card aktif.
         */
        infoCards.forEach(
            card => {

                card.style.overflow =
                    "visible";

                card.style.height =
                    "auto";

            }
        );


        /*
         * Berikan sedikit ruang tambahan setelah
         * button terakhir agar tidak terpotong.
         */
        const actions =
            active
                ? active.querySelector(
                    ".info-actions"
                )
                : null;


        if (actions) {

            actions.style.overflow =
                "visible";

            actions.style.paddingBottom =
                isMobile()
                    ? "8px"
                    : "5px";

        }

    }


    /* =====================================================
       MOBILE LAYOUT
       ===================================================== */

    function normalizeStage() {

        /*
         * Jangan mengubah positioning utama yang
         * kemungkinan dikontrol GSAP.
         *
         * Kita hanya memastikan clipping tidak terjadi.
         */

        stage.style.overflow =
            "visible";


        if (isMobile()) {

            stage.style.height =
                "auto";

            stage.style.minHeight =
                "100%";

        }


        /*
         * Landscape membutuhkan sedikit ruang ekstra
         * untuk info text + buttons.
         */

        if (isLandscapeMobile()) {

            infoPanel.style.minHeight =
                "300px";

        }

    }


    /* =====================================================
       FORCE BUTTON VISIBILITY
       ===================================================== */

    function normalizeButtons() {

        infoCards.forEach(
            card => {

                const actions =
                    card.querySelector(
                        ".info-actions"
                    );


                if (!actions) {
                    return;
                }


                actions.style.overflow =
                    "visible";


                /*
                 * Jangan hide button karena ukuran
                 * container yang terlalu kecil.
                 */
                const buttons =
                    actions.querySelectorAll(
                        ".info-link"
                    );


                buttons.forEach(
                    button => {

                        button.style.flexShrink =
                            "0";

                        button.style.visibility =
                            "visible";

                        button.style.pointerEvents =
                            "auto";

                    }
                );

            }
        );

    }


    /* =====================================================
       DETECT CARD HEIGHT
       ===================================================== */

    function updatePanelHeight() {

        const active =
            getActiveInfoCard();


        if (!active) {
            return;
        }


        /*
         * Ambil tinggi konten sebenarnya.
         */
        const contentHeight =
            active.scrollHeight;


        if (!contentHeight) {
            return;
        }


        let minimumHeight;


        if (isSmallMobile()) {

            minimumHeight =
                390;

        } else if (isMobile()) {

            minimumHeight =
                360;

        } else {

            minimumHeight =
                380;

        }


        /*
         * Jangan memaksa panel menjadi terlalu kecil.
         */
        infoPanel.style.minHeight =
            Math.max(
                minimumHeight,
                contentHeight
            ) + "px";

    }


    /* =====================================================
       RUN FIX
       ===================================================== */

    function applyResponsiveFix() {

        normalizeStage();

        normalizeInfoPanel();

        normalizeButtons();

        updatePanelHeight();

    }


    /* =====================================================
       INITIAL
       ===================================================== */

    applyResponsiveFix();


    /*
     * Jalankan lagi setelah browser selesai
     * melakukan layout.
     */
    requestAnimationFrame(
        function () {

            applyResponsiveFix();

        }
    );


    setTimeout(
        function () {

            applyResponsiveFix();

        },
        250
    );


    setTimeout(
        function () {

            applyResponsiveFix();

        },
        700
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        applyResponsiveFix();

                    },
                    120
                );

        }
    );


    /* =====================================================
       ORIENTATION CHANGE
       ===================================================== */

    window.addEventListener(
        "orientationchange",
        function () {

            setTimeout(
                function () {

                    applyResponsiveFix();

                },
                200
            );

        }
    );


    /* =====================================================
       OBSERVE ACTIVE CARD CHANGES
       -----------------------------------------------------
       Kalau JS utama mengubah:
           .info-card.is-active
       observer akan mendeteksi perubahan tersebut.
       ===================================================== */

    const observer =
        new MutationObserver(
            function (mutations) {

                let activeChanged =
                    false;


                mutations.forEach(
                    mutation => {

                        if (
                            mutation.type ===
                            "attributes" &&
                            mutation.attributeName ===
                            "class"
                        ) {

                            activeChanged =
                                true;

                        }

                    }
                );


                if (activeChanged) {

                    /*
                     * Beri waktu GSAP / JS utama
                     * menyelesaikan perubahan.
                     */
                    requestAnimationFrame(
                        function () {

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
       -----------------------------------------------------
       Kalau gambar/font menyebabkan tinggi berubah,
       hitung ulang setelah gambar selesai.
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
                        function () {

                            applyResponsiveFix();

                        },
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
            function () {

                applyResponsiveFix();

            }
        );

    }

});

/* =========================================================
   MOBILE PAGE SCROLL FIX
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    function unlockPageScroll() {

        /*
         * Pastikan html dan body tidak terkunci.
         */
        document.documentElement.style.overflowX = "hidden";
        document.documentElement.style.overflowY = "auto";

        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";

        document.documentElement.style.height = "auto";
        document.body.style.height = "auto";


        /*
         * Beberapa modal/menu kadang meninggalkan
         * overflow:hidden setelah ditutup.
         */
        if (
            !document.querySelector(
                "#projectModal[style*='display: block']"
            )
        ) {

            document.documentElement.style.overflowY =
                "auto";

            document.body.style.overflowY =
                "auto";

        }

    }


    /* Jalankan saat halaman pertama kali dibuka */
    unlockPageScroll();


    /*
     * Jalankan lagi ketika ukuran viewport berubah.
     * Penting untuk mobile karena address bar browser
     * mengubah tinggi viewport.
     */
    window.addEventListener(
        "resize",
        unlockPageScroll
    );


    window.addEventListener(
        "orientationchange",
        function () {

            setTimeout(
                unlockPageScroll,
                300
            );

        }
    );


    /*
     * Setelah menu floating ditutup,
     * pastikan halaman kembali bisa scroll.
     */
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
            function () {

                setTimeout(
                    unlockPageScroll,
                    50
                );

            }
        );

    }


    /*
     * Setelah modal ditutup, unlock scroll.
     */
    const closeBtn =
        document.querySelector(
            ".modal-close"
        );

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            function () {

                setTimeout(
                    unlockPageScroll,
                    50
                );

            }
        );

    }


});
