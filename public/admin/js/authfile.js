if (!!localStorage.getItem("localSession")){
    let currentUser = JSON.parse(localStorage.getItem("localSession"));
    timeOut = currentUser.timeOut
    let now = Date.now();
    if (timeOut - now <= 0){
        localStorage.removeItem("localSession")
        alert("Session Expired Please Login")
        $(location).attr("href", "file:///Users/woleoluwalana/Desktop/blog_post/js_tutorials_mac/bootstrap_blog/admin/index.html")
    }
} else {
    alert("Session Expired Please Login")
    $(location).attr("href", "file:///Users/woleoluwalana/Desktop/blog_post/js_tutorials_mac/bootstrap_blog/admin/index.html")
}