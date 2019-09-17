

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
        <div id="postbody">
            <div id="post_header">
                <p>${data.title}</p>
            </div>
            <div id="post_body">
                <p>${data.blog_main}</p>
            </div>
        </div>
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
        $("#comment_list").append(`<li>
            <div id="comment_head">
                <div id="post_header">
                    <p>${data[i].cName}</p>
                </div>
                <div id="comment_body">
                    <p>${data[i].cBody}...</p>
                </div>
            </div>
            </li>
            `)
    }    
});