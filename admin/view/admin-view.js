function renderProducts(result) {
    var htmtContent = ''
    for (var i = 0; i < result.data.length; i++) {
        var prd = result.data[i]
        htmtContent += `
        <tr>
            <td>${i + 1}</td>
            <td>${prd.name}</td>
            <td>
                <image
                    src=${prd.image} 
                    style='width: 100px; height: 100px; object-fit: cover; object-position: center'
                />
            </td>
            <td>
                <div style='max-width: 300px'>${prd.description}</div>
            </td>
            <td class='fw-bold'>${prd.price}$</td>
            <td>
                <button 
                    class='btn btn-danger' 
                    onclick="deleteProduct(${prd.id})"
                >
                    Delete
                </button>
                <button 
                    class='btn btn-success ml-3' 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onclick="updateProduct(${prd.id})"
                >
                    Edit
                </button>
            </td>
        </tr>
    `
    }
    document.getElementById('tbody').innerHTML = htmtContent
}