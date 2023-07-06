//get product data từ mockAPI
function getProductList() {
  let promise = axios({
    url: 'https://649d36a19bac4a8e669d62a2.mockapi.io/product',
    method: 'GET',
  })
  promise
    .then(function (result) {
      console.log('result: ', result.data)
      renderProducts(result)
    })
    .catch(function (error) {
      console.log(error)
    })
}
getProductList();

//lấy thông tin Product
document.getElementById('btnAdd').onclick = function () {
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
  // check valid có kiểm tra trùng name
  if (validateProduct(name, title, image, price, speed, branch, type, color, paper, spec, option, description, true)) {
    let product = new Product(name, title, image, price, speed, branch, type, color, paper, spec, option, description)
  };
  console.log(product);
  return product;
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
  document.getElementById('btnAdd').style.display = 'block';
  document.getElementById('btnUpdate').style.display = 'none';
};