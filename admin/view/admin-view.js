function renderProductList(result) {
    var content = '';
    for (let i = 0; i < result.data.length; i++) {
      let product = result.data[i];
      let formattedPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      content += `
        <tr>
          <td class="product-group-avatar">
            <h4 style="font-weight: 700;">${product.id}</h4>
            <h4 style="font-weight: 700;">${product.name}</h4>
            <img class="product-img my-2" src=${product.image}>
            <h4 style="color: red; font-weight: 600;"><span>${formattedPrice}</span> VNĐ</h4>
          </td>
          <td class="product-group-detail text-start">
            <h4>Hãng: <span>${product.branch}</span></h4>
            <h4>Tốc độ in: <span>${product.speed}</span> ppm</h4>
            <h4>Loại: <span>${product.type}</span></h4>
            <h4>Màu In: <span>${product.color}</span></h4>
            <h4>Khổ giấy: <span>${product.paper}</span></h4>
          </td>
          <td class="product-group-desc">
            <h4 style="color:red;font-weight: 600;"><span>${product.title}</span></h4>
            <h4><span>${product.description}</span></h4>
          </td>
          <td class="product-group-manage">
            <a onclick="editProduct('${product.id}')" id="btn-modal-edit" class="me-4" data-bs-toggle="modal" data-bs-target="#product-modal" href="" title="sửa"><i class="fa-solid fa-pencil"></i></a>
            <a onclick="deleteProduct('${product.id}')" id="btnDelete" href="" title="xóa"><i class="fa-solid fa-trash"></i></a>
            <a href="../product/${product.id}" id=btnUrl title="Chi tiết"><i class="fa-solid fa-info"></i></a>
          </td>
        </tr>
      `;
    }
    document.getElementById('product-table-admin').innerHTML = content;
  }
  