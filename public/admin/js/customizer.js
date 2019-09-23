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
          <a class="dropdown-item" href="blog_Add.html">Admin Page</a>
          <div class="dropdown-divider"></div>
          <button type="button" onclick="signOut()" class="dropdown-item btn-link" id="signOut" >SignOut here</button>
        </div> 
        </li>`)
    })

    
} else {
    $('ul#customLogin').append(`<li class="nav-item"><a class="nav-link" href="/admin/index.html">Login</a></li>`)
}

function signOut(){
    localStorage.removeItem("localSession");
    $(location).attr("href", "index.html");
}