// Importing JS Files
import { DOMElements } from './base';

// Declaring Offset Variable
const scrollFun = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = 1;
    if (scrollPosition >= windowHeight) {
        DOMElements.navigationWrap.classList.add('in');
    } else {
        DOMElements.navigationWrap.classList.remove('in');
    }
};
// Calling Function on Event Listener
window.addEventListener('scroll', scrollFun);

// Mobile Navigation
DOMElements.navigationHamburger.addEventListener('click', () => {
    document.querySelector('.navigation-wrapper').classList.toggle('mobile-nav-open');
    DOMElements.navigationWrap.classList.toggle('navigation-setup');
    
    DOMElements.navigationHamburger.classList.toggle('navigation-top-setup');
    DOMElements.navigationSearch.classList.toggle('navigation-top-setup');

    DOMElements.navigationLeftContent.classList.toggle('lr-cont');
    DOMElements.navigationRightContent.classList.toggle('lr-cont');

    DOMElements.navigationLeftContent.classList.toggle('left-cont');
    DOMElements.navigationRightContent.classList.toggle('right-cont');
});