let dataArray = []
// Fetch data from the JSON file
// Check if the response is ok
// Parse the JSON from the response
 // Now you can use the data
  // Do something with the data, e.g., display it in the console
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    dataArray = data;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });


const card = document.getElementById('card')

// Function to create the product card
function createProductCard(data) {
    // Create the main div with classes
    const cardDiv = document.createElement("div")
    card.appendChild(cardDiv)
    cardDiv.className = 'bg-white shadow rounded overflow-hidden group';
  
    // Create the inner content of the card
    // Image section
    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative';
  
    const img = document.createElement('img');
    img.src = 'images/products/product1.jpg';
    img.alt = 'product 1';
    img.className = 'w-full';
  
    imgContainer.appendChild(img);
    cardDiv.appendChild(imgContainer);
  
    // Product description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'pt-4 pb-3 px-4';
  
    const productTitle = document.createElement('h4');
    productTitle.className = 'uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition';
    productTitle.textContent = 'Guyer Chair';
  
    const priceDiv = document.createElement('div');
    priceDiv.className = 'flex items-baseline mb-1 space-x-2';
  
    const price = document.createElement('p');
    price.className = 'text-xl text-primary font-semibold';
    price.textContent = '$45.00';
  
    const oldPrice = document.createElement('p');
    oldPrice.className = 'text-sm text-gray-400 line-through';
    oldPrice.textContent = '$55.90';
  
    priceDiv.appendChild(price);
    priceDiv.appendChild(oldPrice);
  
    descriptionDiv.appendChild(productTitle);
    descriptionDiv.appendChild(priceDiv);
    cardDiv.appendChild(descriptionDiv);
  
    // Add to Cart Button
    const addToCartBtn = document.createElement('a');
    addToCartBtn.href = '#';
    addToCartBtn.className = 'block w-full py-1 text-center text-white bg-[#fe3c57] border border-primary rounded-b hover:bg-transparent hover:text-[#fe3c57] transition';
    addToCartBtn.textContent = 'Add to cart';
  
    cardDiv.appendChild(addToCartBtn);
  
    // Append the card to the container
    document.getElementById('product-card-container').appendChild(cardDiv);
  }
  
  // Call the function to create the product card

dataArray.forEach(data => {
    createProductCard(data);
});