(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#madnationNav').classyNav();
    }

    // :: 3.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-slides');
        var testimonials = $('.testimonials-slide');
        var albumSlides = $('.albums-slideshow');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 1000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        testimonials.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            dots: false,
            autoplay: true
        });

        albumSlides.owlCarousel({
            items: 5,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 750,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        });
    }

    // :: 4.0 Masonary Gallery Active Code
    if ($.fn.imagesLoaded) {
        $('.madnation-albums').imagesLoaded(function () {
            // filter items on button click
            $('.catagory-menu').on('click', 'a', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            // init Isotope
            var $grid = $('.madnation-albums').isotope({
                itemSelector: '.single-album-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.single-album-item'
                }
            });
        });
    }

    // :: 5.0 Video Active Code
    if ($.fn.magnificPopup) {
        $('.video--play--btn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }

    // :: 6.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }

    // :: 7.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 8.0 Sticky Active Code
    if ($.fn.sticky) {
        $(".madnation-main-menu").sticky({
            topSpacing: 0
        });
    }

    // :: 9.0 Progress Bar Active Code
    if ($.fn.circleProgress) {
        $('#circle').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
        $('#circle2').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
        $('#circle3').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
        $('#circle4').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
    }

    // :: 10.0 audioPlayer Active Code
    if ($.fn.audioPlayer) {
        $('audio').audioPlayer();
    }

    // :: 11.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // :: 12.0 prevent default a click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // :: 13.0 wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }
    
    // :: 14.0 Gallery Menu Active Code
    $('.catagory-menu a').on('click', function () {
        $('.catagory-menu a').removeClass('active');
        $(this).addClass('active');
    })

})(jQuery);

// hiddenAlbums
// Show 6 items initially, hide the rest
// document.addEventListener('DOMContentLoaded', function() {
//     const loadMoreBtn = document.querySelector('.load-more-btn .btn');
//     const itemsToShow = 6; // Show 6 items at a time

//     loadMoreBtn.addEventListener('click', function(e) {
//         e.preventDefault();

//         let hiddenItems = document.querySelectorAll('.single-album-item.hidden');
//         for (let i = 0; i < itemsToShow; i++) {
//             if (hiddenItems[i]) {
//                 hiddenItems[i].classList.remove('hidden');
//             }
//         }

//         // Hide load more button if no more hidden items
//         if (document.querySelectorAll('.single-album-item.hidden').length === 0) {
//             loadMoreBtn.style.display = 'none';
//         }
//     });
// });

// Form Validation for contact form


document.querySelector('form').addEventListener('submit', function (event) {
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Regular expression for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear any previous error messages
    clearErrors();

    // Validation flags
    let isValid = true;

    // Validate name (not empty)
    if (name.value.trim() === "") {
        showError(name, "Name is required");
        isValid = false;
    }

    // Validate email (not empty and correct format)
    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address");
        isValid = false;
    }

    // Validate subject (not empty)
    if (subject.value.trim() === "") {
        showError(subject, "Subject is required");
        isValid = false;
    }

    // Validate message (not empty)
    if (message.value.trim() === "") {
        showError(message, "Message is required");
        isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

// Function to show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    formGroup.appendChild(errorElement);
}

// Function to clear all previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });
}




// Form Validation for Booking

document.querySelector('form').addEventListener('submit', function (event) {
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const sessionDate = document.getElementById('session-date');
    const packageSelect = document.getElementById('package');
    const message = document.getElementById('message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear any previous error messages
    clearErrors();

    let isValid = true;

    // Validate name
    if (name.value.trim() === "") {
        showError(name, "Full Name is required");
        isValid = false;
    }

    // Validate email
    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address");
        isValid = false;
    }

    // Validate session date
    if (sessionDate.value === "") {
        showError(sessionDate, "Preferred Session Date is required");
        isValid = false;
    }

    // Validate package selection
    if (packageSelect.value === "") {
        showError(packageSelect, "Please select a package");
        isValid = false;
    }

    // Optional: Validate message length (if provided)
    if (message.value.length > 500) {
        showError(message, "Message must not exceed 500 characters");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    formGroup.appendChild(errorElement);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });
}


// Form Validation for Special Offer

document.querySelector('form').addEventListener('submit', function (event) {
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const sessionDate = document.getElementById('session-date');
    const packageSelect = document.getElementById('package');
    const consoleHours = document.getElementById('console-hours');
    const message = document.getElementById('message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear any previous error messages
    clearErrors();

    let isValid = true;

    // Validate name
    if (name.value.trim() === "") {
        showError(name, "Full Name is required");
        isValid = false;
    }

    // Validate email
    if (email.value.trim() === "") {
        showError(email, "Email is required");
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address");
        isValid = false;
    }

    // Validate session date
    if (sessionDate.value === "") {
        showError(sessionDate, "Preferred Session Date is required");
        isValid = false;
    }

    // Validate package selection
    if (packageSelect.value === "") {
        showError(packageSelect, "Please select a recording package");
        isValid = false;
    }

    // Validate console hours
    if (consoleHours.value === "") {
        showError(consoleHours, "Please select the number of console hours");
        isValid = false;
    }

    // Optional: Validate message length (if provided)
    if (message.value.length > 500) {
        showError(message, "Message must not exceed 500 characters");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    formGroup.appendChild(errorElement);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });
}


