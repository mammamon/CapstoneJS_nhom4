// your-script.js
// Initialize Page.js
page();

// Define the route for the product page
page('/', productPage);

// Define the route for the child links
page('/child/:id', productPage);

// Define the handler function for the product page and child links
function productPage(ctx) {
  // Load the product.html file and display it in your application
  // This can be done using an AJAX request or by simply redirecting to the product.html page
  // Make sure to replace ":id" with the actual product ID in the URL
  var productUrl = 'product.html';  // or use an absolute path if necessary
  window.location.href = productUrl;
}

// Start Page.js
page.start();
