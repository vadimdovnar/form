class Validation {

    validateForm() {


        const inputs = document.querySelectorAll('input[data-rule]');
        const inputPhone = document.querySelector('input[data-rule=phone]');
    
        inputPhone.addEventListener('focus', function(e) {
        e.target.value = '+375';
        });


    for( let input of inputs ) {
        
        input.addEventListener('blur', function() {
            let rule = this.dataset.rule;
            let value = this.value;

            let length = +this.value.length;
            let lengthFrom = +this.dataset.from; 
            let lengthTo = +this.dataset.to;

            let check;
            let reg;

            switch(rule) {

                case 'string-company':
                    reg = /[a-z]+|[0-9]+/i;
                    check = ( (length >= lengthFrom) && (length <= lengthTo) ) && (reg.test(value));
                break;

                case 'string-name':
                    reg = /^[A-Z]+$|^[А-Я]+$/i;
                    check = ( (length >= lengthFrom) && (length <= lengthTo) ) && (reg.test(value));
                break;

                case 'email': 
                    reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
                    check = reg.test(value);
                break;

                case 'phone': 
                    if(value === '+375') {
                        this.value = '';
                    }
                    let lengthVal = +this.dataset.length;
                    reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                    check = (value.length === lengthVal) && (reg.test(value));
                break;
            }

            if(check) {
                console.log('valid');
            } else {
                console.log('invalid');
            }
        });
    }
    }
}