
window.addEventListener('scroll', function () {
    let scroll = document.querySelector('scrolltop');
    scroll.classList.toggle('active', window.scroll > 450)
})

function backTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
