let hamburger = document.getElementById("hamburger");
let dropDown = document.querySelector("#drop-down");
let main = document.querySelector('.container');
let circleArr = document.querySelectorAll('.circle');
let flexGrowArr = document.querySelectorAll('.flex-grow');
let chevronArr = document.querySelectorAll('.chevron');
const listItems = document.querySelectorAll(".dd-li");

const tabLinks = document.getElementById("tabs").children;
const listTabs = document.getElementById("tabs").childNodes;
let tabIdentifier = 0;
let coloursArr = new Array(
    "--clr-mercury",
    "--clr-venus",
    "--clr-earth",
    "--clr-mars",
    "--clr-jupiter",
    "--clr-saturn",
    "--clr-uranus",
    "--clr-neptune"
);


//JSON FILE ****
let obj = { cData: null };
var xhr = new XMLHttpRequest();
xhr.open("get", "data.json", false);
xhr.send();
// xhr.onreadystatechange = function() {
//     console.log(xhr.readyState);
//     console.log(xhr.statusText);
// }
obj.cData = JSON.parse(xhr.responseText);

console.log(obj.cData);



let viewDevice = "mobile";
function isMobile() {
    if (window.innerWidth < 700) {
        return true;
    }
    else {
        return false;
    }

}
if (isMobile()) {
    viewDevice = "mobile";
    MobileSetup(tabIdentifier);
}
if (!isMobile()) {
    viewDevice = "tablet";
    NoneMobileSetup(tabIdentifier);
}


hamburger.addEventListener("click", function () {
    ToggleHamburger();
})

window.addEventListener('resize', function () {
    if (!isMobile() && viewDevice === "mobile") {
        viewDevice = "tablet";
        NoneMobileSetup(tabIdentifier);
        document.getElementById("line2").classList.remove("hidden");
    }
    if (isMobile() && viewDevice === "tablet") {
        viewDevice = "mobile";
        MobileSetup();
    }
})

function MobileSetup() {
    dropDown.classList.add("hidden");
    main.classList.remove("hidden");
    for (let i = 0; i < 8; i++) {
        circleArr[i].classList.remove("hidden");
        flexGrowArr[i].classList.remove("hidden");
        chevronArr[i].classList.remove("hidden");
        listItems[i].classList.add("border-line");
    }
    RemoveHighlightTabsNonMobile(ReturnPlanetName());
    NavMouseLeaveFeatureBulk();
    NavMouseOverFeature(tabLinks[tabIdentifier], ReturnPlanetName());
    tabLinks[1].textContent = "Structure";
    tabLinks[2].textContent = "Geology";
    document.getElementById("line1").classList.remove("hidden");
}

function NoneMobileSetup(tabIdentifier) {
    dropDown.classList.remove("hidden");
    main.classList.remove("hidden");
    for (let i = 0; i < 8; i++) {
        circleArr[i].classList.add("hidden");
        flexGrowArr[i].classList.add("hidden");
        chevronArr[i].classList.add("hidden");
        listItems[i].classList.remove("border-line");
    }
    NavMouseLeaveFeatureBulk();
    RemoveHighlightTabsNonMobile(ReturnPlanetName());
    HighlightTabsNonMobile(tabLinks[tabIdentifier], ReturnPlanetName());
    tabLinks[1].textContent = "Internal Structure";
    tabLinks[2].textContent = "Surface Geology";
    document.getElementById("line1").classList.add("hidden");
}


listItems.forEach(item => {
    item.addEventListener("mouseover", function () {
        if (isMobile()) {
            return;
        }

        NavMouseOverFeature(item, item.children[1].textContent);
    })

    item.addEventListener("mouseleave", function () {
        if (isMobile()) {
            return;
        }
        NavMouseLeaveFeature(item, item.children[1].textContent);
    })
})

listItems.forEach(item => {
    item.addEventListener("click", function () {
        tabIdentifier = 0;
        const futurePlanet = item.children[1].textContent;
        if (!isMobile()) {
            RemoveHighlightTabsNonMobile();
            HighlightTabsNonMobile(tabLinks[0], futurePlanet);
        }
        else {
            NavMouseLeaveFeatureBulk();
            NavMouseOverFeature(tabLinks[tabIdentifier], futurePlanet);
            ToggleHamburger();
        }
        document.querySelector(".planet-closeUp").classList.add("hidden");
    })
})

function ToggleHamburger() {
    dropDown.classList.toggle("hidden");
    main.classList.toggle("hidden");
    document.getElementById("line2").classList.toggle("hidden");
}

listTabs.forEach(tab => {
    tab.addEventListener("mouseover", function () {
        const planet = ReturnPlanetName();
        if (isMobile()) {
            NavMouseOverFeature(tab, planet);
        }

    })

    tab.addEventListener("mouseleave", function () {
        const planet = ReturnPlanetName();
        if (!isMobile()) {
            return;
        }
        if (tab.textContent === tabLinks[tabIdentifier].textContent) {
            return;
        }
        NavMouseLeaveFeature(tab);
    })
})

