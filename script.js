const tiltEffectSettings = {
    max: 25, // max tilt rotation (degrees (deg))
    perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1.1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
  };
  
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    card.addEventListener("mouseenter", cardMouseEnter);
    card.addEventListener("mousemove", cardMouseMove);
    card.addEventListener("mouseleave", cardMouseLeave);
  });
  
  function cardMouseEnter(event) {
    setTransition(event); 
  }
  
  function cardMouseMove(event) {
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth/2;
    const centerY = card.offsetTop + cardHeight/2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(cardHeight/2);
    const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(cardWidth/2);
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                    (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                    (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
  
    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  }
  
  function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
  }
  
  function setTransition(event) {
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
      card.style.transition = "";
    }, tiltEffectSettings.speed);
  }

    

  $(document).ready(function () {
    $("#image").show('slow');

    $(window).scroll(function (e) {
        e.preventDefault();
        //console.log($(document).height()+'-'+$(window).scrollTop());
        if ($(document).height()-$(window).scrollTop() < 3400) {
            $("#img").height('0px');
        }
        else {
            $("#img").height('80px');
        }
    });
});


















//for typeme
document.addEventListener("DOMContentLoaded", main);

function main() {
  let container = document.getElementById("container");

  let data = [
    "I am glad you are here,",
    "Your Name- ",
    null,
    "And your mail?  ",
    null,
    "How much you rate this site out of 10?  ",
    null,
    "Done ! Thank you ",
    "Please continue writing your message in the box below.",
    "Good Day!",
    
  ];
  
  finishTheSentence(container,data,50);
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function userResponsePromise(el) {
  return new Promise((resolve,reject) => {    
    el.addEventListener("keydown",(e)=>{
      //e.preventDefault();
      e.target.style.width = e.target.value.length + 1 + "ch";
    });
    el.addEventListener("change",(e)=>{
      e.preventDefault();
      e.target.classList.add("hidden");      
      resolve(e.target.value);
    })
  });
}

function typeLettersPromise(el,str,delay){
  return new Promise((resolve,reject)=>{    
    let letters = str.split("");
    let lastChild;
    letters.forEach((l, i) => {
      let tempLetter = document.createElement("span");
      setTimeout(() => {
        if (lastChild) {
          lastChild.innerText = lastChild.innerText.replace("|", "");
        }
        if (i < letters.length - 1) {
          tempLetter.innerText = l + "|";
        } else {
          tempLetter.innerText = l;
        }
        lastChild = el.appendChild(tempLetter);
      }, (i + 1) * delay);
    });
    
    resolve("completed");
  });
}

async function finishTheSentence(el,data,delay) {
  let letterDelay = delay||100; //milliseconds
  for (const part of data) {
    if (part != null) {
      let tempElem = document.createElement("div");
      let partDelay = part.length * letterDelay;
      console.log(`Delay ${partDelay}ms`);
      tempElem = el.appendChild(tempElem);
      await typeLettersPromise(tempElem, part, letterDelay);
      await timeout(partDelay);
    } else {
      let tempInput = document.createElement("input");
      let tempInputOut = document.createElement("span");
      let lastDiv=el.lastElementChild;
      tempInput=lastDiv.appendChild(tempInput);
      tempInput.focus();
      const userInput = await userResponsePromise(tempInput);
      let inputOutDelay = userInput.length * letterDelay;
      tempInputOut=lastDiv.appendChild(tempInputOut);
      await typeLettersPromise(tempInputOut, userInput+".", letterDelay);
      await timeout(inputOutDelay);
    }
  }
  //data has finished processing
  console.log("Data processing complete.");
}






//move biatr
var window_width = $(window).width() - $('#object').width();

var document_height = $(document).height() - $(window).height();

$(function () {
    $(window).scroll(function () {
        var scroll_position = $(window).scrollTop();
        var object_position_left = window_width * (scroll_position / document_height);
        $('#object').css({
            'left': object_position_left
        });
    });
});


