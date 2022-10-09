const botaoMenu = document.querySelector('.lista-menu');
const menu = document.querySelector('.menu-lateral');

if (botaoMenu) {
    botaoMenu.addEventListener('click', () => {
        menu.classList.toggle('menu-lateral--ativo');
    });
}
