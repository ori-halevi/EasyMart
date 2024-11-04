document.addEventListener("DOMContentLoaded", function() {
    const headerDiv = document.getElementById("headerDiv");
    const restHeaderComponentsDiv = document.getElementById("restHeaderComponentsDiv");
    const searchbarDiv = document.getElementById("searchbarDiv");

    function moveSearchBar() {
        if (window.innerWidth >= 1366) {
            if (!restHeaderComponentsDiv.contains(searchbarDiv)) {
                restHeaderComponentsDiv.insertBefore(searchbarDiv, restHeaderComponentsDiv.children[2]);
            }
        } else {
            if (!headerDiv.contains(searchbarDiv)) {
                headerDiv.appendChild(searchbarDiv);
            }
        }
    }

    // הפעלה ראשונית
    moveSearchBar();

    // הפעלה מחדש כאשר גודל המסך משתנה
    window.addEventListener("resize", moveSearchBar);
});
