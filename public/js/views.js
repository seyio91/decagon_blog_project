

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
        //Add New NBody
        $('#imageView').attr('style', `background-image: url('img/${data.image_src}')`)
        $('div#viewTitle h1').append(`<p>${data.title}</p>`)
        $('div#viewTitle h2').append(`<p>${data.blog_main.slice(0,50)}</p>`)
        $('#dateAuthor').append(`Posted by
        <a href="#">${data.author}</a>
        on ${data.date.slice(0,24)}  <i class="fas fa-user-edit"></i><span id="commentCount"></span> Comments`)
        $('div#viewDisplay').append(`
        <p>${data.blog_main}</p>
        <br>
        <br>
        <br>
        <div>
            <p><i class="fas fa-folder-open"></i>  Category: <a href="tag_post.html?tag=${data.tags}" id="uvuavf">  ${data.tags}</a></p>
            <a class="btn btn-primary" href="index.html" style="text-align: right;">Back to Home Page</a>
        </div>
        `)
        // $('div#viewCategory').append(`<p>${data.title}</p>`)
        //end Add
        
}).fail(function(){
    alert("Page Not Found")
    window.location.href= "index.html"
});



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
    const todayDate = new Date();
    var cData = {
        cName : c_name,
        cEmail : c_email,
        blog_id : c_body,
        date: todayDate,
        cBody : blogpost
    }
    if (blogpost == "" || c_name === "" ){
        alert("Complete all required fields")
    } else {
        console.log(`this should post the following data ${c_name} and ${c_email} and ${blogpost} and ${c_body}`)
       $.ajax({
        url: "http://localhost:3000/comments",
        data: cData,
        dataType: "json",
        type: "post",
        success: function(){
            alert("New Post")
            //
            populator(cUrl)
            window.location.replace(rUrl);
            cReset();
        }
    });
    }
})

//display comments
//get comments using id
    const cUrl = "http://localhost:3000/comments/?blog_id=" + id 
function populator(cUrl){
    $.get(cUrl, function(data){
        console.log(data);
        data = data.reverse();
        $('#commentCount').append(`  ${data.length}`)
        for (let i = 0; i < data.length; i++){
            $("#comment_list").append(`
            <li class="comment  list-group-item" id="commentPost">
            <div class="comment-body">
            <div class="row">
                <div class="col-7"><h5>${data[i].cName}</h5> </div>
                <div class="col-5 text-right font-italic font-weight-light" style="font-size:15px;">${data[i].date.slice(0,24)}</div>
            </div>
            <p>${data[i].cBody}</p>
          </div>
          </li>
                `)
        }
        $("#commentPagination").customPaginate({

            itemsToPaginate : "li#commentPost"
        })    
    });
}

populator(cUrl);

// var modalConfirm = function(callback){
  
    $("#btn-confirm").on("click", function(event){
        event.preventDefault();
      $("#mi-modal").modal('show');
      
    });
  
    $("#modal-btn-si").on("click", function(){
        event.preventDefault();
        console.log("i clicked the modal")
    //   callback(true);
      $("#mi-modal").modal('hide');
      $.ajax({
        url: url,
        dataType: "json",
        type: "delete",
        success: function(){
            alert("record deleted")
            window.location.replace("blog_posts.html")
        }
    })
    //delete the comments for that blog
    $.get(cUrl, function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++){
            var cUid = "http://localhost:3000/comments/" + Number(data[i].id);
            console.log(`comment ${data[i].id} to be deleted for blog id ${data[i].blog_id}`)
            $.ajax({
                url: cUid,
                dataType: "json",
                type: "delete",
                success: function(){
                    console.log(`comment ${i} deleted`)
                }
            })
        }
    });

    });

    
    $("#modal-btn-no").on("click", function(){
    //   callback(false);
      $("#mi-modal").modal('hide');
    });

    $(document).ready(function(){
            //Calling Categories
    $.get("http://localhost:3000/tags", function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++){
            $("#category_view").append(`
                <li class="list-group-item"><a href="tag_post.html?tag=${data[i]}">${data[i]}</a></li>
                `)
        }    
        });
    })


