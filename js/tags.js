$(document).ready(function(){
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }
    
    var tag_id = $.urlParam('tag');

    tUrl = "http://localhost:3000/blog_posts?tags=" + tag_id;

    $.get(tUrl, function(data){
        console.log(data)
        data = data.reverse()
        if (data.length >0){
            for (let i=0; i < data.length; i++){
                $("#tag_search").append(`<li class="list-group-item">
            <article>
            <h2><a href="views.html?id=${data[i].id}">${data[i].title}</a></h2>
            <div class="row">
                <div class="group1 col-sm-6 col-md-6">
                        <i class="fas fa-folder-open"></i>  <a href="#"> ${data[i].tags}</a>
                </div>
                <div class="group2 col-sm-6 col-md-6">
                        <i class="far fa-clock"></i>  ${data[i].date.slice(0,24)}
                </div>
            </div>
            <hr>
            <img src="./images/ThumperDC.jpg" class="img-fluid">
            <br />
            <p class="lead">${data[i].blog_main.slice(0,100)}...</p>
         
            <p class="text-right">
                <a href="views.html?id=${data[i].id}" class="text-right">
                    continue reading...
                </a>
            </p>
         
            <hr>
            </article>
            </li>
            `)
            }
        } else {

        }
    })
})