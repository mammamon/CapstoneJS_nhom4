//lấy thông tin Product
document.getElementById('btnAdd').onclick = function() {
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let price = document.getElementById("price").value;
    let speed = document.getElementById("speed").value;
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
    let specCheckboxes = document.querySelectorAll(".spec:checked");
    for (let i = 0; i < specCheckboxes.length; i++) {
        let idParts = specCheckboxes[i].id.split("_");
        spec[idParts[1]] = idParts[2];
    }

    let optionCheckboxes = document.querySelectorAll(".option:checked");
    for (let i = 0; i < optionCheckboxes.length; i++) {
        let idParts = optionCheckboxes[i].id.split("_");
        option[idParts[1]] = idParts[2];
    }
    let product = new Product(name, image, price, speed, branch, type, color, paper, spec, option, description);
    console.log(product);
}