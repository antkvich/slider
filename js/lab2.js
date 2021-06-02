const IMAGES_NUMBER = 6;
const INTERVAL = 2000;
let imageNumber;
let isActive;
let intervalId;
let isHidden = false;

window.onload = function () {
    document.getElementById("previous-slideshow-image-button").onclick = previousSlideshowImage;
    document.getElementById("next-slideshow-image-button").onclick = nextSlideshowImage;
    document.getElementById("toggle-button").onclick = toggle;
    if (localStorage["imageNumber"] !== undefined) {
        imageNumber = parseInt(localStorage["imageNumber"], 10);
    } else {
        imageNumber = 0;
    }
    if (localStorage["isActive"] !== undefined) {
        isActive = localStorage["isActive"] === "true";
    } else {
        isActive = false;
    }
    let indicatorsDiv = document.getElementById("indicators-div");
    for (let i = 0; i < IMAGES_NUMBER; i++) {
        indicatorsDiv.innerHTML += "<span id='slideshow-indicator-" + i + "' class='slideshow-indicator' onclick='setSlideshowImage(" + i + ")'></span>";
    }
    updateSlideshowImage(imageNumber);
    updateSlideshowIndicator(-1, imageNumber);
    if (isActive) {
        updateToggleButton(false);
        intervalId = setInterval(nextSlideshowImage, INTERVAL);
    } else {
        updateToggleButton(true);
    }
}

window.onkeydown = function (event) {
    switch (event.key) {
        case "Escape": {
            if (isHidden) {
                isHidden = false;
                document.body.style.display = "flex";
            } else {
                isHidden = true;
                document.body.style.display = "none";
            }
            break;
        }
        case "ArrowLeft": {
            if (!isHidden) {
                previousSlideshowImage();
            }
            break;
        }
        case "ArrowRight": {
            if (!isHidden) {
                nextSlideshowImage();
            }
            break;
        }
    }
}

window.onbeforeunload = function () {
    localStorage["imageNumber"] = imageNumber;
    localStorage["isActive"] = isActive;
}

function previousSlideshowImage() {
    if (!isHidden) {
        let i = imageNumber;
        imageNumber = previousImageNumber(imageNumber);  
        updateSlideshowImage(imageNumber); 
        updateSlideshowIndicator(i, imageNumber);
    }
}

function nextSlideshowImage() {
    if (!isHidden) {
        let i = imageNumber;
        imageNumber = nextImageNumber(imageNumber);
        updateSlideshowImage(imageNumber);
        updateSlideshowIndicator(i, imageNumber);
    }
}

function setSlideshowImage(i) {
    updateSlideshowImage(i);
    updateSlideshowIndicator(imageNumber, i)
    imageNumber = i;
}

function previousImageNumber(imageNumber) {
    return (imageNumber + IMAGES_NUMBER - 1) % IMAGES_NUMBER;
}

function nextImageNumber(imageNumber) {
    return (imageNumber + 1) % IMAGES_NUMBER;
}

function updateSlideshowImage(imageNumber) {
    const value = "images/" + imageNumber + ".jpg";
    document.getElementById("slideshow-image").setAttribute("src", value);
}

function updateSlideshowIndicator(i, j) {
    if (i !== -1) {
        let oldIndicator = document.getElementById("slideshow-indicator-" + i);
        oldIndicator.style.backgroundColor = "white";
    }
    let newIndicator = document.getElementById("slideshow-indicator-" + j);
    newIndicator.style.backgroundColor = "gray";
}

function toggle() {
    if (isActive) {
        isActive = false;
        clearInterval(intervalId);
        updateToggleButton(true);
    } else {
        isActive = true;
        intervalId = setInterval(nextSlideshowImage, INTERVAL);
        updateToggleButton(false);
    }
}

function updateToggleButton(start) {
    document.getElementById("toggle-button").textContent = start ? "Autoscroll" : "Stop";
}
