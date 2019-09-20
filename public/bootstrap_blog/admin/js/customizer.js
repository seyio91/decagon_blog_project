//customize nav bar and other things
if (!!localStorage.getItem("localSession")){
    //get user information
    let currentUser = JSON.parse(localStorage.getItem("localSession"));
    userID = currentUser.userID

    //get data from db
    $.get("http://localhost:3000/users/" + userID, function(data){
        $('ul#customLogin').append(`<li class="nav-item dropdown">
        
        
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-user"></i>  ${data.first_name}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="file:///Users/woleoluwalana/Desktop/blog_post/js_tutorials_mac/bootstrap_blog/blog_add.html">Admin Page</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" ><span id="signOut">SignOut</span> here</a>
        </div> 
        </li>`)
    })

    
} else {
    $('ul#customLogin').append(`<li class="nav-item"><a class="nav-link" href="file:///Users/woleoluwalana/Desktop/blog_post/js_tutorials_mac/bootstrap_blog/admin/index.html">Login</a></li>`)
}

$('#signOut').click(function(event){
    event.preventDefault();
    localStorage.removeItem("localSession");
    location.reload();
})