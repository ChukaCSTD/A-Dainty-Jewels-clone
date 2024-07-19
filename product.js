$(document).ready(function() {
    // Change main image on thumbnail click
    $('.thumbnail').click(function() {
        var src = $(this).attr('src');
        $('#main-image').attr('src', src);
    });

    // Change navigation style on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    $('.drop-button').on('click', function(event) {
        event.preventDefault
        $('.drop-dropdown').toggle();
    });

    $('.drop-button').on('click', function(e) {
        e.preventDefault;
        $(this).siblings('.drop-dropdown').toggle();
    });

    $('.stars a').on('click', function() {
        $('.stars span, .stars a').removeClass('active');

        $(this).addClass('active');
        $('.stars span').addClass('active');
        // alert($(this).text());
        // $('.myrating').html($(this).text()); 
    });

    // counter 
        $('.up').on('click', function() {
            var input = $(this).closest('.counter').find('input');
            var value = parseInt(input.val(), 10); 
            value = isNaN(value) ? 0 : value;
            value++;
            input.val(value);
        });

        $('.down').on('click', function() {
            var input = $(this).closest('.counter').find('input');
            var value = parseInt(input.val(), 10); 
            if (value > 1) {
                value = isNaN(value) ? 0 : value;
                value--;
                input.val(value);
            }
        });
    // counter
    $('.image-container').hover(
        function() {
            $(this).find('.top-text, .bottom-text').fadeIn();
        },
        function() {
            $(this).find('.top-text, .bottom-text').fadeOut();
        }
    );
});
