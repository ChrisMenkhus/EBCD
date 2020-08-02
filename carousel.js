let carouselTrackLength = document.querySelector('.carousel-track').children.length;
let rangeMin = 2;
let rangeMax = 2;
let absoluteRange = [0,4];
let newIndex;
let windowWidth = 0;
let size;


const Carousel = () => {
    const Range = (x,y,i) => {
        return i >= x ? i <= y ? i 
        : y : x 
    }

    const SetRange = (change) => {
        let max = carouselTrackLength-1;

        size = windowWidth > 1200 ? 3 : windowWidth > 1000 ? 2 : windowWidth <= 1000 ? 1 : 0;

        if (size === 1) {
            rangeMin = Range(0, max, rangeMin + change)
            rangeMax = Range(0, max, rangeMax + change)
        }
        else if (size === 2) {
            rangeMin = Range(0, max-1, rangeMin + change)
            rangeMax = Range(1, max, rangeMax + change)
        }
        else if (size === 3) {
            rangeMin = Range(0, max-2, rangeMin + change)
            rangeMax = Range(2, max, rangeMax + change)
        }

    }

    const HideElementsOutOfRange = () => {
        let descendants = document.querySelector('.carousel-track').children;

        for (let i = 0; i < descendants.length; i++) {
            if (i <= rangeMax && i >= rangeMin) {
                descendants[i].classList.remove('hide');
                descendants[i].classList.add('visible');
            }
            else {
                descendants[i].classList.add('hide');
                descendants[i].classList.remove('visible');
            }

            if (size === 3) {
                if (i === rangeMin + 1) {
                    descendants[i].classList.add('center');
                }
                else descendants[i].classList.remove('center');
            } else {
                descendants[i].classList.remove('center');
            }

            if (rangeMin === 0) {
                document.querySelector('.carousel-indicator.left').classList.add('hide')
            }
            else if (rangeMax === descendants.length -1) {
                document.querySelector('.carousel-indicator.right').classList.add('hide')
            }
            else {
                document.querySelector('.carousel-indicator.left').classList.remove('hide')
                document.querySelector('.carousel-indicator.right').classList.remove('hide')
            }
        }
    }

    const reportWindowSize = () => {
        windowWidth = window.innerWidth;
        SetRange(1)
        HideElementsOutOfRange()
    }

    document.querySelector(".carousel-indicator.left").addEventListener("click", ()=> {
            SetRange(-1);
            HideElementsOutOfRange();
        }
    )

    document.querySelector(".carousel-indicator.right").addEventListener("click", ()=> {
            SetRange(1)
            HideElementsOutOfRange();
        }
    )

    window.addEventListener('resize', reportWindowSize);

    reportWindowSize();
    SetRange(2)
    HideElementsOutOfRange()

}

export default Carousel;

