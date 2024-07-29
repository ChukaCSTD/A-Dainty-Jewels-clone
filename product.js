$(document).ready(function() {
    
    const apiEndpoint = "http://ecommerce.reworkstaging.name.ng/v2";

    // Toggle dropdown for profile icon
    $('#dropdown_pro').hover(
        function() {
            $(this).find('.drop-dropdown').stop(true, true).slideDown();
        },
        function() {
            $(this).find('.drop-dropdown').stop(true, true).slideUp();
        }
    );

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

    $('.drop-button').on('click', function() {
        event.preventDefault
        $('.menu_drop').toggle();
    });

    $('.drop-button').on('click', function() {
        e.preventDefault;
        $(this).siblings('.menu_drop').toggle();
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


            // Function to get user ID
        function getUserId() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'http://ecommerce.reworkstaging.name.ng/v2/user', // Replace with the actual endpoint to get user details
                    type: 'GET',
                    success: function(response) {
                        if (response && response.user_id) {
                            resolve(response.user_id);
                        } else {
                            reject('User ID not found');
                        }
                    },
                    error: function(error) {
                        reject('Error fetching user ID: ' + error);
                    }
                });
            });
        }
    
        // Like button functionality
        $('.top-text').click(function() {
            const productId = $(this).data('product-id');
            const likeButton = $(this);
    
            getUserId().then(userId => {
                // Toggle like state
                const isLiked = likeButton.hasClass('liked');
    
                if (isLiked) {
                    // Unlike the product
                    $.ajax({
                        url: 'http://ecommerce.reworkstaging.name.ng/v2/likes',
                        type: 'DELETE',
                        contentType: 'application/json',
                        data: JSON.stringify({ product_id: productId, user_id: userId }),
                        success: function(response) {
                            $(`#likes`).text(parseInt($(`#likes`).text()) - 1);
                            likeButton.removeClass('liked');
                            updateDashboardLikes(productId);
                        },
                        error: function(error) {
                            console.error('Error unliking product:', error);
                        }
                    });
                } else {
                    // Like the product
                    $.ajax({
                        url: 'http://ecommerce.reworkstaging.name.ng/v2/likes',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ product_id: productId, user_id: userId }),
                        success: function(response) {
                            $(`#likes`).text(parseInt($(`#likes`).text()) + 1);
                            likeButton.addClass('liked');
                            updateDashboardLikes(productId);
                        },
                        error: function(error) {
                            console.error('Error liking product:', error);
                        }
                    });
                }
            }).catch(error => {
                console.error(error);
            });
        });
    
        function updateDashboardLikes(productId) {
            $.ajax({
                url: `http://ecommerce.reworkstaging.name.ng/v2/likrd`,
                type: 'GET',
                data: { product_id: productId },
                success: function(response) {
                    $('#liking').text(`Product ${productId} liked by users: ${response.map(user => user.user_id).join(', ')}`);
                },
                error: function(error) {
                    console.error('Error fetching liked users:', error);
                }
            });
        }


        function getUserId() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${apiEndpoint}/user`,
                    type: 'GET',
                    success: function(response) {
                        if (response && response.user_id) {
                            resolve(response.user_id);
                        } else {
                            reject('User ID not found');
                        }
                    },
                    error: function(error) {
                        reject('Error fetching user ID: ' + error);
                    }
                });
            });
        }
    
        function getProductId() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${apiEndpoint}/product`, // Replace with the actual endpoint to get product details
                    type: 'GET',
                    success: function(response) {
                        if (response && response.product_id) {
                            resolve(response.product_id);
                        } else {
                            reject('Product ID not found');
                        }
                    },
                    error: function(error) {
                        reject('Error fetching product ID: ' + error);
                    }
                });
            });
        }
    
        function postRating(productId, userId, value) {
            $.ajax({
                url: `${apiEndpoint}/ratings`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ product_id: productId, user_id: userId, value: value, text: "Good" }),
                success: function(response) {
                    updateRatingsDisplay(productId);
                },
                error: function(error) {
                    console.error('Error posting rating:', error);
                }
            });
        }
    
        function updateRatingsDisplay(productId) {
            $.ajax({
                url: `${apiEndpoint}/ratings`,
                type: 'GET',
                data: { product_id: productId },
                success: function(response) {
                    let averageRating = response.reduce((acc, rating) => acc + rating.value, 0) / response.length;
                    $('#ratings').text(averageRating.toFixed(1));
                },
                error: function(error) {
                    console.error('Error fetching ratings:', error);
                }
            });
        }
    
        $('.stars a').on('click', function() {
            let ratingValue = $(this).index() + 1;
            getUserId().then(userId => {
                getProductId().then(productId => {
                    postRating(productId, userId, ratingValue);
                }).catch(error => {
                    console.error(error);
                });
            }).catch(error => {
                console.error(error);
            });
        });
    
        // Initialize the ratings display on page load
        getProductId().then(productId => {
            updateRatingsDisplay(productId);
        }).catch(error => {
            console.error(error);
        });

        $('.add-to-cart').click(function() {
            const productId = $(this).data('product-id');
            const quantity = parseInt($('.counter input').val());
    
            addToCart(productId, quantity);
        });
    
        function addToCart(productId, quantity) {
            const userId = getUserId();
            const data = {
                user_id: userId,
                product_id: productId,
                quantity: quantity
            };
    
            $.ajax({
                url: `${API_BASE_URL}/carts`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    alert('Product added to your cart');
                },
                error: function(error) {
                    console.error('Error adding to cart:', error);
                }
            });
        }
    
        function getUserId() {
            // This is a placeholder function. Replace with actual implementation to get the user ID.
            return '12345';
        }

});
    
