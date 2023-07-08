//get product data từ mockAPI
let idProduct;
function getProductList() {
  let promise = axios({
    url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
    method: 'GET',
  })
  promise
    .then(function (result) {
      console.log('result: ', result.data)
      renderProductList(result)
    })
    .catch(function (error) {
      console.log(error)
    })
}
getProductList();


//lấy thông tin Product
function getInput() {
  let id = "";
  let name = $("#name").val();
  let title = $("#title").val();
  let image = $("#image").val();
  let price = +$("#price").val();
  let speed = +$("#speed").val();
  let branch = "";
  let branchRadios = $(".branch:checked");
  if (branchRadios.length > 0) {
    branch = branchRadios.first().val();
  } else {
    branch = $("#branch_other").val();
  }
  let type = $(".type:checked").val();
  let color = $(".color:checked").val();
  let paper = $(".paper:checked").val();
  let spec = {};
  let option = {};
  let description = $("#description").val();
  spec["RAM"] = $("#spec_RAM").val();
  spec["HDD"] = $("#spec_HDD").val();
  spec["DPI"] = $("#spec_DPI").val();
  spec["tray"] = $("#spec_tray").val();
  spec["warmUpTime"] = $("#spec_warmUpTime").val();
  option["DSPF"] = $("#option_DSPF").val();
  option["RSPF"] = $("#option_RSPF").val();
  option["finisher"] = $("#option_finisher").val();
  option["fax"] = $("#option_fax").val();
  option["solution"] = $("#option_solution").val();
  option["addHDD"] = $("#option_addHdd").val();
  option["addRam"] = $("#option_addRam").val();
  option["addStand"] = $("#option_addStand").val();
  let product = new Product(name, title, image, price, speed, branch, type, color, paper, spec, option, description, id);
  console.log(product);
  return product;
}

// Tạo sản phẩm
document.querySelector('#btnAdd').onclick = async function () {
  let product = getInput();
  const isValid = await validateInput(product.name, product.title, product.image, product.price, product.speed, product.branch, true);
  console.log(isValid);
  if (isValid) {
    let promise = axios({
      url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
      method: 'POST',
      data: product,
    });
    promise
      .then(function (result) {
        let createdProduct = result.data;
        console.log(createdProduct);
        getProductList();
        alert('Tạo sản phẩm thành công');
        document.querySelector('#btnClose').click();
      })
      .catch(function () {
        alert('Tạo sản phẩm thất bại');
      });
  } else {
    alert('Vui lòng kiểm tra lại thông tin sản phẩm.');
  }
}

// Xóa sản phẩm
function deleteProduct(id) {
  if (confirm(`Xác nhận xóa sản phẩm ${id}?`)) {
    let promise = axios({
      url: `https://649d36a19bac4a8e669d62a2.mockapi.io/product/${id}?_=${Date.now()}`,
      method: 'DELETE',
    });
    promise
      .then(function () {
        getProductList();
      })
      .catch(function () {
        alert('Xóa sản phẩm thất bại')
      })
  } else {
    event.preventDefault();
  }
};

//sửa sản phẩm
document.querySelector('#btnEdit').onclick = async function () {
  // Lấy thông tin product
  let product = getInput();
  const isValid = await validateInput(product.name, product.title, product.image, product.price, product.speed, product.branch, false);
  if (isValid) {
    let promise = axios({
      url: `https://649d36a19bac4a8e669d62a2.mockapi.io/product/${product.id}`,
      method: 'PUT',
      data: product
    })
    promise
      .then(function () {
        getProductList();
        alert('Cập nhật sản phẩm thành công');
        document.querySelector('#btnClose').click();
      })
      .catch(function () {
        alert('Cập nhật sản phẩm thất bại');
      })
  } else {
    alert('Vui lòng kiểm tra lại thông tin sản phẩm.');
  }
};

//lấy lại thông tin sản phẩm để hiện trên modal 
function editProduct(id) {
  // Ẩn nút thêm hiện nút cập nhật
  document.querySelector("#btnEdit").style.display = "inline-block";
  document.querySelector("#btnAdd").style.display = "none";
  let promise = axios({
    url: `https://649d36a19bac4a8e669d62a2.mockapi.io/product/${id}`,
    method: 'GET',
  })
  promise
    .then(function (result) {
      const product = result.data;
      idProduct = product.id;
      document.querySelector('#name').value = product.name;
      document.querySelector('#title').value = product.title;
      document.querySelector('#image').value = product.image;
      document.querySelector('#price').value = product.price;
      document.querySelector('#speed').value = product.speed;
      let branchRadios = document.querySelectorAll(".branch:checked");
      let branch;
      if (branchRadios.length > 0) {
        branch = branchRadios[0].value;
      } else {
        branch = document.getElementById("branch_other").value;
      }
      document.querySelector('#branch').value = branch;
      document.querySelector('.type[value="' + product.type + '"]').checked = true;
      document.querySelector('.color[value="' + product.color + '"]').checked = true;
      document.querySelector('.paper[value="' + product.paper + '"]').checked = true;
      document.querySelector('#description').value = product.description;
      document.querySelector("#spec_RAM").value = product.spec.RAM;
      document.querySelector("#spec_HDD").value = product.spec.HDD;
      document.querySelector("#spec_DPI").value = product.spec.DPI;
      document.querySelector("#spec_tray").value = product.spec.tray;
      document.querySelector("#spec_warmUpTime").value = product.spec.warmUpTime;
      document.querySelector("#option_DSPF").value = product.option.DSPF;
      document.querySelector("#option_RSPF").value = product.option.RSPF;
      document.querySelector("#option_finisher").value = product.option.finisher;
      document.querySelector("#option_fax").value = product.option.fax;
      document.querySelector("#option_solution").value = product.option.solution;
      document.querySelector("#option_addHdd").value = product.option.addHDD;
      document.querySelector("#option_addRam").value = product.option.addRam;
      document.querySelector("#option_addStand").value = product.option.addStand;
    })
    .catch(function () {
      alert('Lỗi lấy thông tin sản phẩm');
    })
}


// chỉnh branch input
const branchRadios = document.querySelectorAll('.branch');
const branchOtherInput = document.querySelector('#branch_other');
branchRadios.forEach(radio => {
  radio.addEventListener('click', () => {
    branchOtherInput.value = '';
  });
});
branchOtherInput.addEventListener('click', () => {
  branchRadios.forEach(radio => {
    radio.checked = false;
  });
});
// ẩn nút cập nhật hiện nút thêm
document.getElementById('btn-modal').onclick = function () {
  document.getElementById('btnAdd').style.display = 'inline-block';
  document.getElementById('btnEdit').style.display = 'none';
};


// reset các đoạn text thông báo mỗi khi đóng modal
var modal = document.getElementById("product-modal");
var observer = new MutationObserver(function (mutations) {
  for (var i = 0; i < mutations.length; i++) {
    var mutation = mutations[i];
    if (mutation.attributeName === "style" && modal.style.display === "none") {
      var checks = modal.querySelectorAll(".check");
      for (var j = 0; j < checks.length; j++) {
        var check = checks[j];
        check.innerHTML = "";
      }
    }
  }
});
observer.observe(modal, { attributes: true });