// Load cart items from localStorage and display them in the cart page
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';  // Clear previous cart items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="h-[60vh] pt-16 text-5xl text-[red]">Your cart is empty.</p>';  // Show message if cart is empty
        return;
    }

    let totalPrice = 0;  // Initialize total price variable

    // Iterate through the cart and create product cards
    cart.forEach((product, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'bg-white border rounded mb-3 flex items-center justify-between overflow-hidden group p-4';

        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.className = 'w-[70px] h-[70px]';

        const productTitle = document.createElement('h4');
        productTitle.className = 'uppercase font-medium text-xl mb-2 text-gray-800';
        productTitle.textContent = product.name;

        const price = document.createElement('p');
        price.className = 'text-xl text-primary font-semibold';
        price.textContent = `Price: $${product.newPrice}`;

        // Display the quantity
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'flex items-center';

        const qtyLabel = document.createElement('span');
        qtyLabel.className = 'text-xl text-primary font-semibold';
        qtyLabel.textContent = 'Quantity: ';

        const qtyValue = document.createElement('span');
        qtyValue.className = 'text-xl text-primary font-semibold';
        qtyValue.textContent = product.quantity;  // Show the product quantity

        quantityDiv.appendChild(qtyLabel);
        quantityDiv.appendChild(qtyValue);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'text-red-600 text-xl font-semibold';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            removeCartItem(index);  // Remove item from cart
        });

        cardDiv.appendChild(img);
        cardDiv.appendChild(productTitle);
        cardDiv.appendChild(price);
        cardDiv.appendChild(quantityDiv);  // Append the quantity
        cardDiv.appendChild(removeBtn);

        cartContainer.appendChild(cardDiv);

        // Calculate total price
        totalPrice += product.newPrice * product.quantity;  // Multiply by quantity for total price
    });

    // Create total price display
    const totalDiv = document.createElement('p');
    totalDiv.className = 'mt-4 p-4 bg-gray-100 w-[300px] border rounded text-lg text-center';
    totalDiv.textContent = `Total Price: $${totalPrice.toFixed(2)}`;  // Display total price with 2 decimal places

    // Create Buy button
    const buyButton = document.createElement('button');
    buyButton.className = 'mt-2 py-2 bg-blue-600 w-[300px] text-white font-semibold rounded hover:bg-blue-700 transition';
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', function() {
        // Implement buy functionality here
        alert('Proceeding to checkout...');
    });

    const totalContainer = document.createElement('div')
    totalContainer.className = 'flex items-end mb-4 flex-col '

    totalContainer.appendChild(totalDiv)
    totalContainer.appendChild(buyButton)


    // Append total price and buy button to the cart container
    cartContainer.appendChild(totalContainer);
}

// Remove a specific item from the cart
function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);  // Remove item at the given index
    localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart
    loadCartItems();  // Refresh cart items
}

// Load cart items when the page loads
document.addEventListener('DOMContentLoaded', loadCartItems);
