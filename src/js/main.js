
(function ($) {
    'use strict';
    
    // event for adding a phone number code when clicking on an input
    var inputPhone = $('.input-phone');
    inputPhone.on('focus', function() {
        $(this).val('+375');
    })

    // event to remove input default value if phone number is not entered
    inputPhone.on('blur', function() {
        if($(this).val() == '+375') {
            $(this).val(null);
        }
    })

    // the method checks after losing the focus of an element, whether the field contains a value
    $('.input100').each(function(){
        $(this).on('blur', function(){

            if($(this).val().trim() != '') {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    // the method checks after losing the focus of the element, whether the Product field contains the value...
    $('.select').each(function(){
        var selectNumberOfProduct = $('.number-of-products');

        $(this).on('change', function(){

            if($(this).val().trim() != 'undefined') {
                $(this).addClass('has-val');
                selectNumberOfProduct.removeAttr('disabled');
                selectNumberOfProduct.css('border-color', '#d9d9d9');
            }
            else {
                $(this).removeClass('has-val');
                selectNumberOfProduct.attr('disabled');
            }
        })    
    })
  
    // check for validation of the entire form
    var input = $('.wrap-input100 .input100');
    var selectElem = $('.validate-input .select');
    var captcha = $('.g-recaptcha');
    $('.validate-form').on('submit',function() {
        
        var captchaIsValid = checkCaptchaForValidite();
        var check = true;
        var checkForSelect = true;
        for(var i = 0; i < input.length; i++) {

            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }

        if(validate(selectElem) == false) {
            showValidate(selectElem);
            checkForSelect = false;
        }

        if(!captchaIsValid) {
            showValidate(captcha);
        }

        var result = !(check == false || checkForSelect == false || captchaIsValid == false);
    
        return result;
    });

    // event hiding validation popup for Company, First Name, Last Name, Email, Phone fields
    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate($(this));
        });
    });

    // event hiding validation popup for Product select field
    $('.validate-form .select').each(function(){
        $(this).change(function(){
           hideValidate($(this));
        });
    });

    // this method returns true if the captcha passed, otherwise it returns false
    function checkCaptchaForValidite() {
        var dataReCaptcha = $('#g-recaptcha-response').val();
        return (dataReCaptcha != '' && dataReCaptcha != undefined) ? true : false;
    }

    // this method returns false if the field is empty or not defined, otherwise it calls the validDataRule method
    function validate (input) {
        var rule = $(input).attr('data-rule');
        var result = ($(input).val().trim() == '' || $(input).val() == 'undefined') ? false : validDataRule(rule, input);
        return result;
    }

    // this method checks against regular expressions such fields as Company, First Name, Last Name, Email, Phone, Product
    function validDataRule(rule, input) {
        var length = +$(input).val().length;
        var value = $(input).val();
        var lengthFrom = +$(input).attr('data-from');
        var lengthTo = +$(input).attr('data-to');

        switch(rule) {
            
            case 'string-company':
                if( ((value.trim().match(/^[a-z\s]+$/i) == null) || ((length < lengthFrom) || (length > lengthTo)))) {
                    return false;   
                }
            break;
                
            case 'string-name':
                if( ((value.trim().match(/^[A-Z]+$|^[А-Я]+$/i) == null) || ((length < lengthFrom) || (length > lengthTo)))) {
                    return false;
                }
            break;
                
            case 'email': 
                if(value.trim().match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.com$/) == null) {
                    return false;
                }
            break;
                
            case 'phone':
                if(value.trim().match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/) == null) {
                    return false;
                }
            break;

            case 'product':
                if(value == 'undefined') {
                    return false;
                }
            break;
        }
    }
    
    // method adding field validation popup
    function showValidate(input) {
        
        if (input.tagName == 'INPUT' || input.hasClass('input100')) {
            var thisAlert = $(input).parent();
            $(thisAlert).addClass('alert-validate');
        } else if(input.hasClass('select')) {
            $('.wrap-product').addClass('alert-validate');
        }    
    }
    
    // field validation popup hide method
    function hideValidate(input) {

        if (input.tagName == 'INPUT' || input.hasClass('input100')) {
            var thisAlert = $(input).parent();
            $(thisAlert).removeClass('alert-validate');
        } else if(input.hasClass('select')) {
            $('.wrap-product').removeClass('alert-validate');
        } 
    }

})(jQuery);
