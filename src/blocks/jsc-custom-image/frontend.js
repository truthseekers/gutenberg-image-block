// A $( document ).ready() block.

// console.log("Hey from frontend.js");

jQuery(document).ready(function ($) {
    console.log("you still working?");
    $('.jsc-lightbox-img').click(function () {
        this.nextSibling.style.display = "flex";
    })


});
