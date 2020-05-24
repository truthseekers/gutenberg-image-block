jQuery(document).ready(function ($) {
    console.log("wooow");
    $('.jsc-lightbox-img').click(function () {
        if ($(this.parentElement).hasClass("is-style-jsc-lightbox")) {
            this.nextSibling.style.display = "flex";
            console.log('Has class');
        } else {
            console.log("lightbox is turned off for this item");
        }
        // this.nextSibling.style.display = "flex";
    })

    $('.outer').click(function () {
        this.style.display = "none";
    })


});
