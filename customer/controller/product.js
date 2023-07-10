// Function to fetch and display product data
function fetchProductData(productName) {
    // Make an Axios GET request to fetch the product data from the API
    axios
      .get('https://649d36a19bac4a8e669d62a2.mockapi.io/product/' + productName)
      .then(function (response) {
        var productData = response.data;
  
        // Update the elements in #product-show with the fetched data
        $('#product-name').text(productData.title);
        $('#branch').text(productData.branch);
        $('#title').text(productData.title);
        $('#price').text(productData.price);
        $('#speed').text(productData.speed);
        $('#type').text(productData.type);
        $('#color').text(productData.color);
        $('#paper').text(productData.paper);
        $('#ram').text(productData.spec.RAM);
        $('#hdd').text(productData.spec.HDD);
        $('#dpi').text(productData.spec.DPI);
        $('#tray').text(productData.spec.tray);
        $('#warmUpTime').text(productData.spec.warmUpTime);
        $('#dspf').text(productData.option.DSPF);
        $('#rspf').text(productData.option.RSPF);
        $('#finisher').text(productData.option.finisher);
        $('#fax').text(productData.option.fax);
        $('#solution').text(productData.option.solution);
        $('#addHdd').text(productData.option.addHDD);
        $('#addRam').text(productData.option.addRam);
        $('#addStand').text(productData.option.addStand);
      })
      .catch(function (error) {
        console.error('Error fetching product data:', error);
      });
  }
  
  // Function to initialize Page.js and define routes
  function initializePage() {
    page();
  
    // Define the route for product subpages
    page('/product/:productName', function (ctx) {
      var productName = ctx.params.productName;
      fetchProductData(productName);
    });
  }
  
  // Call the initializePage function when the DOM is ready
  $(document).ready(function () {
    initializePage();
  });  