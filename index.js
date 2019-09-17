$(document).ready(function(){
	function reset(){
        //$('form :input').attr('value', '')
        $("#title").val("");
        $("#author").val("");
        $("#tags").val("");
        $("#image").val("");
        $("#blogpost").val("");
        console.log("reset worked")
    }
	//add user to json file
	$("#publish").click(function(event){
        event.preventDefault();
		const blog_title = $("#title").val();
		const blog_author = $("#author").val();
		const blog_tags = $("#tags").val();
        const blog_image = $("#image").val();
        const blog_post = $("#blogpost").val();
		const data = {
            author : blog_author,
            title : blog_title,
            image_src : blog_image,
            blog_main : blog_post,
            tags : blog_tags
        }
		//validation before posting 
		if (blog_title == "" || blog_author === "" || blog_tags === "" || blog_post === "" ){
			alert("Complete all required fields")
        } else {
           $.post("http://localhost:3000/blog_posts", data, alert("New Post Created"))
           reset();
        //console.log("data was posted")
		}
    })

    $.get("http://localhost:3000/blog_posts", function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++){
            $("#blog_display").append(`<li class="list-group-item">
            <article>
            <h2><a href="views.html?id=${data[i].id}">${data[i].title} March 21 - April 19</a></h2>
            <div class="row">
                <div class="group1 col-sm-6 col-md-6">
                        <i class="fas fa-folder-open"></i>  <a href="#">Signs</a>
                        <i class="fas fa-bookmark"></i> <a href="#">Aries</a>,
                        <a href="#">Fire</a>, <a href="#">Mars</a>
                </div>
                <div class="group2 col-sm-6 col-md-6">
                        <i class="fas fa-user-edit"></i> <a href="#">20 Comments</a>
                        <i class="far fa-clock"></i> August 24, 2013 9:00 PM
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
    });


}) //waits for document to be loaded before execution

// http://localhost:3000/blog_posts/{id}
// //getting values from each field
// var firstName = $("input#firstname").val();
// var lastName  = $("input#lastname").val();
// var userName  = $("input#username").val();
// var password = $("input#password").val();
// var gender = $("select#gender").val();
// var terms = ( $('input[type="checkbox"]').prop("checked") == true) ? true: false;


// var submit = $("button#form-submit").on("click", function(){
//     event.preventDefault(); //prevents default action
//     var profile = {
//         "firstName": $("input#firstname").val(),
//         "lastName": $("input#lastname").val(),
//         "userName": $("input#username").val(),
//         "password": $("input#password").val(),
//         "gender": $("select#gender").val(),
//         "terms": terms
//     }
// })

// // const form = document.getElementsByClassName("main-form")[0]

// // const data = getFormDataAsJSON(form);

// // const handleFormSubmit = event => {

// //     // Stop the form from submitting since we’re handling that with AJAX.
// //     event.preventDefault();
  
// //     // TODO: Call our function to get the form data.
// //     const data = {};

  
// //     // Use `JSON.stringify()` to make the output valid, human-readable JSON.
// //     dataContainer.textContent = JSON.stringify(data, null, "  ");
  
// //     // ...this is where we’d actually do something with the form data...
// //   };