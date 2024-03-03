// setInterval(() => {
//     let hours = document.getElementById('hours');
//     let minutes = document.getElementById('minutes');
//     let seconds = document.getElementById('seconds');
//     let ampm = document.getElementById('ampm');
//     let hh = document.getElementById('hh');
//     let mm = document.getElementById('mm');
//     let ss = document.getElementById('ss');
//     let hr_dot = document.querySelector('.hr_dot');
//     let min_dot = document.querySelector('.min_dot');
//     let sec_dot = document.querySelector('.sec_dot');
//     let h = new Date().getHours();
//     let m = new Date().getMinutes();
//     let s = new Date().getSeconds();
//     let am = h >= 12 ? "PM" : "AM";
//     // convert 24hr clock to 12hr clock
//     if (h > 12) {
//     h = h - 12;
//     }
//     // add zero before single digit number
//     h = (h < 10) ? "0" + h : h;
//     m = (m < 10) ? "0" + m : m;
//     s = (s < 10) ? "0" + s : s;
//     hours.innerHTML = h + "<br/><span>Hours</span>";
//     minutes.innerHTML = m + "<br/><span>Minutes</span>";
//     seconds.innerHTML = s + "<br/><span>Seconds</span>";
//     ampm.innerHTML = am;
//     hh.style.strokeDashoffset = 310 - (310 * h) / 12;
//   // 12 hrs clock
//   mm.style.strokeDashoffset = 310 - (310 * m) / 60;
//   ss.style.strokeDashoffset = 310 - (310 * s) / 60;
//     hr_dot.style.transform = `rotate(${h * 30}deg)`;
//     min_dot.style.transform = `rotate(${m * 6}deg)`;
//     sec_dot.style.transform = `rotate(${s * 6}deg)`;
//     });




    // world time

  //   // new digital clock
  //   document.addEventListener('DOMContentLoaded', function() {
  //     // Your code here
 
  //   Element.Properties.transform = {

  //     set: function(transform){
  //       var property = 'transform';
  //       //console.log(Browser);
  //       if(Browser.chrome) property = 'WebkitTransform';
  //       if(Browser.firefox)  property = 'MozTransform';
  //       if(Browser.opera) property = 'OTransform';
        
  //       this.style[property] = transform;
  //       this.store('transform', transform);
  //     },
    
  //     get: function(){
  //       return this.retrieve('transform', '');
  //     }
    
  //   };
    
  //   Element.implement({
    
  //     setTransform: function(value){
  //       return this.set('transform', value);
  //     },
    
  //     getTransform: function(){
  //       return this.get('transform');
  //     }
    
  //   });
    
  //  document.addEvent('domready', function()
  //   {
  //     var $hourWrap = $$('.hour-wrap');
  //     var $hourFront = $hourWrap.getElement('div.front');
  //     var $hourBack = $hourWrap.getElement('div.back')
  //     var $hourTop = $hourWrap.getElement('div.digit-top');
  //     var $hourBottom = $hourWrap.getElement('div.digit-bottom .front');
    
  //     var $minWrap = $$('.min-wrap');
  //     var $minFront = $minWrap.getElement('div.front');
  //     var $minBack = $minWrap.getElement('div.back');
  //     var $minTop = $minWrap.getElement('div.digit-top');
  //     var $minBottom = $minWrap.getElement('div.digit-bottom .front');
      
      
  //     var $secWrap = $$('.sec-wrap');
  //     var $secFront = $secWrap.getElement('div.front');
  //     var $secBack = $secWrap.getElement('div.back');
  //     var $secTop = $secWrap.getElement('div.digit-top');
  //     var $secBottom = $secWrap.getElement('div.digit-bottom .front');
    
  //     var currentHour = 0;
  //     var currentMin = 0;
  //     var currentSec = 0;
    
  //     var setClock = function()
  //     {
  //       var time = new Date();
  //       var hour = time.getHours();
  //       var min = time.getMinutes();
  //       var sec = time.getSeconds();
    
  //       if(currentHour != hour)
  //       {
  //         currentHour = hour;
  //         var hourText = hour < 10 ? '0'+hour : hour;
    
  //         // make el to sit behind the top digit
  //         var $newHourTop = new Element('div', {class: 'digit-top', html: $hourTop.get('html'), style: 'z-index:1;'})
  //         var $newHourFront = $newHourTop.getElement('div.front');
  //         var $newHourBack = $newHourTop.getElement('div.back');
    
  //         $newHourFront.set('text', hourText);
  //         $hourWrap.adopt($newHourTop);
    
  //         // start the animation
  //         $hourFront.setTransform('rotateX(180deg)');
  //         $hourBack.setTransform('rotateX(0deg)');
  //         $hourBack.setStyle('zIndex', 40);
    
  //         // set the min back
  //         $hourBack.set('text', hourText);
    
  //         (function()
  //         {
  //           $hourTop.destroy();
  //           $hourFront.destroy();
  //           $hourBack.destroy();
    
  //           $hourTop = $newHourTop;
  //           $hourFront = $newHourFront;
  //           $hourBack = $newHourBack;
    
  //           $hourTop.setStyle('zIndex', 10);
  //           $hourBottom.set('text', hourText);
  //         }).delay(800);
  //       }
    
  //       if(currentMin != min)
  //       {
  //         currentMin = min;
  //         var minText = min < 10 ? '0'+min : min;
    
  //         // make el to sit behind the top digit
  //         var $newMinTop = new Element('div', {class: 'digit-top', html: $minTop.get('html'), style: 'z-index:1;'})
  //         var $newMinFront = $newMinTop.getElement('div.front');
  //         var $newMinBack = $newMinTop.getElement('div.back');
    
  //         $newMinFront.set('text', minText);
  //         $minWrap.adopt($newMinTop);
    
  //         // start the animation
  //         $minFront.setTransform('rotateX(180deg)');
  //         $minBack.setTransform('rotateX(0deg)');
  //         $minBack.setStyle('zIndex', 40);
    
  //         // set the min back
  //         $minBack.set('text', minText);
    
  //         (function()
  //         {
  //           $minTop.destroy();
  //           $minFront.destroy();
  //           $minBack.destroy();
    
  //           $minTop = $newMinTop;
  //           $minFront = $newMinFront;
  //           $minBack = $newMinBack;
    
  //           $minTop.setStyle('zIndex', 10);
  //           $minBottom.set('text', minText);
  //         }).delay(800);
  //       }
        
        
  //       if(currentSec != sec)
  //       {
  //         currentSec = sec;
  //         var secText = sec < 10 ? '0'+sec : sec;
    
  //         // make el to sit behind the top digit
  //         var $newSecTop = new Element('div', {class: 'digit-top', html: $secTop.get('html'), style: 'z-index:1;'})
  //         var $newSecFront = $newSecTop.getElement('div.front');
  //         var $newSecBack = $newSecTop.getElement('div.back');
    
  //         $newSecFront.set('text', secText);
  //         $secWrap.adopt($newSecTop);
    
  //         // start the animation
  //         $secFront.setTransform('rotateX(180deg)');
  //         $secBack.setTransform('rotateX(0deg)');
  //         $secBack.setStyle('zIndex', 40);
    
  //         // set the min back
  //         $secBack.set('text', secText);
    
  //         (function()
  //         {
  //           $secTop.destroy();
  //           $secFront.destroy();
  //           $secBack.destroy();
    
  //           $secTop = $newSecTop;
  //           $secFront = $newSecFront;
  //           $secBack = $newSecBack;
    
  //           $secTop.setStyle('zIndex', 10);
  //           $secBottom.set('text', secText);
  //         }).delay(800);
  //       }
    
  //       //$hourEls.set('text', hour);
        
  //     }
    
  //     setClock.periodical(1000);
  //   });

  // });


  function updateClockAndDate() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Update time elements
    document.getElementById('hours').innerText = padZero(hours);
    document.getElementById('minutes').innerText = padZero(minutes);
    document.getElementById('seconds').innerText = padZero(seconds);
    document.getElementById('ampm').innerText = ampm;

    // Update date elements
    document.getElementById('day').innerText = getDayOfWeek(now.getDay());
    document.getElementById('date').innerText = now.getDate();
    document.getElementById('month').innerText = getMonthName(now.getMonth());
    document.getElementById('year').innerText = now.getFullYear();
  }

  function padZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function getDayOfWeek(day) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[day];
  }

  function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  }

  // Update the clock and date every second
  setInterval(updateClockAndDate, 1000);

  // Initial call to display the clock and date immediately
  updateClockAndDate();