

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

var id = $.urlParam('id');
// console.log(id)
// console.log("i worked")


const url = "http://localhost:3000/blog_posts/" + id
$.get(url, function(data){
    console.log(data);
    $(document).prop('title', data.title);
        $("#blogview").append(`
        <article>
        <div id="postbody">
            <div id="post_header">
                    <h2>${data.title}</h2>
                </div>
         
            <div class="row">
                <div class="group1 col-sm-6 col-md-6">
                        <i class="fas fa-folder-open"></i>  <a href="#">Signs</a>
                        <i class="fas fa-bookmark"></i> <a href="#">Aries</a>,
                        <a href="#">Fire</a>, <a href="#">Mars</a>
                </div>
                <div class="group2 col-sm-6 col-md-6">
                        <i class="fas fa-user-edit"></i> <a href="singlepost.html#comments">20 Comments</a>
                        <i class="far fa-clock"></i> August 24, 2013 9:00 PM
                </div>
            </div>
         
            <hr>
         
            <img src="./images/ThumperDC.jpg" class="img-fluid">
         
            <br />
         
            <p class="lead">
                <div id="post_body">
                    <p>${data.blog_main}</p>
                </div>
            </p>
         
            <hr>
            </div>
        </article>
        `)
        
});

$("#delete_test").click(function(){
    event.preventDefault();
    $.ajax({
        url: url,
        dataType: "json",
        type: "delete",
        success: function(){
            alert("record deleted")
            window.location.replace("blog_posts.html")
        }
    })
})

const editUrl = "edit.html?id=" + id;
$("#edit_post").click(function(event){
    event.preventDefault();
    window.location.replace(editUrl)
})

function cReset(){
    $("#comment_name").val("");
    $("#comment_email").val("");
    $("#comment_body").val("");
    console.log("reset worked")
}

$("#comment_submit").click(function(event){
    event.preventDefault();
    var id = $.urlParam('id');
    const rUrl = "views.html?id=" + id 
    const c_name = $("#comment_name").val();
	const c_email = $("#comment_email").val();
	const blogpost = $("#comment_body").val();
    const c_body = Number(id);
    const cData = {
        cName : c_name,
        cEmail : c_email,
        blog_id : c_body,
        cBody : blogpost
    }
    if (blogpost == "" || c_name === "" ){
        alert("Complete all required fields")
    } else {
        console.log(`this should post the following data ${c_name} and ${c_email} and ${blogpost} and ${c_body}`)
       $.post("http://localhost:3000/comments", cData, alert("New Post Created"));
       cReset();
       window.location.replace(rUrl);
       
    }
})

//display comments
//get comments using id
const cUrl = "http://localhost:3000/comments/?blog_id=" + id 
$.get(cUrl, function(data){
    console.log(data);
    for (let i = 0; i < data.length; i++){
        $("#comment_list").append(`
            <li class="comment">
            <div class="clearfix">
                <h4 class="pull-left">${data[i].cName}</h4>
                <p class="pull-right">9:41 PM on August 24, 2013</p>
            </div>
            <p>
                <em>${data[i].cBody}</em>
            </p>
        </li>


            `)
    }    
});