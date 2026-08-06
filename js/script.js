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