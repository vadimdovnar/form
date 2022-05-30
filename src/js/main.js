
(function ($) {
    "use strict";

    var inputPhone = $('.input-phone');
    inputPhone.on('click', function() {
        $(this).val('+375');
    })

    inputPhone.on('blur', function() {
        if($(this).val() == '+375') {
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

    /*=================================================================
    [Change select]*/
    $('.select').each(function(){
        var selectNumberOfProduct = $('.number-of-products');

        $(this).on('change', function(){

            if($(this).val().trim() != "undefined") {
                $(this).addClass('has-val');
                selectNumberOfProduct.removeAttr('disabled');
                selectNumberOfProduct.css('border-color',  '#40ff87');
            }
            else {
                $(this).removeClass('has-val');
                selectNumberOfProduct.attr('disabled');
            }
        })    
    })
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    var selectElem = $('.validate-input .select');
    $('.validate-form').on('submit',function(){
        var check = true;
        var checkForSelect = true;
        for(var i=0; i<input.length; i++) {
            if (input[i].classList.contains('wrap-options')) {
                continue;
            } else {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }
        }
        if(validate(selectElem) == false) {
            showValidate(selectElem);
            checkForSelect = false;
        }
        var result = !(check == false || checkForSelect == false);
    
        return result;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate($(this));
        });
    });
    
    $('.validate-form .select').each(function(){
        $(this).change(function(){
           hideValidate($(this));
        });
    });

    

    function validate (input) {
        var rule = $(input).attr('data-rule');
        var result = ($(input).val().trim() == '' || $(input).val() == "undefined") ? false : validDataRule(rule, input);
        return result;
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

            case 'product':
                if(value == "undefined") {
                    return false;
                }
            break;
        }
    }
    

    function showValidate(input) {
        if (input.tagName == 'INPUT' || input.hasClass('input100')) {
            var thisAlert = $(input).parent();
            $(thisAlert).addClass('alert-validate');
        } else {
            $('.wrap-product').addClass('alert-validate');
        }       
    }
    
    function hideValidate(input) {
        if (input.tagName == 'INPUT' || input.hasClass('input100')) {
            var thisAlert = $(input).parent();
            $(thisAlert).removeClass('alert-validate');
        } else {
            $('.wrap-product').removeClass('alert-validate');
        }
            
    }

})(jQuery);



$(function() {
    $(".submit").on("click", validate);
   
    // Validate email
    function validateEmail(email) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(String(email).toLowerCase());
    }
     
    // validate email and send form after success validation
    function validate() {
      var email = $(".email").val();
   
      if (validateEmail(email)) {
        $('.email').css('border-color', 'green');
        sendForm();
      } else {
        $('.email').css('border-color', 'red');
      }
      return false;
    }
  })(jQuery);