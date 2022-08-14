const fileElement = document.querySelector(".file-input")
const chooseImgElement = document.querySelector(".choose-img")
const prewievImgElement = document.querySelector(".preview-img img ")
const filterElement  = document.querySelectorAll(".filter button")
const filterNameElement = document.querySelector(".filter-info .name")
const silderElement = document.querySelector(".slider input")
const valueElement = document.querySelector(".filter-info .value")
const rotateElement = document.querySelectorAll(".rotate button")
const resetElement = document.querySelector(".reset-filter")
const saveElmenet = document.querySelector(".save-img")


let brightness = 100, saturation = 100 , inversion = 0 , grayscale = 0 ;
let rotate = 0, flipHorizontal = 1, flipVertical = 1

const saveImag = () => {
    console.log("Save img clicked");
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = prewievImgElement.naturalWidth
    canvas.height = prewievImgElement.naturalHeight
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2)
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, flipVertical)
    ctx.drawImage(prewievImgElement, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
    // document.body.appendChild(canvas)

    const link = document.createElement("a")
    link.download = "image.jpg";
    link.href = canvas.toDataURL()
    link.click( )
}


const resetfil = () => {
    brightness = 100, saturation = 100 , inversion = 0 , grayscale = 0 ;
    rotate = 0, flipHorizontal = 1, flipVertical = 1
    filterElement[0].click()
    applyFilters()
}


rotateElement.forEach(option => {
    option.addEventListener("click" , () => {
        // console.log(option);
        if(option.id === "left") {
            rotate -= 90;
        } else if (option.id == "right") {
            rotate += 90;
        } else if (option.id == "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applyFilters()
    })
})
 
filterElement.forEach(option => {
    option.addEventListener("click" , () => {
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterNameElement.textContent = option.textContent

        if(option.id === "brightness"){
            silderElement.max = "200"
            silderElement.value = brightness
            valueElement.textContent = `${brightness}%`
        } else if (option.id === "saturation") {
            silderElement.max = "200"
            silderElement.value = saturation
            valueElement.textContent = `${saturation}%`
        }  else if (option.id === "inversion") {
            silderElement.max = "200"
            silderElement.value = inversion
            valueElement.textContent = `${inversion}%`
        } else {
            silderElement.max = " 100"
            silderElement.value = grayscale
            valueElement.textContent = `${grayscale}%`
        }
    })
})

const loadImage = () => {
    let file = fileElement.files[0]
    console.log(file);
    if(!file) return
    prewievImgElement.src = URL.createObjectURL(file)
    prewievImgElement.addEventListener("load" , () => {
        resetElement.click()
        document.querySelector(".container").classList.remove("disable")
    })
}

const updatefilter = () => {
    // console.log(silderElement.value);
    valueElement.textContent = `${silderElement.value}%`
    const selectElement = document.querySelector(".filter .active")

    if(selectElement.id === "brightness") {
        brightness = silderElement.value
    } else if (selectElement.id === "saturation") {
        saturation = silderElement.value
    } else if (selectElement.id === "inversion") {
        inversion = silderElement.value
    } else {
        grayscale = silderElement.value
    }

    applyFilters()
}


const applyFilters = () => {
    prewievImgElement.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    prewievImgElement.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}





fileElement.addEventListener("change", loadImage)
chooseImgElement.addEventListener("click" , () => fileElement.click())
silderElement.addEventListener("input", updatefilter)
resetElement.addEventListener("click" , resetfil)

saveElmenet.addEventListener("click", saveImag)