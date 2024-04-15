var maxItems = 0;
var imgExt = ".png";


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
    p_msg.innerHTML = msg.innerHTML;
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
