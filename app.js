// Array to hold ordered items
let order = [];
let totalPrice = 0;

// Menus for each restaurant
const menus = {
    "Udhaya's Hotel": [
        { name: "Idli", price: 10 },
        { name: "Dosa", price: 35 },
        { name: "Vada", price: 10 }
    ],
    "Red Rose": [
        { name: "Pizza", price: 280 },
        { name: "Pasta", price: 190 },
        { name: "Burger", price: 150 }
    ],
    "Dosa Corner": [
        { name: "Masala Dosa", price: 50 },
        { name: "Rava Dosa", price: 45 },
        { name: "Plain Dosa", price: 20 },
        { name: "Paneer Dosa", price: 30 },
        { name: "Onion Dosa", price: 40 }
    ],
    "Jeevan Restaurant": [
        { name: "Veg Thali", price: 150 },
        { name: "Paneer Butter Masala", price: 100 },
        { name: "Naan", price: 45 }
    ],
    "7/11 Restaurant": [
        { name: "Chicken Biryani", price: 250 },
        { name: "Mutton Biryani", price: 280 },
        { name: "Fish Curry", price: 130 }
    ],
    "Nila Hotel": [
        { name: "Chapathi", price: 40 },
        { name: "Poori", price: 40 },
        { name: "Parotta", price: 30 }
    ],
    "TAS Mess": [
        { name: "Rice & Sambar", price: 70 },
        { name: "Rasam", price: 45},
        { name: "Curd Rice", price: 45 }
    ]
};
// Function to update cart details
function updateCartDetails() {
    const orderDetails = document.getElementById('order-details');
    const totalPriceElement = document.getElementById('total-price');
    
    if (order.length === 0) {
        orderDetails.textContent = 'No items added to cart yet.';
        totalPriceElement.textContent = 'Total: ₹0';
    } else {
        orderDetails.innerHTML = order.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('<br>');
        totalPriceElement.textContent = `Total: ₹${totalPrice}`;
    }
}

// Event listener for restaurant list
const restaurantList = document.getElementById('restaurant-list');
const menuSection = document.getElementById('menu-section');
const menuItems = document.getElementById('menu-items');

restaurantList.addEventListener('click', (e) => {
    const selectedRestaurant = e.target.getAttribute('data-restaurant');
    if (selectedRestaurant) {
        menuItems.innerHTML = ''; // Clear previous menu

        const restaurantMenu = menus[selectedRestaurant];

        restaurantMenu.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <span class="price">₹${item.price}</span>
                <input type="number" class="quantity-input" value="1" min="1">
                <button class="add-to-cart-btn" data-item="${item.name}" data-price="${item.price} ">Add to Cart</button>
            `;
            menuItems.appendChild(menuItem);

            // Add to cart event listener
            menuItem.querySelector('.add-to-cart-btn').addEventListener('click', (event) => {
                const itemName = event.target.getAttribute('data-item');
                const itemPrice = parseInt(event.target.getAttribute('data-price'));
                const quantity = parseInt(menuItem.querySelector('.quantity-input').value);

                const existingItem = order.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    order.push({ name: itemName, price: itemPrice, quantity });
                }
                
                totalPrice += itemPrice * quantity;

                updateCartDetails(); // Update the cart
            });
        });

        menuSection.style.display = 'block'; // Show the menu section
    }
});

// Toggle UPI options based on payment method selection
const paymentMethod = document.getElementById('payment-method');
const upiOptions = document.getElementById('upi-options');

paymentMethod.addEventListener('change', (event) => {
    if (event.target.value === 'Online') {
        upiOptions.style.display = 'block';
    } else {
        upiOptions.style.display = 'none';
    }
});

// Place order button functionality
const placeOrderBtn = document.getElementById('place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    const deliveryAddress = document.getElementById('delivery-address').value;
    if (order.length === 0) {
        alert('Please add items to the cart before placing an order.');
    } else if (!deliveryAddress) {
        alert('Please provide a delivery address.');
    } else {
        alert('Order placed successfully!');

        // Here you could send order details to a server or API endpoint for processing
        // For now, we will just clear the cart
        order = [];
        totalPrice = 0;
        updateCartDetails();
    }
});

// Google Maps initialization
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 12.9716, lng: 77.5946 } // Example coordinates, update with real location
    });

    const marker = new google.maps.Marker({
        position: { lat: 12.9716, lng: 77.5946 },
        map: map,
        title: 'Your order is on the way!'
    });
}
// Variables to manage user login state
let isLoggedIn = false;

// Users and passwords mapping
const users = {
    user1: 'pass1',
    user2: 'pass2',
    user3: 'pass3',
    user4: 'pass4',
    user5: 'pass5',
    user6: 'pass6',
    user7: 'pass7',
    user8: 'pass8',
    user9: 'pass9',
    user10: 'pass10'
};

// Function to toggle login/logout visibility
function updateLoginState() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

// Event listener for login button
document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
});

// Event listener for login form submit
document.getElementById('submit-login').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username exists and if the password matches
    if (users[username] && users[username] === password) {
        alert(`Login successful! Welcome ${username}`);
        isLoggedIn = true;
        document.getElementById('login-form').style.display = 'none';
        updateLoginState();
    } else {
        alert('Invalid username or password.');
    }
});

// Event listener for logout button
document.getElementById('logout-btn').addEventListener('click', () => {
    isLoggedIn = false;
    alert('You have been logged out.');
    updateLoginState();
});

// Initial login state setup
updateLoginState();
