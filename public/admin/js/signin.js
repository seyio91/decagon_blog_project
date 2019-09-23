$(document).ready(function(){
    $('#signinSubmit').click(function(event){
        event.preventDefault();
        //alert("button was clicked")

        //get values of fields
        const userName = $('#signinUser').val()
        const passWord = $('#signinPass').val()

        if (userName == "" || passWord == ""){
            //alert or paste in div below sign in
            //alert('NO GO')
            $('#signinError').text("Complete Required Fields")
        } else {
            //get Url to Validate
            const encPass = $.MD5(passWord)
            const lUrl = "http://localhost:3000/users/?username=" + userName;
            $.get(lUrl, function(data){
                console.log(data)
                //.check user
                if (data.length < 1){
                    $('#signinError').text("UserName or Password Incorrect")
                } else {
                    //Check for Login
                    if (encPass != data[0].password){
                        $('#signinError').text("Invalid Password")
                    } else {
                        alert(`Welcome ${data[0].first_name}`)
                        let sessionData = {
                            userID : data[0].id,
                            timeOut: Date.now() + 10800000
                        }

                        //set session
                        localStorage.setItem("localSession", JSON.stringify(sessionData));
                        $(location).attr("href", "../index.html")
                        
                    }
                }
                //end check
            })
        }
        //end else
    })


})