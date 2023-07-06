function renderProducts(result) {
    var content = ''
    for (let i = 0; i < result.data.length; i++) {
        let product = result.data[i];
        content += `
        <tr>
        <td class="product-group-avatar">
          <h4 style="font-weight: 700;">${product.name}</h4>
          <img class="product-img my-2" src=${product.image}>
          <h4 style="color: red; font-weight: 600;"><span>999999999</span> VNĐ</h4>
        </td>
        <td class="product-group-detail text-start">
            <h4>Hãng: <span>RICOH</span></h4>
            <h4>Tốc độ in: <span>35</span> ppm</h4>
            <h4>Loại: <span>copier</span></h4>
            <h4>Màu In: <span>màu</span></h4>
            <h4>Khổ giấy: <span>A3</span></h4>
        </td>
        <td class="product-group-desc">
          <h4 style="color:red;font-weight: 600;"><span>Máy in RICOH A350-2377</span></h4>
          <h4><span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus provident praesentium earum dolores quae voluptatem culpa exercitationem harum architecto ad.</span></h4>
        </td>
        <td class="product-group-manage">
          <a id="btnEdit" class="me-4" data-bs-toggle="modal" data-bs-target="#product-modal" href=""><i class="fa-solid fa-pencil"></i></a>
          <a id="btnDelete" data-bs-toggle="modal" data-bs-target="#product-modal-delete" href=""><i
              class="fa-solid fa-trash"></i></a>
        </td>
      </tr>
    `
    }
    document.getElementById('product-table-admin').innerHTML = content;
}