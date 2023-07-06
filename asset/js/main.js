//BACK-TO-TOP CHANGE DISPLAY
var backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
    if (window.scrollY >= 800) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});