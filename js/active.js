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

// Attach form validation to all forms
// document.querySelectorAll('form').forEach(form => {
//     form.addEventListener('submit', function (event) {
//         // Clear any previous error messages
//         clearErrors(form);

//         // Determine which form is being submitted based on its fields
//         let isValid = true;

//         const name = form.querySelector('#name');
//         const email = form.querySelector('#email');
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         // Common field validation (name and email)
//         if (name && name.value.trim() === "") {
//             showError(name, "Full Name is required");
//             isValid = false;
//         }

//         if (email && email.value.trim() === "") {
//             showError(email, "Email is required");
//             isValid = false;
//         } else if (email && !emailRegex.test(email.value.trim())) {
//             showError(email, "Please enter a valid email address");
//             isValid = false;
//         }

//         // Specific form field validation based on form type
//         if (form.querySelector('#subject')) { // Contact form
//             const subject = form.querySelector('#subject');
//             const message = form.querySelector('#message');

//             if (subject && subject.value.trim() === "") {
//                 showError(subject, "Subject is required");
//                 isValid = false;
//             }

//             if (message && message.value.trim() === "") {
//                 showError(message, "Message is required");
//                 isValid = false;
//             }

//         } else if (form.querySelector('#session-date') && form.querySelector('#package')) { // Booking form 1
//             const sessionDate = form.querySelector('#session-date');
//             const packageSelect = form.querySelector('#package');
//             const message = form.querySelector('#message');

//             if (sessionDate && sessionDate.value === "") {
//                 showError(sessionDate, "Preferred Session Date is required");
//                 isValid = false;
//             }

//             if (packageSelect && packageSelect.value === "") {
//                 showError(packageSelect, "Please select a package");
//                 isValid = false;
//             }

//             if (message && message.value.length > 500) {
//                 showError(message, "Message must not exceed 500 characters");
//                 isValid = false;
//             }

//         } else if (form.querySelector('#console-hours')) { // Booking form 2 (Special Offer)
//             const sessionDate = form.querySelector('#session-date');
//             const packageSelect = form.querySelector('#package');
//             const consoleHours = form.querySelector('#console-hours');
//             const message = form.querySelector('#message');

//             if (sessionDate && sessionDate.value === "") {
//                 showError(sessionDate, "Preferred Session Date is required");
//                 isValid = false;
//             }

//             if (packageSelect && packageSelect.value === "") {
//                 showError(packageSelect, "Please select a recording package");
//                 isValid = false;
//             }

//             if (consoleHours && consoleHours.value === "") {
//                 showError(consoleHours, "Please select the number of console hours");
//                 isValid = false;
//             }

//             if (message && message.value.length > 500) {
//                 showError(message, "Message must not exceed 500 characters");
//                 isValid = false;
//             }
//         }

//         // Prevent form submission if validation fails
//         if (!isValid) {
//             event.preventDefault();
//         }
//     });
// });

// // Function to show error message
// function showError(input, message) {
//     const formGroup = input.parentElement;
//     const errorElement = document.createElement('div');
//     errorElement.className = 'error-message';
//     errorElement.style.color = 'red';
//     errorElement.innerText = message;
//     formGroup.appendChild(errorElement);
// }

// // Function to clear all previous error messages for a specific form
// function clearErrors(form) {
//     const errorMessages = form.querySelectorAll('.error-message');
//     errorMessages.forEach(function (message) {
//         message.remove();
//     });
// }





// New form with EmailJS

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear any previous error messages
        clearErrors(form);

        // Determine which form is being submitted based on the hidden form_type field
        const formType = form.querySelector('input[name="form_type"]').value;
        let serviceID = "service_lx3mvp4"; // EmailJS Service ID
        let templateID = ""; // Will be set based on the form type
        let isValid = true;

        // Common validation for name and email
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.trim() === "") {
            showError(form.querySelector('#name'), "Full Name is required");
            isValid = false;
        }

        if (email.trim() === "") {
            showError(form.querySelector('#email'), "Email is required");
            isValid = false;
        } else if (!emailRegex.test(email.trim())) {
            showError(form.querySelector('#email'), "Please enter a valid email address");
            isValid = false;
        }

        // Form-specific validation and EmailJS template setup
        let emailParams = {}; // This will store the form data to send via EmailJS

        if (formType === "contact_form") {
            // Contact Form
            const subject = form.querySelector('#subject').value;
            const message = form.querySelector('#message').value;

            if (subject.trim() === "") {
                showError(form.querySelector('#subject'), "Subject is required");
                isValid = false;
            }

            if (message.trim() === "") {
                showError(form.querySelector('#message'), "Message is required");
                isValid = false;
            }

            templateID = "template_t0yl0kj"; // EmailJS Template ID for the Contact Form
            emailParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

        } else if (formType === "booking_form_1") {
            // Booking Form 1
            const sessionDate = form.querySelector('#session-date').value;
            const packageSelect = form.querySelector('#package').value;
            const message = form.querySelector('#message').value;

            if (sessionDate === "") {
                showError(form.querySelector('#session-date'), "Preferred Session Date is required");
                isValid = false;
            }

            if (packageSelect === "") {
                showError(form.querySelector('#package'), "Please select a package");
                isValid = false;
            }

            templateID = "template_abutmdf"; // EmailJS Template ID for Booking Form 1
            emailParams = {
                from_name: name,
                from_email: email,
                session_date: sessionDate,
                package: packageSelect,
                message: message
            };

        } else if (formType === "booking_form_2") {
            // Booking Form 2 (Console Hours)
            const sessionDate = form.querySelector('#session-date').value;
            const packageSelect = form.querySelector('#package').value;
            const consoleHours = form.querySelector('#console-hours').value;
            const message = form.querySelector('#message').value;

            if (sessionDate === "") {
                showError(form.querySelector('#session-date'), "Preferred Session Date is required");
                isValid = false;
            }

            if (packageSelect === "") {
                showError(form.querySelector('#package'), "Please select a recording package");
                isValid = false;
            }

            if (consoleHours === "") {
                showError(form.querySelector('#console-hours'), "Please select the number of console hours");
                isValid = false;
            }

            templateID = "template_abutmdf"; // EmailJS Template ID for Booking Form 2
            emailParams = {
                from_name: name,
                from_email: email,
                session_date: sessionDate,
                package: packageSelect,
                console_hours: consoleHours,
                message: message
            };
        }

        // Prevent submission if validation fails
        if (!isValid) {
            return;
        }

        // Send the form data using EmailJS
        emailjs.send(serviceID, templateID, emailParams)
        .then(function(response) {
            alert("Form submitted successfully!");
        }, function(error) {
            alert("There was an error submitting the form: " + error);
        });
    });
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

