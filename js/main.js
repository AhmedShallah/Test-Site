//check if there local storage color option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    // console.log(localStorage.getItem('color-option'))
    document.documentElement.style.setProperty("--main--color", mainColor);

    // remove all active from all  clolor list items
    document.querySelectorAll(".color-list li").forEach((element) => {
        element.classList.remove("active");

        // add active class on element with data color
        if (element.dataset.color === mainColor) {
            //add class active
            element.classList.add("active");
        }
    });
}

// random background option

let backGroundOption = true;

//varible to control the interval

let backGroundInterval;

// cheak of the local storage random background items

let backGroundLocalItem = localStorage.getItem("background-option");

// chake of random backfroum\nd localstroage is not empte

if (backGroundLocalItem !== null) {
    if (backGroundLocalItem === true) {
        backGroundOption = true;
    } else {
        backGroundOption = false;
    }

    // remove active of all span

    document.querySelectorAll(".rendom-backgrounds span").forEach((element) => {
        element.classList.remove("active");
    });

    if (backGroundLocalItem === "true") {
        document.querySelector(".rendom-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".rendom-backgrounds .no").classList.add("active");
    }
}

// toogle spin class in icon
document.querySelector(".toggle-sttting .fa-gear").onclick = function() {
    // toggle fa-spin th rotation on self
    this.classList.toggle("fa-spin");

    // toggle class main on class setting box
    document.querySelector(".setting-box").classList.toggle("open");
};
//////////////////////////////////////////////////////////////////////////////////////////////
// switch color
const colorLi = document.querySelectorAll(".color-list li");
//loops on list items
colorLi.forEach((li) => {
    // click on every list items
    li.addEventListener("click", (e) => {
        //set color in root
        document.documentElement.style.setProperty(
            "--main--color",
            e.target.dataset.color
        );

        // set color in local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        addActiveAndDel(e);
    });
});

// switch backGround
const randomBackEl = document.querySelectorAll(".rendom-backgrounds span");

//loops on all span
randomBackEl.forEach((span) => {
    // click on every list items
    span.addEventListener("click", (e) => {
        addActiveAndDel(e);

        if (e.target.dataset.background === "yes") {
            backGroundOption = true;

            randomizeImg();

            localStorage.setItem("background-option", true);
        } else {
            backGroundOption = false;

            clearInterval(backGroundInterval);

            localStorage.setItem("background-option", false);
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////

// select landing page elemint
let landingPage = document.querySelector(".landing-page");

// get array of imges
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

// function to random image

function randomizeImg() {
    if (backGroundOption === true) {
        backGroundInterval = setInterval(() => {
            // get random number
            let randomNum = Math.floor(Math.random() * imgsArray.length);

            // change backgroundimg url
            landingPage.style.backgroundImage =
                'url("imge/' + imgsArray[randomNum] + '")';
        }, 6000);
    }
}

randomizeImg();

// select skills seclector

window.onscroll = function() {
    let ourSkills = document.querySelector(".skills");

    // skills ofset top

    let skiilsOfssetTop = ourSkills.offsetTop;

    // skills outer heihgt
    let skillsOuterHeiht = ourSkills.offsetHeight;

    // skills windwo heihgt
    let windowHihgt = this.innerHeight;

    // window scrol top
    let windowScrolTop = this.pageYOffset;

    if (windowScrolTop > skiilsOfssetTop + skillsOuterHeiht - windowHihgt - 50) {
        let allSkill = document.querySelectorAll(".skill-box .skill-progress span");

        allSkill.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// create poupup with imge gallery

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        //create overlay element
        let overlay = document.createElement("div");

        // add class whith overlay
        overlay.className = "poupup-overlay";

        // append overlay with body
        document.body.appendChild(overlay);

        // crate the poupup box
        let poupbox = document.createElement("div");

        // add class with poupbox
        poupbox.className = "poup-box";

        if (img.alt !== "") {
            // create heading
            let imgeHeading = document.createElement("h3");

            // create text for heading
            let textImg = document.createTextNode(img.alt);

            // apeppend the text img to the heading
            imgeHeading.appendChild(textImg);

            // append the heading with the poup box
            poupbox.appendChild(imgeHeading);
        }

        // create the img
        let poupImge = document.createElement("img");

        // set imge surce
        poupImge.src = img.src;

        // add imge with poup box
        poupbox.appendChild(poupImge);

        //add poup box with body
        document.body.appendChild(poupbox);

        // create the close span
        let closeButton = document.createElement("span");

        // create a close button
        let closebuttonText = document.createTextNode("X");

        // append text with close button
        closeButton.appendChild(closebuttonText);

        //add class with close button
        closeButton.className = "close-button";

        // add close button with poup box

        poupbox.appendChild(closeButton);
    });
});

// close a poupuo

document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
        // remove the curent pouopup
        e.target.parentElement.remove();

        // remove the over lay
        document.querySelector(".poupup-overlay").remove();
    }
});

// select all bulets

const allBulets = document.querySelectorAll(".nav-bulets .bulets");

// select all links

const allLinks = document.querySelectorAll(".links a");

function scrollToanySection(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}

scrollToanySection(allBulets);
scrollToanySection(allLinks);

function addActiveAndDel(ev) {
    // remove active class on all childrens

    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    // add class active on self
    ev.target.classList.add("active");
}

// remove active from all span

let buletsSpan = document.querySelectorAll(".bulets-optsion span");

let mainBulets = document.querySelector(".nav-bulets");

let buletsLocalItem = localStorage.getItem("bulets-option");

if (buletsLocalItem !== null) {
    buletsSpan.forEach((span) => {
        span.classList.remove("active");
    });

    if (buletsLocalItem === "block") {
        mainBulets.style.display = "block";

        document.querySelector(".bulets-optsion .yes").classList.add("active");
    } else {
        mainBulets.style.display = "none";

        document.querySelector(".bulets-optsion .no").classList.add("active");
    }
}

buletsSpan.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            mainBulets.style.display = "block";

            localStorage.setItem("bulets-option", "block");
        } else {
            mainBulets.style.display = "none";

            localStorage.setItem("bulets-option", "none");
        }

        addActiveAndDel(e);
    });
});

// clear the local storge
document.querySelector(".reset-option").onclick = function() {
    localStorage.clear();

    //reload the page

    window.location.reload();
};

// toggle menu

let btnToggle = document.querySelector(".toggle-menu");

let allClasses = document.querySelector(".links");

btnToggle.onclick = function(e) {
    e.stopPropagation();

    //toggle class menu active on button
    this.classList.toggle("menu-active");

    //toggle class open on links
    allClasses.classList.toggle("open");
};

// ckick anywhere outside menu and toggle button

document.addEventListener("click", (e) => {
    if (e.target !== btnToggle && e.target !== allClasses) {
        // cheak the menu is open

        if (allClasses.classList.contains("open")) {
            //toggle class menu active on button
            btnToggle.classList.toggle("menu-active");

            //toggle class open on links
            allClasses.classList.toggle("open");
        }
    }
});

// stop propagtion on menu

allClasses.onclick = function(e) {
    e.stopPropagation();
};