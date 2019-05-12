/*global $, console*/

// DOM Elements
let slider = document.querySelector('.av-slider-elements-2'),
    arrows = document.querySelectorAll('.arrows .arr-left, .arrows .arr-right'),
    isDown = false,
    startX,
    scrollLeft;

slider.scrollLeft = 1970;

slider.onmousedown = function (e) {
    'use strict';
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};

slider.onmouseup = function () {
    'use strict';
    isDown = false;
    slider.classList.remove('active');
};

slider.onmouseleave = function () {
    'use strict';
    isDown = false;
    slider.classList.remove('active');
};

slider.onmousemove = function (e) {
    'use strict';
    if (!isDown) { return; }
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft,
        walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
};

function controlsSlider(num) {
    'use strict';
    var smooth = setInterval(function () {
        slider.scrollLeft += num;
    }, 10);
    setTimeout(function () {
        clearInterval(smooth);
    }, 210);
}
arrows[0].onclick = function () {
    'use strict';
    controlsSlider(-10);
};

arrows[1].onclick = function () {
    'use strict';
    controlsSlider(10);
};

window.onkeydown = function (e) {
    'use strict';
    var key = e.keyCode;
    if (key === 39) {
        controlsSlider(10);
    }
    if (key === 37) {
        controlsSlider(-10);
    }
};



