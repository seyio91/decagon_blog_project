
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(event){
        event.preventDefault();
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
                $('#signupError').text("Enter Required Fields")
            }
        }
        //Test Check Here
        if (check == true){
            //do your get
            let userNVal = $("#signupuName").val();
            console.log(userNVal)
            const userUrl = "http://localhost:3000/users?username=" + userNVal;
            $.get(userUrl, function(data){
                if (data.length > 0){
                    showValidate($('#signupuName'))
                    $('#signupError').text("Username is already taken")
                }
            })
            //end get
            
            //check password test
            if ($('#passCode').val() != $('#passConfirm').val()){
                showValidate($('#passCode'))
                showValidate($('#passConfirm'))
                $('#signupError').text("Passwords do not match")
            }

            let userName = $("#signupuName").val();
            //getting form values
            let profile = {
                first_name: $("#signupfName").val(),
                last_name: $("#signuplName").val(),
                username: userName,
                password: $.MD5($('#passCode').val()),
                email: $("#signupEmail").val()
            }

            console.log(profile)
            //Post after tests pass
            $.post("http://localhost:3000/users", profile, function(){
                alert(`user ${userName} created. Please Login`)
                $(location).attr("href", "index.html")
            })
        }
        
        return check;
        
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);