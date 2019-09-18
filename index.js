$(document).ready(function(){
    //my dynamic tags function
    $.get("http://localhost:3000/tags", function(data){
        for (let val of data){
            $('#tags').append(`
            <option value="${val}" >${val}</option>
            `)
        }
    })


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
        const todayDate = new Date();
		const data = {
            author : blog_author,
            title : blog_title,
            image_src : blog_image,
            blog_main : blog_post,
            date: todayDate,
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
        data = data.reverse()
        for (let i = 0; i < data.length; i++){
            $("#blog_display").append(`<li class="list-group-item">
            <article>
            <h2><a href="views.html?id=${data[i].id}">${data[i].title}</a></h2>
            <div class="row">
                <div class="group1 col-sm-6 col-md-6">
                        <i class="fas fa-folder-open"></i>  <a href="#">Signs</a>
                        <i class="fas fa-bookmark"></i> <a href="#">Aries</a>,
                        <a href="#">Fire</a>, <a href="#">Mars</a>
                </div>
                <div class="group2 col-sm-6 col-md-6">
                        <i class="far fa-clock"></i>${data[i].date.slice(0,24)}
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
            $("#featured_titles").append(`<li class="list-group-item"><a href="views.html?id=${data[i].id}">${data[i].title}</a></li>`)
        }
    });

    //Calling Categories
    $.get("http://localhost:3000/tags", function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++){
            $("#category_view").append(`
                <li class="list-group-item">${data[i]}</li>
                `)
        }    
    });


}) //waits for document to be loaded before execution

