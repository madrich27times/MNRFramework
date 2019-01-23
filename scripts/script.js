var filesToLoad = [
  "scripts/parallax-pictures.json",
  "scripts/message.json",
  "scripts/pages.json",
  "scripts/carousel-images.json"
];
var loadedJSON = [];
var coverPhotos = [];
var pages = [];
var carouselPhotos = [];
var messageOfTheDay;
var isDate = false;
var today = new Date();
var isMessage = false;
var isParallax = false;
var isModal = false;
var isPag = false;
var isCarousel = false;

var isLeft = false;
var isRight = false;

var isDropNav = false;
var isPopup = false;
var isDropdownList = false;

function loadJSONFiles(filepath, done) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    return done(this.responseText);
  };
  xhr.open("GET", filepath, true);
  xhr.send;
}

function initJSON() {
  filesToLoad.forEach(function(file, i) {
    loadJSONFiles(file, function(responseText) {
      loadedJSON[i] = JSON.parse(responseText);
      //console.log(loadedJSON[i]);
    });
  });
}

function loadJSON(filename, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");

  xobj.open("GET", filename, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init(response) {
  for (let i = 0; i < filesToLoad.length; i++) {
    loadJSON(filesToLoad[i], function(responseText) {
      //console.log(filesToLoad[i]);
      if (filesToLoad[i].toString() == "scripts/parallax-pictures.json") {
        coverPhotos = JSON.parse(responseText);
        //console.log("parallax ", coverPhotos.pictures);
        if (isParallax == true) {
          //console.log("parallax found");
          for (let i = 0; i < coverPhotos.pictures.length; i++) {
            //console.log(i);
            //console.log("each image ", coverPhotos.pictures[i]);
            document.getElementById("parallax_" + i).style.background =
              "url(" + coverPhotos.pictures[i] + ")";
          }
        }
      }
      if (filesToLoad[i].toString() == "scripts/message.json") {
        var tempMsg = JSON.parse(responseText);
        // console.log("message ", tempMsg);
        // console.log(tempMsg.date);
        if (tempMsg.date == "true") {
          messageOfTheDay = tempMsg.message + today.toDateString();
        } else {
          messageOfTheDay = tempMsg.message;
        }
        //console.log(messageOfTheDay);
        if (isMessage == true) {
          var messageBoxes = document.getElementsByClassName("message-otd");
          for (let index = 0; index < messageBoxes.length; index++) {
            var span = document.createElement("span");
            span.innerHTML = messageOfTheDay;
            messageBoxes[index].appendChild(span);
          }
        }
      }
      if (filesToLoad[i].toString() == "scripts/pages.json") {
        pages = JSON.parse(responseText);
        //console.log(pages);
      }
      if (filesToLoad[i].toString() == "scripts/carousel-images.json") {
        carouselPhotos = JSON.parse(responseText);
        //console.log("carousel pics ", carouselPhotos);
        if (isCarousel == true) {
          //console.log("building carousel");
          var container = document.getElementById("carousel-container");
          for (let j = 0; j < carouselPhotos.images.length; j++) {
            //console.log("in loop ", carouselPhotos.images[j]);
            var div = document.createElement("div");
            div.className = "carousel-image";
            var img = document.createElement("img");
            img.src = carouselPhotos.images[j].link;
            div.appendChild(img);
            var caption = document.createElement("div");
            caption.className = "carousel-caption";
            caption.innerHTML = carouselPhotos.images[j].caption;
            div.appendChild(caption);

            container.appendChild(div);
            //console.log(div);
          }
          var leftLink = document.createElement("a");
          leftLink.id = "left-arrow";
          leftLink.className = "carousel-left";
          leftLink.innerHTML = "&#10094";
          container.appendChild(leftLink);
          var rightLink = document.createElement("a");
          rightLink.id = "right-arrow";
          rightLink.className = "carousel-right";
          rightLink.innerHTML = "&#10095";
          container.appendChild(rightLink);

          var indicatorCont = document.createElement("div");
          indicatorCont.id = "indic-container";
          indicatorCont.className = "indicator-container";
          for (let i = 0; i < carouselPhotos.images.length; i++) {
            var span = document.createElement("span");
            span.id = "span_" + i;
            span.className = "carousel-indicator";
            indicatorCont.appendChild(span);

            //console.log(span);
          }
          //console.log(indicatorCont);
          container.appendChild(indicatorCont);

          carouselInit();
        }
      }
    });
  }
}

function setFooter() {
  var footer = document.getElementsByTagName("footer")[0];
  var copyright = "&copy;";
  var currentYear = new Date().getFullYear();
  footer.innerHTML = "Maddy Richard " + copyright + currentYear;
}

function elementsInit() {
  setFooter();
  var allElements = document.body.getElementsByTagName("*");
  for (let i = 0; i < allElements.length; i++) {
    if (allElements[i].classList.contains("parallax")) {
      isParallax = true;
    }
    if (allElements[i].classList.contains("modal")) {
      isModal = true;
      modalInit();
    }
    if (allElements[i].classList.contains("pagination")) {
      isPag = true;
    }
    if (allElements[i].classList.contains("carousel")) {
      isCarousel = true;
    }
    if (allElements[i].classList.contains("three-col-nav-dropdown")) {
      isdropNav = true;
      dropdownNavInit();
    }
    if (allElements[i].classList.contains("popup")) {
      isPopup = true;
      popupInit();
    }
    if (allElements[i].classList.contains("dropdown-list")) {
      isDropdownList = true;
      dropdownListInit();
    }
    if (allElements[i].classList.contains("message-otd")) {
      isMessage = true;
    }
  }
}

function parallaxInit() {
  //console.log("parallax ", coverPhotos.pictures);
  if (isParallax == true) {
    for (let i = 0; i < coverPhotos.pictures; i++) {
      //console.log("each image ", coverPhotos.pictures[i]);
      document.getElementById("parallax_" + i).style.backgroundImage =
        "url('" + coverPhotos.pictures[i] + "')";
    }
  }
}

function modalInit() {
  if (isModal == true) {
    //console.log("modal found");
    var modalBtns = document.getElementsByClassName("btn-modal");
    console.log("modals ", modalBtns);
    var close = document.getElementsByClassName("close");
    console.log("close ", close);

    for (let i = 0; i < modalBtns.length; i++) {
      console.log("adding click");
      modalBtns[i].addEventListener("click", function() {
        //console.log("in modal click");
        var modal = modalBtns[i].getAttribute("data-modal");
        document.getElementById(modal).style.display = "block";
      });
    }
    for (let j = 0; j < close.length; j++) {
      //console.log("in close click");
      close[j].addEventListener("click", function() {
        //console.log("in close click");
        var modal = close[j].closest(".modal");
        modal.style.display = "none";
      });
    }
  }
}

function paginationInit() {
  if (isPag == true) {
    var pagContainer = document.getElementById("pagination-container");
    for (let i = 0; i < pages.length; i++) {
      var link = document.createElement("a");
      link.href = pages[i];
      link.innerText = i + 1;
      pagContainer.appendChild(link);
    }
  }
}

let imgIndex = 0;

function carouselInit() {
  // console.log("index in init ", imgIndex);
  if (isCarousel == true) {
    var indicatorContainer = document.getElementById("indic-container");
    var leftArrow = document.getElementById("left-arrow");
    var rightArrow = document.getElementById("right-arrow");
    leftArrow.onclick = function() {
      isLeft = true;
      imgIndex += -1;
      //console.log("backwards ", imgIndex);
      runCarousel();
    };
    rightArrow.onclick = function() {
      isRight = true;
      // console.log("forward ", imgIndex);
      runCarousel();
    };
    for (let i = 0; i < carouselPhotos.images.length; i++) {
      let span = document.getElementById("span_" + i);
      span.onclick = function() {
        imgIndex = i - 1;
        runCarousel();
      };
    }
  }
}

function runCarousel() {
  //console.log("run carousel called");
  if (isCarousel == true) {
    isRight = false;

    //var carousel = document.getElementById("carousel-container");
    var images = document.getElementsByClassName("carousel-image");
    //console.log("images list ", images);
    var indicators = document.getElementsByClassName("carousel-indicator");
    //console.log("indicators ", indicators);

    for (let i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }

    //console.log("index in run BEFORE ", imgIndex);

    if (isLeft != true) {
      imgIndex++;
    }
    //console.log("index in run AFTER ", imgIndex);

    if (imgIndex >= images.length) {
      imgIndex = 0;
      //console.log("resetting index to 0 ", imgIndex);
    } else if (imgIndex == 0) {
      imgIndex = 0;
      //console.log("resetting index to last image ", imgIndex);
    } else if (imgIndex == -1) {
      imgIndex = images.length - 1;
      //console.log("-1 found ", imgIndex);
    }

    for (let j = 0; j < indicators.length; j++) {
      indicators[j].className = indicators[j].className.replace(
        " active-carousel",
        ""
      );
    }

    images[imgIndex].style.display = "block";
    indicators[imgIndex].className += " active-carousel";

    if (isLeft == true) {
      isLeft = false;
    }
  }
}

function dropdownNavInit() {
  if (isdropNav == true) {
    var dropdownBtn = document.getElementsByClassName("dropdown-nav-btn");

    for (let i = 0; i < dropdownBtn.length; i++) {
      dropdownBtn[i].addEventListener("click", function() {
        //console.log("in dropdown click");
        var dropdownContainer = this.nextElementSibling;
        if (dropdownContainer.style.display == "block") {
          //console.log("is display block");
          dropdownContainer.style.display = "none";
        } else {
          // console.log("is display none");
          dropdownContainer.style.display = "block";
        }
      });
    }
  }
}

// function dropdownListInit() {
//   if (isDropdownList == true) {
//     var dropdownList = document.getElementById("dd");

//     dropdownList.addEventListener("click", function () {
//       //console.log("in list click");
//       var content = document.getElementsByClassName("dropdown-list-contents");
//       for (let i = 0; i < content.length; i++) {
//         //console.log(content[i]);
//         content[i].classList.toggle("active");
//       }
//     });
//   }
// }

function dropdownListInit() {
  if (isDropdownList == true) {
    var dropdownLists = document.getElementsByClassName("dropdown-list");
    for (let i = 0; i < dropdownLists.length; i++) {
      console.log("dropdown init");
      dropdownLists[i].addEventListener("click", function () {
        var content = document.getElementsByClassName("dropdown-list-contents");
        if (content[i].style.visibility == "visible") {
          content[i].style.visibility = "hidden";
        } else {
          content[i].style.visibility = "visible";
        }
      });
    }
  }
}

// function popupInit() {
//   if (isPopup == true) {
//     var popups = document.getElementsByClassName("popup");
//     for (let i = 0; i < popups.length; i++) {
//       popups[i].addEventListener("click", function() {
//         //console.log("in popup click");
//         var content = document.getElementsByClassName("popup-content");
//         content[i].classList.toggle("show");
//       });
//     }
//   }
// }

function popupInit() {
  if (isPopup == true) {
    var popups = document.getElementsByClassName("popup");
    for (let i = 0; i < popups.length; i++) {
      popups[i].addEventListener("click", function () {
        var popupContent = this.firstElementChild;
        if (popupContent.style.visibility == "visible") {
          popupContent.style.visibility = "hidden";
        } else {
          popupContent.style.visibility = "visible";
        }
      });
    }
  }
}

elementsInit();
var run = setTimeout(init(), 3000);
var carouselLoop = setInterval(runCarousel, 4000);
