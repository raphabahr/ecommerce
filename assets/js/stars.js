const starblock = document.querySelectorAll('.star_rating');

starblock.forEach(block => {
    block.querySelectorAll('.star').forEach((star, i) => {
        star.onclick = () => {
            let current_star_level = i + 1;

            console.log(current_star_level);

            block.querySelectorAll('.star').forEach((star, j) => {
                star.innerHTML = current_star_level >= j + 1 ? '&#9733' : '&#9734';
            });
        }
    });
});