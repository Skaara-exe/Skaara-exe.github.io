var maxItems = 0;
var imgExt = ".png";
var images = [
    "FinnLove"
]

/*
    I've implemented amoji support, to use it, just add it's
    name in the "images" list above, and it's image with the
    same name in the "emojis" folder in the "assets" folder
    in .png.
    On the user side (the person sending you their message),
    they should just use the name in the list above.
    And javascript will do the rest.
    WARNING: it's case sentitive.
*/


function truncate(str, n, useWordBoundary=true) {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1);
    return (
        useWordBoundary 
        ? subString.slice(0, subString.lastIndexOf(" ")) 
        : subString
    ) + "&hellip;";
}

function bodyLoaded() {
    const messages = document.getElementsByClassName("Person");
    maxItems = messages.length;

    for (let i = 0; i < messages.length; i++) {
        let msg = messages[i].querySelector("p");
        msg.innerHTML = truncate(msg.innerHTML, 110);
    }
}

function loadImages(str) {
    for (let i = 0; i < images.length; i++) {
        try { str = str.replaceAll(images[i], `<img class="emoji" src="assets/emojis/${images[i]}.png">`) }
        catch (e) {}
    }
    return str
}

function loadColors(str) {
    let colors = str.match(/#([0-9A-F]){6}/gi);
    let scp = str;
    try {
        for (let i = 0; i < colors.length; i++) {
            let regex = new RegExp(`(<color=)${colors[i]}>`, "gi");
            scp = scp.replace(regex, `<span style="color:${colors[i]}">`);
        }
        scp = scp.replaceAll("</color>", "</span>");
    } catch (e) {}
    return scp
}

function openMsg(idx) {
    const elem = document.querySelector(`.Person:nth-child(${idx})`);
    const author = elem.querySelector("h3");
    const msg = elem.querySelector("p[hidden]");

    const popup = document.getElementById("popup");
    const p_img = popup.querySelector(".img img");
    const p_author = popup.querySelector(".name");
    const p_msg = popup.querySelector(".msg");

    try { p_img.src = "assets/" + author.innerHTML + imgExt; }
    catch (e) {}
    p_author.innerHTML = author.innerHTML;
    p_msg.innerHTML = loadColors(loadImages(msg.innerHTML));
    p_author.classList.add(`m${idx}`);

    document.getElementsByTagName("main")[0].classList.add("blurred");
    popup.classList.remove("hidden");
}

function goBack() {
    document.getElementsByTagName("main")[0].classList.remove("blurred");
    document.getElementById("popup").classList.add("hidden");
    for (let i = 1; i < (maxItems+1); i++) {
        try { document.getElementById("popup").querySelector(".name").classList.remove(`m${i}`); }
        catch (e) {}
    }
}