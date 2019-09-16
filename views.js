

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

var id = $.urlParam('id');
console.log(id)
console.log("i worked")


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
    alert("Button Clicked")
    $.ajax({
        url: "http://localhost:3000/blog_posts/7",
        dataType: "json",
        type: "delete",
        success: function(){
            alert("record delted")
        }
    })
})