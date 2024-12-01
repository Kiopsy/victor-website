document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            setActiveTab(tab);
        });
    });

    function setActiveTab(selectedTab) {
        tabs.forEach((tab) => {
            tab.classList.remove("selected");
            tab.querySelector(".tab-close").style.display = "none";
        });

        selectedTab.classList.add("selected");
        const closeButton = selectedTab.querySelector(".tab-close");
        closeButton.style.display = "inline";

        closeButton.addEventListener("mouseover", function () {
            closeButton.style.backgroundColor = "rgb(55, 61, 79)";
            closeButton.style.borderRadius = "4px";
            closeButton.style.padding = "2px";
        });

        closeButton.addEventListener("mouseleave", function () {
            closeButton.style.backgroundColor = "transparent";
        });
    }

    // Initially set the first tab as active
    if (tabs.length > 0) {
        setActiveTab(tabs[0]);
    }
});

function navigateTo(page) {
    window.location.href = page;
}
