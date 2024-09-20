// Import PouchDB
const db = new PouchDB('products', { adapter: 'idb' });

// Get form element
const form = document.getElementById('add-product-form');

// Add event listener to form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').files[0].name;

  // Create product object
  const product = {
    _id: new Date().toISOString(),
    name,
    description,
    price,
    image,
  };

  // Save product to PouchDB
  db.put(product)
    .then((response) => {
      console.log(`Product added successfully`);
      // Redirect to products.html
      window.location.href = 'products.html';
    })
    .catch((error) => {
      console.error(error);
    });
});