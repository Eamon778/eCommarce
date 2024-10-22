// Function to fetch data from the JSON file
function data(callback) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      callback(data);  // Pass the fetched data to the callback
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}

// Add items to cart, increment quantity if the product already exists
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product already exists in the cart
  let existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
      // If the product exists, increase the quantity
      existingProduct.quantity += 1;
  } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      product.quantity = 1; // Initialize quantity field
      cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));  // Save the updated cart to localStorage
}

// Fetch data and create product cards
document.addEventListener('DOMContentLoaded', () => {
  data((products) => {
    const newArrival = products.slice(-4);  // Get the last 4 products
    const reco = products.slice(0, 8);  // Get the first 8 products
    
    // Check if 'card' container exists before creating New Arrival cards
    const card = document.getElementById('card');
    if (card) {
      newArrival.forEach(product => {
        createProductCard(product, card);  // Pass the card element to the function
      });
    }

    // Check if 'recoCard' container exists before creating Recommended cards
    const recoCard = document.getElementById('recoCard');
    if (recoCard) {
      reco.forEach(product => {
        createProductCard(product, recoCard);  // Pass the recoCard element to the function
      });
    }

    // Check if 'allCard' container exists before creating All Product cards
    const allCard = document.getElementById('allCard');
    if (allCard) {
      products.forEach(product => {
        createProductCard(product, allCard);  // Pass the allCard element to the function
      });
    }
  });
});

// Function to create a product card for any type of card container
function createProductCard(product, container) {
  const cardDiv = document.createElement("div");
  cardDiv.className = 'bg-white shadow rounded overflow-hidden group';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'relative';

  const img = document.createElement('img');
  img.src = product.img;
  img.alt = product.name;
  img.className = 'w-full';

  imgContainer.appendChild(img);
  cardDiv.appendChild(imgContainer);

  // Create the "Added to cart" message element
  const addedMessage = document.createElement('div');
  addedMessage.className = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg opacity-0 transition-opacity duration-300';
  addedMessage.textContent = 'Added to cart';
  imgContainer.appendChild(addedMessage); // Append the message to the imgContainer

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'pt-4 pb-3 px-4';

  const productTitle = document.createElement('h4');
  productTitle.className = 'uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition';
  productTitle.textContent = product.name;

  const priceDiv = document.createElement('div');
  priceDiv.className = 'flex items-baseline mb-1 space-x-2';

  const price = document.createElement('p');
  price.className = 'text-xl text-primary font-semibold';
  price.textContent = `$${product.newPrice}`;

  const oldPrice = document.createElement('p');
  oldPrice.className = 'text-sm text-[red] line-through';
  oldPrice.textContent = `$${product.oldPrice}`;

  priceDiv.appendChild(price);
  priceDiv.appendChild(oldPrice);

  descriptionDiv.appendChild(productTitle);
  descriptionDiv.appendChild(priceDiv);
  cardDiv.appendChild(descriptionDiv);

  const addToCartBtn = document.createElement('a');
  addToCartBtn.className = 'block w-full py-1 text-center cursor-pointer text-white bg-[#fe3c57] border border-primary rounded-b hover:bg-transparent hover:text-[#fe3c57] transition';
  addToCartBtn.textContent = 'Add to cart';
  addToCartBtn.addEventListener('click', () => {
    addToCart(product);

    // Show the "Added to cart" message
    addedMessage.classList.remove('opacity-0');
    addedMessage.classList.add('opacity-100');

    // Hide the message after a short delay
    setTimeout(() => {
      addedMessage.classList.remove('opacity-100');
      addedMessage.classList.add('opacity-0');
    }, 1000); // Change the duration as needed
  });

  cardDiv.appendChild(addToCartBtn);

  // Append the card to the passed container
  container.appendChild(cardDiv);
}
