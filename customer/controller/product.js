// Get the product name from the URL path
const productName = window.location.pathname.split('/').pop();

// Fetch the product data from the API using Axios
axios.get(`https://649d36a19bac4a8e669d62a2.mockapi.io/product/${productName}`)
  .then(response => {
    const product = response.data;
    // Update the product name in the breadcrumb
    $('#product-name').text(product.name);

    // Update the product information
    $('#branch').text(product.branch);
    $('#title').text(product.title);
    $('#price').text(product.price.toLocaleString());

    // Update the product details
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
  .catch(error => console.error(error));
