const carousel = document.querySelector(".carousel");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const slideWidth = document.querySelector(".carousel-slide").clientWidth;

let slideIndex = 0
const maxSlides = 1; // Cambia esto al número total de slides que tengas

nextButton.addEventListener("click", () => {
    if (slideIndex < maxSlides) {
        slideIndex++;
        carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }
});

prevButton.addEventListener("click", () => {
    if (slideIndex > 0) {
        slideIndex--;
        carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }
});

  