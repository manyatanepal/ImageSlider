class ImageSlider { 
 
    startAutoSlide() { 
    this.stopAutoSlide(); 
    this.autoSlide = setInterval(() => this.nextSlide(), 5000); 
    } 
    stopAutoSlide() { 
    clearInterval(this.autoSlide); 
    } 
 
    constructor(selector) { 
        this.slider = document.querySelector(selector); 
        this.track = this.slider.querySelector('.slider-track'); 
        this.slide = Array.from(this.track.children); 
        this.prevBtn = this.slider.querySelector('.prev'); 
        this.nextBtn = this.slider.querySelector('.next'); 
        this.sliderFrame = document.querySelector(".slider-frame");
        this.autoSlide = null; 
 
        this.dotsContainer = document.querySelector(".slider-dots"); 
        this.dots = []; 
        this.currentIndex = 0; 
        this.init(); 
    } 
 
        init() { 
        this.createDots(); 
        this.bindEvents(); 
        this.updateSliderPosition(); 
 
        this.sliderFrame.addEventListener("mouseenter", () => {
            this.stopAutoSlide();
        }); 
 
        this.sliderFrame.addEventListener("mouseleave", () => {
            this.startAutoSlide();
        }); 
 
        this.startAutoSlide(); 
    } 
 
    createDots() { 
        this.dotsContainer.innerHTML = ""; 
        this.slide.forEach((slide, index) => { 
            const dot = document.createElement("div"); 
            dot.classList.add("dots"); 
            dot.addEventListener("click", () => { 
                this.currentIndex = index; 
                this.updateSliderPosition(); 
            }); 
 
            this.dotsContainer.appendChild(dot); 
            this.dots.push(dot); 
        }); 
    } 
 
    updateSliderPosition() { 
        const effect = this.currentIndex * this.slider.offsetWidth; 
        this.track.style.transform = `translateX(-${effect}px)`; 
        for (let dot of this.dots) { 
            dot.classList.remove("active"); 
        } 
 
        this.dots[this.currentIndex].classList.add("active"); 
    } 
 
    nextSlide() { 
        this.currentIndex++; 
        if (this.currentIndex == this.slide.length) { 
            this.currentIndex = 0; 
        } 
        this.updateSliderPosition(); 
    } 
 
    previousSlide() { 
        if (this.currentIndex > 0) { 
            this.currentIndex--; 
        } else { 
            this.currentIndex = this.slide.length - 1; 
        } 
        this.updateSliderPosition(); 
    } 
 
    bindEvents() { 
        this.nextBtn.addEventListener('click', () => { 
            this.nextSlide(); 
        }); 
 
        this.prevBtn.addEventListener('click', () => { 
            this.previousSlide(); 
        }); 
    } 
} 
 
document.addEventListener('DOMContentLoaded', () => { 
    new ImageSlider('.slider'); 
});
