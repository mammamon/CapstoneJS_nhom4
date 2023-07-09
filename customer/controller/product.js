function getProductDetails(productName) {
    axios
      .get(`https://649d36a19bac4a8e669d62a2.mockapi.io/product/${productName}`)
      .then(function (response) {
        const product = response.data;
  
        // Update the product name in the breadcrumb
        $('#product-name').text(product.name);
  
        // Update the product image
        $('.swiper-slide img').attr('src', product.image);
  
        // Update the product details
        $('#branch').text(product.branch);
        $('#title').text(product.title);
        $('#price').text(product.price.toLocaleString());
        $('#speed').text(product.speed);
        $('#type').text(product.type);
        $('#color').text(product.color);
        $('#paper').text(product.paper);
        $('#ram').text(product.spec.RAM);
        $('#hdd').text(product.spec.HDD);
        $('#dpi').text(product.spec.DPI);
        $('#tray').text(product.spec.tray);
        $('#warmUpTime').text(product.spec.warmUpTime);
        $('#dspf').text(product.option.DSPF);
        $('#rspf').text(product.option.RSPF);
        $('#finisher').text(product.option.finisher);
        $('#fax').text(product.option.fax);
        $('#solution').text(product.option.solution);
        $('#addHdd').text(product.option.addHDD);
        $('#addRam').text(product.option.addRam);
        $('#addStand').text(product.option.addStand);
  
      })
      .catch(function (error) {
        console.log(error);
      });
  }


// handle routing
  function handleRouting() {
    const pathname = window.location.pathname;
    const productSlug = pathname.substring(pathname.lastIndexOf('/') + 1);
    getProductDetails(productSlug);
  }
  
  // Listen for the 'popstate' event when the URL changes
  window.onpopstate = handleRouting;
  
  // Trigger the initial routing when the page loads
  handleRouting();
  