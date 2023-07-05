//BACK-TO-TOP CHANGE DISPLAY
var backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
    if (window.scrollY >= 800) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

//TRIGGER NO-IMAGE
function noProductImg() {
    const productImgs = document.querySelectorAll('.product-img');
    productImgs.forEach(function (img) {
        productImgs.onerror = function () {
            productImgs.src = './asset/img/no-img.jpg';
        }
    });
}
noProductImg();
