// Import PouchDB
const db = new PouchDB('products', { adapter: 'idb' });

// Get product list element
const productList = document.getElementById('product-list');

// Function to fetch products from PouchDB
function fetchProducts() {
  db.allDocs({ include_docs: true })
    .then(response => {
      const products = response.rows.map(row => row.doc);
      productList.innerHTML = ''; // Clear previous products

      products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="Product Image">
            <button><a href="edit-product.html?id=${product._id}">Edit</a></button>
            <button><a href="#" onclick="deleteProduct('${product._id}')">Delete</a></button>
          </div>
        `;
        productList.innerHTML += productCard;
      });
    })
    .catch(error => console.error(error));
}

// Call fetchProducts initially
fetchProducts();

// Function to delete product
function deleteProduct(id) {
  db.remove(id)
    .then(response => {
      console.log(`Product ${id} deleted`);
      fetchProducts(); // Update product list
    })
    .catch(error => console.error(error));
}
// Example usage:
// createProduct({ _id: 'product1', name: 'Product 1', description: 'This is product 1', price: 10.99 });