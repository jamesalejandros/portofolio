document.addEventListener("DOMContentLoaded", function () {


    /*
    ==========================================================
    IMAGE UPLOAD PREVIEW
    ==========================================================
    */


    const input =
        document.getElementById('imageInput');

    const preview =
        document.getElementById('preview');

    const addBtn =
        document.getElementById('addBtn');


    const form =
        document.getElementById('projectForm') ||
        document.getElementById('editForm');


    if (input && preview && addBtn && form) {


        let selectedFiles = [];


        // OPEN FILE SELECTOR

        addBtn.addEventListener(
            'click',
            () => {

                input.click();

            }
        );



        // SELECT FILE

        input.addEventListener(
            'change',
            function(e){


                const files =
                    Array.from(
                        e.target.files
                    );


                files.forEach(file=>{


                    const exists =
                        selectedFiles.some(f =>
                            f.name === file.name &&
                            f.size === file.size
                        );


                    if(exists)
                        return;



                    selectedFiles.push(file);



                    const reader =
                        new FileReader();



                    reader.onload =
                    function(e){


                        const wrapper =
                            document.createElement(
                                'div'
                            );


                        wrapper.style.position =
                            "relative";


                        wrapper.style.display =
                            "inline-block";



                        const img =
                            document.createElement(
                                'img'
                            );


                        img.src =
                            e.target.result;


                        img.width =
                            100;


                        img.style.margin =
                            "5px";


                        img.style.border =
                            "1px solid #ccc";




                        const removeBtn =
                            document.createElement(
                                'button'
                            );


                        removeBtn.innerHTML =
                            "×";


                        removeBtn.style.position =
                            "absolute";


                        removeBtn.style.top =
                            "0";


                        removeBtn.style.right =
                            "0";


                        removeBtn.style.background =
                            "red";


                        removeBtn.style.color =
                            "white";


                        removeBtn.style.border =
                            "none";


                        removeBtn.style.cursor =
                            "pointer";



                        removeBtn.onclick =
                        function(){


                            selectedFiles =
                                selectedFiles.filter(
                                    f=>f!==file
                                );


                            wrapper.remove();


                        };



                        wrapper.appendChild(img);

                        wrapper.appendChild(removeBtn);

                        preview.appendChild(wrapper);



                    };


                    reader.readAsDataURL(file);


                });


                input.value="";


            }
        );




        /*
        ======================================================
        SUBMIT WITH MULTIPLE IMAGE
        ======================================================
        */


        form.addEventListener(
            'submit',
            function(e){


                if(selectedFiles.length===0)
                    return;



                e.preventDefault();



                const formData =
                    new FormData(form);



                selectedFiles.forEach(file=>{


                    formData.append(
                        'images[]',
                        file
                    );


                });



                fetch(
                    form.action,
                    {
                        method:"POST",
                        body:formData
                    }
                )
                .then(res=>{


                    if(res.redirected){

                        window.location.href =
                            res.url;

                    }


                })
                .catch(err=>{

                    console.error(err);

                });



            }
        );


    }





    /*
    ==========================================================
    PROJECT MODAL SYSTEM
    ==========================================================
    */


    const modal =
        document.getElementById(
            "projectModal"
        );


    if(!modal)
        return;



    const closeBtn =
        document.querySelector(
            ".modal-close"
        );



    if(closeBtn){

        closeBtn.onclick =
        function(){

            modal.style.display =
                "none";

        };

    }




    window.onclick =
    function(e){


        if(e.target===modal){

            modal.style.display =
                "none";

        }


    };





    /*
    ==========================================================
    OPEN PROJECT MODAL
    ==========================================================
    */


    window.openProjectModal =
    function(
        title,
        description,
        mainImage,
        gallery,
        tags
    ){



        modal.style.display =
            "block";




        document
        .getElementById(
            "modalTitle"
        )
        .innerText =
            title;




        document
        .getElementById(
            "modalDescription"
        )
        .innerText =
            description;




        document
        .getElementById(
            "mainImage"
        )
        .src =
            mainImage;





        /*
        ======================================================
        DYNAMIC GALLERY
        ======================================================
        */


        const thumbnailRow =
            document.querySelector(
                ".thumbnail-row"
            );



        if(thumbnailRow){


            thumbnailRow.innerHTML =
                "";



            if(
                gallery &&
                gallery.length > 0
            ){


                gallery.forEach(
                    function(image,index){



                        const thumb =
                            document.createElement(
                                "img"
                            );



                        thumb.src =
                            image;



                        thumb.className =
                            "thumb";



                        if(index===0){

                            thumb.classList.add(
                                "active"
                            );

                        }




                        thumb.onclick =
                        function(){



                            document
                            .getElementById(
                                "mainImage"
                            )
                            .src =
                                this.src;




                            document
                            .querySelectorAll(
                                ".thumb"
                            )
                            .forEach(t=>{


                                t.classList.remove(
                                    "active"
                                );


                            });




                            this.classList.add(
                                "active"
                            );



                        };




                        thumbnailRow.appendChild(
                            thumb
                        );


                    }
                );


            }


        }





        /*
        ======================================================
        TAG GENERATOR
        ======================================================
        */


        const tagsContainer =
            document.getElementById(
                "projectTags"
            );



        if(tagsContainer){


            tagsContainer.innerHTML =
                "";



            if(
                tags &&
                tags.length
            ){



                tags.forEach(
                    function(tag){


                        const span =
                            document.createElement(
                                "span"
                            );


                        span.innerText =
                            tag;



                        tagsContainer.appendChild(
                            span
                        );


                    }
                );


            }


        }



    };





    /*
    ==========================================================
    THUMBNAIL SCROLLER
    ==========================================================
    */


    const thumbnailRow =
        document.querySelector(
            ".thumbnail-row"
        );


    const nextThumb =
        document.querySelector(
            ".next-thumb"
        );


    const prevThumb =
        document.querySelector(
            ".prev-thumb"
        );



    if(nextThumb){


        nextThumb.onclick =
        function(){


            thumbnailRow.scrollBy({

                left:150,

                behavior:"smooth"

            });


        };


    }




    if(prevThumb){


        prevThumb.onclick =
        function(){


            thumbnailRow.scrollBy({

                left:-150,

                behavior:"smooth"

            });


        };


    }



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

