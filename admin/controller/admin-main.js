//get product data từ mockAPI
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
  let name = document.getElementById("name").value;
  let title = document.getElementById("title").value;
  let image = document.getElementById("image").value;
  let price = +document.getElementById("price").value;
  let speed = +document.getElementById("speed").value;
  let branch = "";
  let branchRadios = document.querySelectorAll(".branch:checked");
  if (branchRadios.length > 0) {
    branch = branchRadios[0].value;
  } else {
    branch = document.getElementById("branch_other").value;
  }
  let type = document.querySelector(".type:checked").value;
  let color = document.querySelector(".color:checked").value;
  let paper = document.querySelector(".paper:checked").value;
  let spec = {};
  let option = {};
  let description = document.getElementById("description").value;
  spec["RAM"] = document.getElementById("spec_RAM").value;
  spec["HDD"] = document.getElementById("spec_HDD").value;
  spec["DPI"] = document.getElementById("spec_DPI").value;
  spec["tray"] = document.getElementById("spec_tray").value;
  spec["warmUpTime"] = document.getElementById("spec_warmUpTime").value;
  option["DSPF"] = document.getElementById("option_DSPF").value;
  option["RSPF"] = document.getElementById("option_RSPF").value;
  option["finisher"] = document.getElementById("option_finisher").value;
  option["fax"] = document.getElementById("option_fax").value;
  option["solution"] = document.getElementById("option_solution").value;
  option["addHDD"] = document.getElementById("option_addHdd").value;
  option["addRam"] = document.getElementById("option_addRam").value;
  option["addStand"] = document.getElementById("option_addStand").value;
  let product = new Product(name, title, image, price, speed, branch, type, color, paper, spec, option, description)
  console.log(product);
  return product;
}

// Tạo sản phẩm
document.querySelector('#btnAdd').onclick = async function () {
  // Lấy thông tin product
  let product = getInput();
  const isValid = await validateInput(product.name, product.title, product.image, product.price, product.speed, product.branch, product.type, product.color, product.paper, product.description, true);
  if (isValid){
    let promise = axios({
      url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
      method: 'POST',
      data: product,
    })
    console.log(isValid);
    promise
      .then(function () {
        getProductList();
        alert('Tạo sản phẩm thành công');
        document.querySelector('#btnClose').click();
      })
      .catch(function () {
        alert('Tạo sản phẩm thất bại');
      })
  } else {
    alert('Vui lòng kiểm tra lại thông tin sản phẩm.');
  }
};
// Xóa sản phẩm
function deleteProduct(id) {
  if (confirm(`Xác nhận xóa sản phẩm ${id}?`)) {
    let promise = axios({
      url: `https://649d36a19bac4a8e669d62a2.mockapi.io/product/${id}`,
      method: 'DELETE',
    })
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
      url: `https://649d36a19bac4a8e669d62a2.mockapi.io/product/${product.name}`,
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

function editProduct(name) {
  // Ẩn nút thêm hiện nút cập nhật
  document.querySelector("#btnEdit").style.display = "inline-block";
  document.querySelector("#btnAdd").style.display = "none";
  axios({
    url: `https://649d36a19bac4a8e669d62a2.mockapi.io/product/${name}`,
    method: 'GET',
  })
    .then(function (result) {
      const data = result.data;
      document.querySelector('#name').value = data.name;
      document.querySelector('#title').value = data.title;
      document.querySelector('#image').value = data.image;
      document.querySelector('#price').value = data.price;
      document.querySelector('#speed').value = data.speed;
      let branchRadios = document.querySelectorAll(".branch:checked");
      if (branchRadios.length > 0) {
        branch = branchRadios[0].value;
      } else {
        branch = document.getElementById("branch_other").value;
      }
      document.querySelector('#branch').value = branch;
      document.querySelector('.type[value="' + data.type + '"]').checked = true;
      document.querySelector('.color[value="' + data.color + '"]').checked = true;
      document.querySelector('.paper[value="' + data.paper + '"]').checked = true;
      document.querySelector('#description').value = data.description;
      document.querySelector("#spec_RAM").value = data.spec.RAM;
      document.querySelector("#spec_HDD").value = data.spec.HDD;
      document.querySelector("#spec_DPI").value = data.spec.DPI;
      document.querySelector("#spec_tray").value = data.spec.tray;
      document.querySelector("#spec_warmUpTime").value = data.spec.warmUpTime;
      document.querySelector("#option_DSPF").value = data.option.DSPF;
      document.querySelector("#option_RSPF").value = data.option.RSPF;
      document.querySelector("#option_finisher").value = data.option.finisher;
      document.querySelector("#option_fax").value = data.option.fax;
      document.querySelector("#option_solution").value = data.option.solution;
      document.querySelector("#option_addHdd").value = data.option.addHDD;
      document.querySelector("#option_addRam").value = data.option.addRam;
      document.querySelector("#option_addStand").value = data.option.addStand;
      document.querySelector("#form").reset();
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

//ẩn modal

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