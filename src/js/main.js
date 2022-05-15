
(function ($) {
    "use strict";

    var inputPhone = $('.input-phone');
    inputPhone.on('click', function() {
        $(this).val('+375');
    })

    inputPhone.on('blur', function() {
        if($(this.value == '+375')) {
            $(this).val(null);
        }
    })

     /*==================================================================
    [ Focus input ]*/
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

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {

        var rule = $(input).attr('data-rule');
        var result = $(input).val().trim() == '' ? false : validDataRule(rule, input);
        
        return result;
        

        // if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        //     if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        //         return false;
        //     }
        // }
        // else {
        //     if($(input).val().trim() == ''){
        //         return false;
        //     }
        // }
    }

    function validDataRule(rule, input) {
        var length = +$(input).val().length;
        var value = $(input).val();
        var lengthFrom = +$(input).attr('data-from');
        var lengthTo = +$(input).attr('data-to');

        switch(rule) {
            
            case 'string-company':
                if( ((value.trim().match(/[a-z]+|[0-9]+/i) == null) || ((length < lengthFrom) || (length > lengthTo)))) {
                    return false;
                }
            break;
                
            case 'string-name':
                if( ((value.trim().match(/^[A-Z]+$|^[А-Я]+$/i) == null) || ((length < lengthFrom) || (length > lengthTo)))) {
                    return false;
                }
            break;
                
            case 'email': 
                if(value.trim().match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) == null) {
                    return false;
                }
            break;
                
            case 'phone':
                if(value.trim().match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/) == null) {
                    return false;
                }
            break;
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