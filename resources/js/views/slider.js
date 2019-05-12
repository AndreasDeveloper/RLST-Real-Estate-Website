// Importing JS Files
import { DOMElements } from './base';
import { create } from 'domain';

// IIFE
(() => {
   
  const MoonSlider = function(){
      
      //PURE JAVASCRIPT
      this.$_slider = document.querySelector(".slider");
      this.$_slideBGs = document.querySelectorAll(".slide__bg");
      this.numOfSlides = document.querySelectorAll(".slide").length-1;
      
     
      this.diff = 0;
      this.curSlide = 0;
      this.startX = 0;
      this.winW = 0;
      this.animating = false;
      this.animTime = 500;
      this.autoSlideTimeout;
      this.autoSlideDelay = 6000;
      this.$pagination = document.querySelector(".slider-pagi");
      this.createBullets();
      this.autoSlide();
      this.events();
      this.initEvents();
      this.isDragging = false;
  }
  
  MoonSlider.prototype = {
    
    initEvents:function(){
      
      
      this.$_slider.addEventListener('mousedown', this.onStart.bind(this));
      this.$_slider.addEventListener('touchstart', this.onStart.bind(this));
      
      this.$_slider.addEventListener('mouseup', this.onEnd.bind(this));
      this.$_slider.addEventListener('touchend', this.onEnd.bind(this));
      
      document.querySelector(".slider-control__left").addEventListener('mouseup', this.onEnd.bind(this));
      document.querySelector(".slider-control__left").addEventListener('touchend', this.onEnd.bind(this));
      document.querySelector(".slider-control__right").addEventListener('mouseup', this.onEnd.bind(this));
      document.querySelector(".slider-control__right").addEventListener('touchend', this.onEnd.bind(this));
      document.querySelector(".slider-pagi").addEventListener('mouseup', this.onEnd.bind(this));
      document.querySelector(".slider-pagi").addEventListener('touchend', this.onEnd.bind(this));
      
      this.$_slider.addEventListener('mousemove', this.onMove.bind(this));
       this.$_slider.addEventListener('touchmove', this.onMove.bind(this));
      
      document.querySelector(".slider-control__left").addEventListener('mousemove', this.onMove.bind(this));
      document.querySelector(".slider-control__left").addEventListener('touchmove', this.onMove.bind(this));
      document.querySelector(".slider-control__right").addEventListener('mousemove', this.onMove.bind(this));
      document.querySelector(".slider-control__right").addEventListener('touchmove', this.onMove.bind(this));
      document.querySelector(".slider-pagi").addEventListener('mousemove', this.onMove.bind(this));
      document.querySelector(".slider-pagi").addEventListener('touchmove', this.onMove.bind(this));
     
    },
    
     createBullets:function(){
      for (let i = 0; i < this.numOfSlides+1; i++) {
        let active = "";
        if (!i) active = "active";
        let $li = "<li class='slider-pagi__elem slider-pagi__elem-"+i+" "+active+"' data-page='"+i+"'></li>";
        this.$pagination.innerHTML += $li;
      }
    },
    
     manageControls:function(){
       let SliderControl = document.querySelectorAll(".slider-control");
       for(let i = 0; i < SliderControl.length; i++){
         SliderControl[i].classList.remove("inactive");
       }
      if (!this.curSlide) document.querySelector(".slider-control__left").classList.add("inactive");
      if (this.curSlide === this.numOfSlides) document.querySelector(".slider-control__right").classList.add("inactive");
    },
    
    autoSlide:function(){
      this.autoSlideTimeout = setTimeout(()=>{
        this.curSlide++;
        if (this.curSlide > this.numOfSlides) this.curSlide = 0;
        this.changeSlides();
      }, this.autoSlideDelay);
    },
    
    changeSlides:function(instant){
    if (!instant) {
      this.animating = true;
      
      this.manageControls();
      this.$_slider.classList.add("animating");
      let slide = document.querySelectorAll(".slide");
        for(let i = 0; i < slide.length; i++){
          slide[i].classList.remove("active");
        }
      document.querySelector(".slide-"+this.curSlide).classList.add("active");
      setTimeout(()=>{
        
        this.$_slider.classList.remove("animating");
        this.animating = false;
        //
      }, this.animTime);
    }
    window.clearTimeout(this.autoSlideTimeout);
   
      let SliderPagiElem = document.querySelectorAll(".slider-pagi__elem");
      for(let i = 0; i < SliderPagiElem.length; i++){
        SliderPagiElem[i].classList.remove("active");
      }
 
      document.querySelector(".slider-pagi__elem-"+this.curSlide).classList.add("active");
      
    this.$_slider.style.transform = " translate3d("+ -this.curSlide*100 +"%,0,0)";
      for(let i = 0; i < this.$_slideBGs.length; i++){
        this.$_slideBGs[i].style.transform = "translate3d("+ this.curSlide*50 +"%,0,0)";
      }
    this.diff = 0;
    this.autoSlide();
  },
    
   navigateLeft:function(){
    if (this.animating) return;
     
    if (this.curSlide > 0) this.curSlide--;
    this.changeSlides();
  },
    
   navigateRight:function(){
    if (this.animating) return;
    if (this.curSlide < this.numOfSlides) this.curSlide++;
    this.changeSlides();
  },
    
    onStart:function(e){
      
      if (this.animating) return;
        this.isDragging = true;
        window.clearTimeout(this.autoSlideTimeout);
        this.startX = e.pageX || e.originalEvent.touches[0].pageX,
        this.winW = window.innerWidth;
        this.diff = 0;
      
    },
    
    onMove:function(e){
      if (!this.isDragging) return;
      let x = e.pageX || e.originalEvent.touches[0].pageX;
          this.diff = (this.startX - x) / this.winW * 70;
          if ((!this.curSlide && this.diff < 0) || (this.curSlide === this.numOfSlides && this.diff > 0)) this.diff /= 2;
          this.$_slider.style.transform = "translate3d("+ (-this.curSlide*100 - this.diff) +"%,0,0)";
          for(let i = 0; i < this.$_slideBGs.length; i++){
            this.$_slideBGs[i].style.transform = "translate3d("+ (this.curSlide*50 + this.diff/2) +"%,0,0)";
          }
    },
    
    onEnd:function(){
      this.isDragging = false;
      if (this.animating) return;
        if (!this.diff) {
          this.changeSlides(true);
          return;
        }
        if (this.diff > -8 && this.diff < 8) {
          this.changeSlides();
          return;
        }
        if (this.diff <= -8) {
          this.navigateLeft();
        }
        if (this.diff >= 8) {
          this.navigateRight();
        }
        
    },
    
    events:function(){
      document.querySelector(".slider-control__left").addEventListener("click", ()=>{
        this.navigateLeft();
      });
      document.querySelector(".slider-control__right").addEventListener("click", ()=>{
        this.navigateRight();
      });
      
      let dot = document.querySelectorAll(".slider-pagi__elem");
          for(let i = 0; i < dot.length; i++){
            dot[i].addEventListener("click", ()=>{
              this.curSlide = dot[i].dataset.page;
              this.changeSlides();
            });
          }
    },
  }
  
  
  const slider = new MoonSlider();


})();

