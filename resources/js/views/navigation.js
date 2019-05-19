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