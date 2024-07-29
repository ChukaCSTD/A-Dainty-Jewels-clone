$(document).ready(function() {
const API_BASE_URL = 'http://ecommerce.reworkstaging.name.ng/v2';

// Function to add a product to the cart
function addToCart(product_id, quantity, has_variation, variation) {
    const user_id = `${user_id}`;
    const data = {
        user_id: user_id,
        product_id: product_id,
        has_variation: has_variation,
        quantity: quantity,
        variation: variation
    };
    
    $.ajax({
        url: `${API_BASE_URL}/carts`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log('Product added to cart:', response);
            updateCartCount();
        },
        error: function(error) {
            console.error('Error adding to cart:', error);
        }
    });
}

function getUserID(callback) {
    $.ajax({
        url: ` ${API_BASE_URL}/carts?user_id=${user_id}`,
        type: 'GET',
        success: function(response) {
            if (response && response.id) {
                const user_id = response.id;
                callback(user_id);
            } else {
                console.error('No user ID found in the response.');
            }
        },
        error: function(error) {
            console.error('Error fetching user ID:', error);
        }
    });
}

function updateCartCount(user_id) {
    $.ajax({
        url: `${API_BASE_URL}/carts?user_id=${user_id}`,
        type: 'GET',
        success: function(response) {
            $('#item-count').text(response.items.length);
            loadCartItems(response.items);
        },
        error: function(error) {
            console.error('Error fetching cart:', error);
        }
    });
}

// Fetch the user ID and update the cart count
getUserID(function(user_id) {
    updateCartCount(user_id);
});

// Function to load cart items into the HTML
function loadCartItems(items) {
    const cartItemsContainer = $('#cart-items');
    cartItemsContainer.empty();

    items.forEach(item => {
        const cartItemHtml = `
            <div class="cart-item">
                <p>Product: ${item.product_name}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-from-cart" data-product-id="${item.product_id}">Remove</button>
            </div>
        `;
        cartItemsContainer.append(cartItemHtml);
    });

    // Attach event listeners for remove buttons
    $('.remove-from-cart').click(function() {
        const product_id = $(this).data('product-id');
        removeFromCart(product_id);
    });
}

// Function to remove a product from the cart
function removeFromCart(product_id) {
    const user_id = `${user_id}`;
    const data = {
        user_id: user_id,
        product_id: product_id
    };
    
    $.ajax({
        url: `${API_BASE_URL}/carts`,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log('Product removed from cart:', response);
            updateCartCount();
        },
        error: function(error) {
            console.error('Error removing from cart:', error);
        }
    });
}


    $('#addToCartButton').click(function() {
        const product_id = `${product_id}`;
        const quantity = parseInt($('#quantity').val());
        const has_variation = true;
        const variation = {
            quantity: quantity,
            color_index: 0,  
            size_index: $('#diff_sizes').val()
        };

        addToCart(product_id, quantity, has_variation, variation);
    });

    updateCartCount();  



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

    const userId = getUserId();
   
        function loadCartItems() {
            $.ajax({
                url: `${API_BASE_URL}/carts?user_id=${userId}`,
                type: 'GET',
                success: function(response) {
                    displayCartItems(response.items);
                },
                error: function(error) {
                    console.error('Error fetching cart:', error);
                }
            });
        }
    
        function displayCartItems(items) {
            const cartItemsContainer = $('#cart-items');
            cartItemsContainer.empty();
    
            items.forEach(item => {
                const cartItemHtml = `
                    <div class="cart-item">
                        <img src="${item.product_image}" alt="Product Image" class="thumbnail">
                        <p>Product: ${item.product_name}</p>
                        <p>Price: $<span class="price">${item.price}</span></p>
                        <div class="counter">
                            <span class="down">-</span>
                            <input type="text" value="${item.quantity}">
                            <span class="up">+</span>
                        </div>
                        <p>Total: $<span class="total">${item.price * item.quantity}</span></p>
                        <button class="remove-from-cart" data-product-id="${item.product_id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.append(cartItemHtml);
            });
    
            attachEventListeners();
        }
    
        function attachEventListeners() {
            $('.remove-from-cart').click(function() {
                const productId = $(this).data('product-id');
                removeFromCart(productId);
            });
    
            $('.counter .up').click(function() {
                const input = $(this).siblings('input');
                let quantity = parseInt(input.val());
                quantity++;
                input.val(quantity);
                updateTotalPrice($(this).closest('.cart-item'), quantity);
            });
    
            $('.counter .down').click(function() {
                const input = $(this).siblings('input');
                let quantity = parseInt(input.val());
                if (quantity > 1) {
                    quantity--;
                    input.val(quantity);
                    updateTotalPrice($(this).closest('.cart-item'), quantity);
                }
            });
        }
    
        function updateTotalPrice(cartItem, quantity) {
            const price = parseFloat(cartItem.find('.price').text());
            const total = price * quantity;
            cartItem.find('.total').text(total.toFixed(2));
        }
    
        function removeFromCart(productId) {
            $.ajax({
                url: `${API_BASE_URL}/carts`,
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ user_id: userId, product_id: productId }),
                success: function(response) {
                    loadCartItems();
                },
                error: function(error) {
                    console.error('Error removing from cart:', error);
                }
            });
        }
    
        function getUserId() {
            // This is a placeholder function. Replace with actual implementation to get the user ID.
            return '12345';
        }
    
       loadCartItems();
    


});
