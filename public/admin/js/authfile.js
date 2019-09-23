if (!!localStorage.getItem("localSession")){
    let currentUser = JSON.parse(localStorage.getItem("localSession"));
    timeOut = currentUser.timeOut
    let now = Date.now();
    if (timeOut - now <= 0){
        localStorage.removeItem("localSession")
        alert("Session Expired Please Login")
        $(location).attr("href", "index.html")
    }
} else {
    alert("Session Expired Please Login")
    $(location).attr("href", "index.html")
}