listTabs.forEach(tab => {
    tab.addEventListener("click", function () {
        const planet = ReturnPlanetName();
        if (isMobile()) {
            NavMouseLeaveFeatureBulk();
            NavMouseOverFeature(tab, planet);
        }
        else {
            RemoveHighlightTabsNonMobile(tab, planet);
            HighlightTabsNonMobile(tab, planet);
        }
    })
})

function ReturnPlanetName() {
    return document.getElementById("main-heading").textContent;
}
function NavMouseOverFeature(item, planet) {
    const index = GetPlanetIndex(planet, obj);
    item.style.borderBottom = `2px solid Var(${coloursArr[index]})`;
}

function NavMouseLeaveFeature(item) {
    item.style.borderBottom = "";
}

function NavMouseLeaveFeatureBulk() {
    for (let i = 0; i < 3; i++) {
        NavMouseLeaveFeature(tabLinks[i]);
    }
}

function HighlightTabsNonMobile(tab, planet) {
    const index = GetPlanetIndex(planet, obj);
    tab.style.backgroundColor = `Var(${coloursArr[index]}`;
    tab.style.borderColor = `Var(${coloursArr[index]}`;
}

function RemoveHighlightTabsNonMobile(planet) {
    listTabs.forEach(tab2 => {
        if (tab2.nodeName !== "LI") {
            return;
        }
        const planet = ReturnPlanetName();
        const index = GetPlanetIndex(planet, obj);
        tab2.style.backgroundColor = 'transparent';
        tab2.style.borderColor = "var(--clr-secondary)";
    })
}


const planetsArr = document.querySelectorAll(".dd-li");
planetsArr.forEach(planet => {
    planet.addEventListener("click", function () {
        let planetName = planet.children[1].textContent;
        const planetId = GetPlanetIndex(planetName, obj);
        let cDataPlanet = obj.cData[planetId];
        PopulateTextOnPage(cDataPlanet);
    })
})

function GetPlanetIndex(planetName, obj) {
    let i = 0;
    for (let i = 0; i < 8; i++) {
        if (obj.cData[i].name === planetName) {
            return i;
        }
    }
    return 100;
}

window.addEventListener("load", event => {
    PopulateTextOnPage(obj.cData[2]);
})

tabLinks[0].addEventListener("click", () => {
    const planetId = GetPlanetIndex(document.querySelector("#main-heading").textContent, obj);
    const cDataPlanet = obj.cData[planetId];
    OverviewTab(cDataPlanet);
    tabIdentifier = 0;
    document.querySelector(".planet-closeUp").classList.add("hidden");
})

tabLinks[1].addEventListener("click", () => {
    const planetId = GetPlanetIndex(document.querySelector("#main-heading").textContent, obj);
    const cDataPlanet = obj.cData[planetId];
    StructureTab(cDataPlanet);
    tabIdentifier = 1;
    document.querySelector(".planet-closeUp").classList.add("hidden");
})

tabLinks[2].addEventListener("click", () => {
    const planetId = GetPlanetIndex(document.querySelector("#main-heading").textContent, obj);
    const cDataPlanet = obj.cData[planetId];
    GeologyTab(cDataPlanet);
    tabIdentifier = 2;
    document.querySelector(".planet-closeUp").classList.remove("hidden");
})


function PopulateTextOnPage(cDataPlanet) {
    OverviewTab(cDataPlanet);
    document.querySelector("#main-heading").textContent = cDataPlanet.name;
    document.getElementById("rotation").children[1].textContent = cDataPlanet.rotation;
    document.getElementById("revolution").children[1].textContent = cDataPlanet.revolution;
    document.getElementById("radius").children[1].textContent = cDataPlanet.radius;
    document.getElementById("temp").children[1].textContent = cDataPlanet.temperature;
}

function OverviewTab(cDataPlanet) {
    document.querySelector("#info-para").textContent = cDataPlanet.overview.content;
    document.querySelector(".planet-img").src = cDataPlanet.images.planet;
    document.getElementById("link").href = cDataPlanet.overview.source;
}

function StructureTab(cDataPlanet) {
    document.querySelector("#info-para").textContent = cDataPlanet.structure.content;
    document.querySelector(".planet-img").src = cDataPlanet.images.internal;
    document.getElementById("link").href = cDataPlanet.structure.source;
}

function GeologyTab(cDataPlanet) {
    document.querySelector("#info-para").textContent = cDataPlanet.geology.content;
    document.querySelector(".planet-img").src = cDataPlanet.images.internal;
    document.getElementById("link").href = cDataPlanet.geology.source;
    document.querySelector(".planet-closeUp-img").src = cDataPlanet.images.geology

}