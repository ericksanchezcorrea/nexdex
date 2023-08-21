(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 0, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);


let errors

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); 
    
    // Obtener valores de los campos
    let  name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    // Validaciones
    errors =  validation(name, email, message)

    // Mostrar errores al usuario

    const error_name = document.querySelector(".error_name")
    const error_email = document.querySelector(".error_email")
    const error_message = document.querySelector(".error_message")

    const success = document.querySelector(".success")


    error_name.classList.add('error_block')
    error_name.textContent = `${errors.name ?? ''}`

    error_email.classList.add('error_block')
    error_email.textContent = `${errors.email ?? ''}`

    error_message.classList.add('error_block')
    error_message.textContent = `${errors.message ?? ''}`
    
    if(Object.keys(errors).length === 0) {

        try {
              // Enviar datos al backend
            const data = {name, email, message}
            
            const response = await fetch('http://localhost:4000/sendEmail', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resp = await response.json()
            
            if(resp.error) throw new Error("Hubo un error al enviar el enviar el formulario. Inténtelo más tarde")


            // Limpia los campos después de enviar
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            success.style.display = 'block'

            setTimeout(() => {
                success.style.display = 'none'
            }, 2000);

        } catch (error) {

            const error_response = document.querySelector(".error_response")
            error_response.style.display = "block"
            
            setTimeout(() => {
                success.style.display = 'none'
            }, 2000);
        }
      
    }
    
});


function validation(name, email, message){
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    let errors = {}

    if(name ==='') errors.name = 'Ingrese un nombre'
    if(message ==='') errors.message = 'Escriba un mensaje'
    
    if(!emailRegex.test(email)) errors.email = 'El email no es válido'
    if(email ==='') errors.email = 'Ingrese un email'
    
    return errors
}
