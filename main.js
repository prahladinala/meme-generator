const imageFileInput = document.querySelector("#imageFileInput")
const topTextInput = document.querySelector("#topTextInput")
const bottomTextInput = document.querySelector("#bottomTextInput")

const canvas = document.querySelector("#meme")

const downPng = document.querySelector("#downpng")
const downJpg = document.querySelector("#downjpg")


// VARIABLE that updates everytime a user selects a new image
let image;

// EVENT HANDLER
imageFileInput.addEventListener("change", () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    // console.log(imageDataUrl)
    image = new Image();
    image.src = imageDataUrl

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)
    }, { once: true })
    // once: true > helps to check until its true
})

topTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)
})

bottomTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)
})

downPng.addEventListener('click', () => {
    // IF IE/EDGE Supports only PNG
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "prahladinala-memegenerator.png");
        console.log("IE/EDGE")
    }
    console.log("IE/EDGE OUT")

})

function updateMemeCanvas(canvas, image, topText, bottomText) {
    // console.log(canvas)
    // console.log(image)
    // console.log(topText)
    // console.log(bottomText)

    // WORKING WTH CANVAS
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;

    const fontSize = Math.floor(width / 10);

    // yOffset > Space between start of the image and text
    const yOffset = height / 25;

    // UPDATE CANVAS DIMENSIONS
    canvas.width = width;
    canvas.height = height;

    // UPDATE CANVAS BACKGROUND
    ctx.drawImage(image, 0, 0)

    // PREPARE TEXT
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;

    // ADD TOP TEXT
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    // ctx.strokeText(TEXT, XAXIS, YAXIS)
    ctx.fillText(topText, width / 2, yOffset)

    // ADD BOTTOM TEXT
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    // ctx.strokeText(TEXT, XAXIS, YAXIS)
    ctx.fillText(bottomText, width / 2, height - yOffset)

}