const navbar = document.getElementById("navbar");
const icon = document.getElementById("harryicon");
const text = document.getElementById("introductionText");
let normalIconHeight = "3.5vw";
let opaqueIconHeight = "12.5vw";
let hasScrolled = false;
function changeOpacityAndSize() {
    var vWAmt = window.innerWidth/100;
    var bufferAmt = vWAmt * 9;
    var iconBottomPos = window.scrollY + icon.offsetHeight;
    if(hasScrolled && iconBottomPos + bufferAmt < text.offsetTop){
        normalIconHeight = icon.style.height;
        icon.style.height = opaqueIconHeight;
        navbar.style.backgroundColor = "transparent";
        navbar.style.mixBlendMode = "difference";
        hasScrolled = !hasScrolled;
    }
    else if(!hasScrolled && iconBottomPos > text.offsetTop){
        opaqueIconHeight = icon.style.height;
        icon.style.height = normalIconHeight;
        navbar.style.backgroundColor = "white";
        hasScrolled = !hasScrolled;
        navbar.style.mixBlendMode = "normal";
    }
}
window.onscroll = changeOpacityAndSize;