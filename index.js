$(document).ready(function(){
	function reset(){
        $("#title").val() = "";
        $("#author").val() = "";
        $("#tags").val() = "";
        $("#image").val() = ""
        $("#blogpost").val() = ""

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
        //console.log("data was posted")
		}
	})

}) //waits for document to be loaded before execution
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