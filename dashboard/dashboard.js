$(document).ready(function() {
    const apiEndpoint = "http://ecommerce.reworkstaging.name.ng/v2";
    const merchantId = localStorage.getItem('merchantId'); // Retrieve merchantId from localStorage

    // Function to display products
    function displayProducts(products) {
        let productHtml = '';
        products.forEach(product => {
            productHtml += `
                <div class="product-item">
                    <h3>${product.title}</h3>
                    <p>${product.descp}</p>
                    <p>Price: ${product.currency} ${product.price}</p>
                </div>`;
        });
        $("#productList").html(productHtml);
    }

    // Function to fetch products by merchant and optionally by category
    function fetchProducts(merchantId, categoryId) {
        let url = `${apiEndpoint}/products?merchant_id=${merchantId}`;
        if (categoryId) {
            url += `&category_id=${categoryId}`;
        }
        console.log("Fetching products from URL:", url);
        $.ajax({
            url: url,
            type: "GET",
            success: function(response) {
                console.log("Products fetched successfully:", response);
                displayProducts(response);

                // Update product count
                $("#product_number").text(response.length);
            },
            error: function(error) {
                console.error("Error fetching products:", error);
            }
        });
    }

    // Create product form submission
    $("#createProductForm").submit(function(event) {
        event.preventDefault();

        const productData = {
            title: $("#productName").val(),
            descp: $("#productDescription").val(),
            price: parseFloat($("#productPrice").val()),
            brand: $("#productBrand").val(),
            quantity: parseInt($("#productQuantity").val()),
            images: [$("#productImage").val()],
            currency: "NGN",
            min_qty: parseInt($("#minQuantity").val()),
            max_qty: parseInt($("#maxQuantity").val()),
            discount: 0,
            discount_expiration: "",
            has_refund_policy: false,
            has_discount: false,
            has_shipment: true,
            has_variation: false,
            shipping_locations: ["Nigeria", "Ghana", "Egypt"],
            attrib: [],
            category_id: selectedCategoryId, // Use the selected category ID here
            merchant_id: merchantId
        };

        console.log("Submitting product data:", productData);
        createProduct(productData);
    });

    // Function to create a product
    function createProduct(productData) {
        console.log("Creating product with data:", productData);
        $.ajax({
            url: `${apiEndpoint}/products`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(productData),
            success: function(response) {
                console.log("Product created successfully:", response);
                alert("Product created successfully");
                $("#createProductModal").css("display", "none");

                // Fetch and update product list and count
                fetchProducts(merchantId);
                updateProductCount();

                // Append the new product details to the viewProductsModal
                appendProductToView(response);
            },
            error: function(error) {
                console.error("Error creating product:", error);
            }
        });
    }

    // Function to append product details to the viewProductsModal
    function appendProductToView(product) {
        let productHtml = `
            <div class="product-item">
           div
                <h3>${product.title}</h3>
                <p>${product.descp}</p>
                <p>Price: ${product.currency} ${product.price}</p>
            </div>`;
        $("#productList").append(productHtml);
    }

    // Initial product count update
    updateProductCount();

    // Function to update product count
    function updateProductCount() {
        console.log("Updating product count...");
        $.ajax({
            url: `${apiEndpoint}/products?merchant_id=${merchantId}`,
            type: "GET",
            success: function(response) {
                console.log("Products fetched successfully:", response);
                
                $("#product_number").text(response.length);
            },
            error: function(error) {
                console.error("Error updating product count:", error);
            }
        });
    }

    // Open modal to create product
    $("#product_cr, #sidebar_add").click(function() {
        $("#createProductModal").css("display", "block");
    });

    // Open modal to view products
    $("#sidebar_view").click(function() {
        fetchProducts(merchantId);
        $("#viewProductsModal").css("display", "block");
    });

    // Close modal
    $(".close").click(function() {
        $(this).closest(".modal").css("display", "none");
    });

    // Fetch categories and update count
    function updateCategoryCount() {
        console.log("Fetching categories count...");
        $.ajax({
            url: `${apiEndpoint}/categories`,
            type: "GET",
            data: { merchant_id: merchantId },
            success: function(response) {
                console.log("Categories fetched successfully:", response);
                const categoryCount = response.length;
                $("#category_number").text(categoryCount);
            },
            error: function(error) {
                console.error("Error fetching categories:", error);
            }
        });
    }

    // Initial category count update
    updateCategoryCount();

    // Function to get user ID
    function getUserId() {
        return new Promise((resolve, reject) => {
            console.log("Fetching user ID...");
            $.ajax({
                url: `${apiEndpoint}/user`,
                type: 'GET',
                success: function(response) {
                    console.log("User ID fetched successfully:", response);
                    if (response && response.id) {
                        localStorage.setItem('userId', response.id);
                        resolve(response.id);
                    } else {
                        reject('User ID not found');
                    }
                },
                error: function(error) {
                    console.error("Error fetching user ID:", error);
                    reject('Error fetching user ID: ' + error);
                }
            });
        });
    }
    
    getUserId().then(userId => {
        console.log('Fetched User ID:', userId);
    }).catch(error => {
        console.error(error);
    });

    function getProductID(callback) {
        console.log("Fetching product ID...");
        $.ajax({
            url: apiEndpoint,
            type: 'GET',
            success: function(response) {
                console.log("Product ID fetched successfully:", response);
                if (response && response.length > 0) {
                    const productId = response[0].id; 
                    callback(productId);
                } else {
                    console.error('No products found in the response.');
                }
            },
            error: function(error) {
                console.error('Error fetching product list:', error);
            }
        });
    }
    
    function updateDashboardLikes(productId) {
        console.log("Fetching likes for product ID:", productId);
        $.ajax({
            url: `${apiEndpoint}/${productId}/liked`,
            type: 'GET',
            data: { product_id: productId },
            success: function(response) {
                console.log("Likes fetched successfully for product ID:", productId, response);
                $('#liking').text(`Product ${productId} liked by users: ${response.map(user => user.user_id).join(', ')}`);
                $('#likes').text(response.length);
            },
            error: function(error) {
                console.error('Error fetching liked users:', error);
            }
        });
    }
    
    // Fetch the product ID and update likes
    getProductID(function(productId) {
        updateDashboardLikes(productId);
    });

    function updateDashboardRatings(productId) {
        console.log("Fetching ratings for product ID:", productId);
        $.ajax({
            url: `${apiEndpoint}/ratings`,
            type: 'GET',
            data: { product_id: productId },
            success: function(response) {
                console.log("Ratings fetched successfully for product ID:", productId, response);
                let averageRating = response.reduce((acc, rating) => acc + rating.value, 0) / response.length;
                $('#ratings').text(averageRating.toFixed(1));
            },
            error: function(error) {
                console.error('Error fetching ratings:', error);
            }
        });
    }

    // Fetch the product ID and update ratings
    getProductID(function(productId) {
        updateDashboardRatings(productId);
    });

    // Function to fetch and display user details
    function fetchAndDisplayUsers() {
        console.log("Fetching users...");
        $.ajax({
            url: `${apiEndpoint}/users`,
            type: "GET",
            success: function(response) {
                console.log("Users fetched successfully:", response);
                displayUsers(response);
                $("#viewUsersModal").css("display", "block");

                // Update user count
                $("#number_users").text(response.length);
            },
            error: function(error) {
                console.error("Error fetching users:", error);
            }
        });
    }

    // Function to display users in a table
    function displayUsers(users) {
        let userTableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>`;
        users.forEach(user => {
            userTableHtml += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                </tr>`;
        });
        userTableHtml += `
                </tbody>
            </table>`;
        $("#userTableContainer").html(userTableHtml);
    }

    // Event listeners for user list and view users buttons
    $("#user_list, #sidebar_viewusers").click(function() {
        fetchAndDisplayUsers();
    });

    // Close modal on close button click
    $(".close").click(function() {
        $(this).closest(".modal").css("display", "none");
    });

    // Event listener to update user count
    $("#user_list").click(function() {
        console.log("Updating user count...");
        $.ajax({
            url: `${apiEndpoint}/users`,
            type: "GET",
            success: function(response) {
                console.log("User count updated successfully:", response.length);
                $("#number_users").text(response.length);
            },
            error: function(error) {
                console.error("Error fetching users:", error);
            }
        });
    });

    let selectedCategoryId = null;

    // Open modal to create category
    $("#category").click(function() {
        $("#createCategoryModal").css("display", "block");
    });

    // Create category form submission
    $("#createCategoryForm").submit(function(event) {
        event.preventDefault();

        const categoryData = {
            merchant_id: localStorage.getItem('merchantId'),
            name: $("#categoryName").val(),
            image: $("#categoryImage").val()
        };

        createCategory(categoryData);
    });

    // Function to create a category
    function createCategory(categoryData) {
        console.log("Creating category with data:", categoryData);
        $.ajax({
            url: `${apiEndpoint}/categories`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(categoryData),
            success: function(response) {
                console.log("Category created successfully:", response);
                alert("Category created successfully");
                $("#createCategoryModal").css("display", "none");

                selectedCategoryId = response.id; // Save the newly created category ID

                // Fetch and update category count
                updateCategoryCount();
            },
            error: function(error) {
                console.error("Error creating category:", error);
            }
        });
    }

    // Initial product count update
    updateProductCount();
});