// Function to clear all previous error messages for a specific form
function clearErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });
}
initChatbot()


// Urban 

// $(document).ready(function () {
//   // Simulated database of talents (replace with actual API call if needed)
//   const talentsDatabase = [
//     {
//       name: "Like A Star 🌟",
//       description: "Artist's Talent",
//       image: "https://raw.githubusercontent.com/08MadNation/TEST/refs/heads/main/js/WhatsApp%20Image%202025-02-27%20at%2017.46.35_b460a731.jpg",
//     },
//     {
//       name: "Young Trapo",
//       description: "Artist's Talent",
//       image: "https://raw.githubusercontent.com/08MadNation/TEST/refs/heads/main/js/2.jpg",
//     },
//     {
//       name: "Spyk357",
//       description: "Artist's Talent",
//       image: "https://raw.githubusercontent.com/08MadNation/TEST/refs/heads/main/js/3.jpg",
//     },
//     {
//       name: "Big Shata",
//       description: "Artist's Talent",
//       image: "https://raw.githubusercontent.com/08MadNation/TEST/refs/heads/main/js/1.jpg",
//     },
//     {
//       name: "Maigane Flow",
//       description: "Artist's Talent",
//       image: "https://raw.githubusercontent.com/08MadNation/TEST/refs/heads/main/js/4.jpg",
//     },
//   ];

//   let currentIndex = 6; // Start loading from index 6 (after initial 6 cards)

//   // Function to load more talents
//   function loadMoreTalents() {
//     const container = $(".talent-talents-container");
//     const nextIndex = currentIndex + 3;

//     for (let i = currentIndex; i < Math.min(nextIndex, talentsDatabase.length); i++) {
//       const talent = talentsDatabase[i];
//       const card = `
//         <div class="talent-card">
//           <div class="talent-img-container">
//             <img src="${talent.image}" alt="${talent.name}"/>
//           </div>
//           <div class="talent-card-details">
//             <h2>${talent.name}</h2>
//             <p>${talent.description}</p>
//           </div>
//         </div>
//       `;
//       container.append(card);
//     }

//     currentIndex = nextIndex;

//     // Hide "Load More" button if all talents are loaded
//     if (currentIndex >= talentsDatabase.length) {
//       $("#load-more").hide();
//     }
//   }

//   // Attach click event to "Load More" button
//   $("#load-more").on("click", loadMoreTalents);
// });

// $(document).ready(function () {
//     // Number of talents to load per click
//     const talentsPerLoad = 6;

//     // Cache the talent cards and hide all except the first set
//     const $talentCards = $('.talent-card');
//     const totalTalents = $talentCards.length;
//     let visibleTalents = talentsPerLoad;

//     // Initially hide all talents beyond the first set
//     $talentCards.slice(visibleTalents).hide();

//     // Load More Button Click Event
//     $('#load-more').on('click', function () {
//         // Calculate the next set of talents to show
//         const nextTalents = visibleTalents + talentsPerLoad;

//         // Show the next set of talents with a smooth fade-in effect
//         $talentCards.slice(visibleTalents, nextTalents).fadeIn(500);

//         // Update the visibleTalents counter
//         visibleTalents = nextTalents;

//         // Hide the "Load More" button if all talents are visible
//         if (visibleTalents >= totalTalents) {
//             $('#load-more').hide();
//         }
//     });

//     // Hide the "Load More" button if there are no more talents to load initially
//     if (visibleTalents >= totalTalents) {
//         $('#load-more').hide();
//     }
// });


$(document).ready(function() {
    const loadMoreButton = $('#load-more'); // Target the "Load More" button
    const talentsContainer = $('.talent-talents-container'); // Target the container for talent cards
    const initialTalents = 6; // Number of talents initially displayed
    const talentsPerLoad = 3; // Number of talents to load each time
    let currentTalents = initialTalents;
  
    // Function to load more talents
    function loadMoreTalents() {
      const allTalents = talentsContainer.find('.talent-card'); // Get all talent cards
      allTalents.slice(currentTalents, currentTalents + talentsPerLoad).show(); // Show the next set of talents
      currentTalents += talentsPerLoad;
  
      // Hide the button if all talents are loaded
      if (currentTalents >= allTalents.length) {
        loadMoreButton.hide();
      }
    }
  
    // Initially hide all talents except the first few
    function hideInitialTalents() {
      const allTalents = talentsContainer.find('.talent-card'); // Get all talent cards
      allTalents.slice(initialTalents).hide(); // Hide all talents except the first 6
    }
  
    hideInitialTalents(); // Call the function to hide initial talents
  
    // Event listener for the "Load More" button
    loadMoreButton.on('click', loadMoreTalents);
  });


//   video js 

