

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
                        <i class="fas fa-folder-open"></i>  <a href="#" id="uvuavf">  ${data.tags}</a>
                </div>
                <div class="group2 col-sm-6 col-md-6">
                        <i class="fas fa-user-edit"></i><span id="commentCount"></span> Comments
                        <i class="far fa-clock"></i>   ${data.date.slice(0,24)}
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
       //cReset();
       //window.location.replace(rUrl);
       
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
                <li class="comment">
                <div class="clearfix">
                    <h4 class="pull-left">${data[i].cName}</h4>
                    <p class="pull-right"> ${data[i].date}</p>
                </div>
                <p>
                    <em>${data[i].cBody}</em>
                </p>
            </li>


                `)
        }    
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
    //delte the comments for that blog
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
//   };
  
//   modalConfirm(function(confirm){
//     if(confirm){
//       //Acciones si el usuario confirma
//       $("#result").html("CONFIRMADO");
//     }else{
//       //Acciones si el usuario no confirma
//       $("#result").html("NO CONFIRMADO");
//     }
//   });


//   $("#delete_test").click(function(){
//     event.preventDefault();
//     $.ajax({
//         url: url,
//         dataType: "json",
//         type: "delete",
//         success: function(){
//             alert("record deleted")
//             window.location.replace("blog_posts.html")
//         }
//     })
// })

console.log(String(new Date()).slice(0,24))
console.log(new Date())