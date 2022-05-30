
const inputPhone = document.querySelector('.input-phone');
inputPhone.addEventListener('click', (e) => {
    const elem = e.target
    
    elem.value = '+375';
})

inputPhone.addEventListener('blur', (e) => {
    const elem = e.target;
    if(elem.value == '+375') {
        elem.value = null;
    }
})


/*==========================================================
[Focus input]*/

const inputs = document.querySelectorAll('.input100');
inputs.forEach( elem => {
    elem.addEventListener('blur', () => {
        if(elem.value.trim() != '') {
            elem.classList.add('has-val');
        } else {
            elem.classList.remove('has-val');
        }
    })
} )

/*==========================================================
[Change select]*/

const select = document.querySelectorAll('.select');
select.forEach( elem => {
    elem.addEventListener('change', () => {
    
        if(elem.value.trim() != 'undefined') {
            elem.classList.add('has-val');
        } else {
            elem.classList.remove('has-val');
        }
    } )
})

/*==========================================================
[Validate]*/

const input = document.getElementsByClassName('input100');
const selectElem = document.getElementsByClassName('select')[0];
const form = document.querySelector('.validate-form');

form.addEventListener('submit', () => {
    let check = true;
    let checkForSelect = true;

    for(let i = 0; i < input.length; i++) {
        if(input[i].classList.contains('wrap-options')) {
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
    let result = !(check == false || checkForSelect == false);
    return result;
})

const validFormInput = document.querySelectorAll('.validate-form .input100');
validFormInput.forEach( elem => {
    elem.addEventListener('focus', () => {
        hideValidate(elem);
    })
} )

const validFormSelect = document.querySelectorAll('.validate-form .input100');
validFormSelect.forEach( elem => {
    elem.addEventListener('change', () => {
        hideValidate(elem);
    })
} )

function validate (input) {
    let rule = input.getAttribute('data-rule');
    let result = (input.value.trim() == '' || input.value == "undefined") ? false : validDataRule(rule, input);
    return result;
}

function validDataRule(rule, input) {
    let length = +input.value.length;
    let value = input.value;
    let lengthFrom = +input.getAttribute('data-from');
    let lengthTo = +input.getAttribute('data-to');

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
    if (input.tagName == 'INPUT' || input.classList.contains('input100')) {
        let thisAlert = input.parentNode;
        console.log(thisAlert);
        thisAlert.classList.add('alert-validate');
    } else {
        let wrapProduct = document.querySelector('.wrap-product');
        wrapProduct.classList.add('alert-validate');
    }       
}

function hideValidate(input) {
    if (input.tagName == 'INPUT' || input.classList.contains('input100')) {
        let thisAlert = input.parentNode;
        console.log(thisAlert);
        thisAlert.classList.remove('alert-validate');
    } else {
        let wrapProduct = document.querySelector('.wrap-product');
        wrapProduct.classList.remove('alert-validate');
    }
        
}

