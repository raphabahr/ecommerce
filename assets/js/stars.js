const allstars = document.querySelectorAll('.star');

allstars.forEach((star, i) => {
    star.onclick = function(){
        let current_star_level = i + 1;

        allstars.forEach((star, j) => {
            if (current_star_level >= j + 1) {
                star.innerHTML = '&#9733';
            } else {
                star.innerHTML = '&#9734';
            }
        });
    }
});