// product.js
// Initialize Page.js
page();

// Define the route for the product page
page('/', productPage);

// Define the route for the child links
page('/child/:id', productPage);

// Define the handler function for the product page and child links
function productPage(ctx) {
  // Fetch the contents of product.html using Axios
  axios.get('product.html')
    .then(function (response) {
      // Update the current page's HTML with the fetched content
      $('html').html(response.data);
    })
    .catch(function (error) {
      console.error('Error fetching product.html:', error);
    });
}

// Start Page.js
page.start();
