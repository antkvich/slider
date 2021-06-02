const IMAGES_NUMBER = 6;
const INTERVAL = 2000;
let imageNumber;
let isActive;
let intervalId;
let isHidden = false;

window.onload = function () {
    // Установка обработчиков
    document.getElementById("previous-slideshow-image-button").onclick = previousSlideshowImage;
    document.getElementById("next-slideshow-image-button").onclick = nextSlideshowImage;
    document.getElementById("toggle-button").onclick = toggle;
    // Получение прошлого номера картинки
    if (localStorage["imageNumber"] !== undefined) {
        imageNumber = parseInt(localStorage["imageNumber"], 10);
    } else {
        imageNumber = 0;
    }
    // Получение прошлого состояния переходов
    if (localStorage["isActive"] !== undefined) {
        isActive = localStorage["isActive"] === "true";
    } else {
        isActive = false;
    }
    // Отображение индикаторов
    let indicatorsDiv = document.getElementById("indicators-div");
    for (let i = 0; i < IMAGES_NUMBER; i++) {
        indicatorsDiv.innerHTML += "<span id='slideshow-indicator-" + i + "' class='slideshow-indicator' onclick='setSlideshowImage(" + i + ")'></span>";
    }
    // Установка начальной картинки
    updateSlideshowImage(imageNumber);
    updateSlideshowIndicator(-1, imageNumber);
    // Установка переходов и текста кнопки переключения
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
        // Обновлени картинки
        updateSlideshowImage(imageNumber);
        // Обновление индикатора
        updateSlideshowIndicator(i, imageNumber);
    }
}

function nextSlideshowImage() {
    if (!isHidden) {
        let i = imageNumber;
        imageNumber = nextImageNumber(imageNumber);
        // Обновлени картинки
        updateSlideshowImage(imageNumber);
        // Обновление индикатора
        updateSlideshowIndicator(i, imageNumber);
    }
}

function setSlideshowImage(i) {
    // Обновление картинки
    updateSlideshowImage(i);
    // Обновление индикатора
    updateSlideshowIndicator(imageNumber, i)
    // Установка номера картинки
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