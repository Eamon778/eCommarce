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

const card = document.getElementById('card');
const recoCard = document.getElementById('recoCard')

// for new arrival
function createProductCard(product) {
    const cardDiv = document.createElement("div");
    cardDiv.className = 'bg-white shadow rounded overflow-hidden group';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative';

    const img = document.createElement('img');
    img.src = product.img;  // Use product image from the JSON
    img.alt = product.name;  // Use product name for alt text
    img.className = 'w-full';

    imgContainer.appendChild(img);
    cardDiv.appendChild(imgContainer);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'pt-4 pb-3 px-4';

    const productTitle = document.createElement('h4');
    productTitle.className = 'uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition';
    productTitle.textContent = product.name;  // Use product name from the JSON

    const priceDiv = document.createElement('div');
    priceDiv.className = 'flex items-baseline mb-1 space-x-2';

    const price = document.createElement('p');
    price.className = 'text-xl text-primary font-semibold';
    price.textContent = `$${product.newPrice}`;  // Use the new price from the JSON

    const oldPrice = document.createElement('p');
    oldPrice.className = 'text-sm text-gray-400 line-through';
    oldPrice.textContent = `$${product.oldPrice}`;  // Use the old price from the JSON

    priceDiv.appendChild(price);
    priceDiv.appendChild(oldPrice);

    descriptionDiv.appendChild(productTitle);
    descriptionDiv.appendChild(priceDiv);
    cardDiv.appendChild(descriptionDiv);

    const addToCartBtn = document.createElement('a');
    addToCartBtn.href = '#';
    addToCartBtn.className = 'block w-full py-1 text-center text-white bg-[#fe3c57] border border-primary rounded-b hover:bg-transparent hover:text-[#fe3c57] transition';
    addToCartBtn.textContent = 'Add to cart';

    cardDiv.appendChild(addToCartBtn);

    // Append the card to the container
    card.appendChild(cardDiv);
}

// for recomended
function recomendedCard(product) {
  const cardDiv = document.createElement("div");
  cardDiv.className = 'bg-white shadow rounded overflow-hidden group';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'relative';

  const img = document.createElement('img');
  img.src = product.img;  // Use product image from the JSON
  img.alt = product.name;  // Use product name for alt text
  img.className = 'w-full';

  imgContainer.appendChild(img);
  cardDiv.appendChild(imgContainer);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'pt-4 pb-3 px-4';

  const productTitle = document.createElement('h4');
  productTitle.className = 'uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition';
  productTitle.textContent = product.name;  // Use product name from the JSON

  const priceDiv = document.createElement('div');
  priceDiv.className = 'flex items-baseline mb-1 space-x-2';

  const price = document.createElement('p');
  price.className = 'text-xl text-primary font-semibold';
  price.textContent = `$${product.newPrice}`;  // Use the new price from the JSON

  const oldPrice = document.createElement('p');
  oldPrice.className = 'text-sm text-gray-400 line-through';
  oldPrice.textContent = `$${product.oldPrice}`;  // Use the old price from the JSON

  priceDiv.appendChild(price);
  priceDiv.appendChild(oldPrice);

  descriptionDiv.appendChild(productTitle);
  descriptionDiv.appendChild(priceDiv);
  cardDiv.appendChild(descriptionDiv);

  const addToCartBtn = document.createElement('a');
  addToCartBtn.href = '#';
  addToCartBtn.className = 'block w-full py-1 text-center text-white bg-[#fe3c57] border border-primary rounded-b hover:bg-transparent hover:text-[#fe3c57] transition';
  addToCartBtn.textContent = 'Add to cart';

  cardDiv.appendChild(addToCartBtn);

  // Append the card to the container
  recoCard.appendChild(cardDiv);
}
// Fetch data and create product cards
document.addEventListener('DOMContentLoaded', ()=>{
  data((products) => {
    const newArrival = products.slice(-4)
    const reco = products.slice(0, 8)
    newArrival.forEach(product => {
      createProductCard(product);
    });
    reco.forEach(product => {
      recomendedCard(product);
    });
  });  
})