export const checkPasswordStrength = (val, errorMessage = "") => {

    if (errorMessage === "") {
        errorMessage = "Password should have at least: 8 characters including, 1 upper case, 1 special character (!@#$&*), and 1 number.";
    }
    if (typeof val != 'string') {
        return errorMessage;
    }
    if ((val = val.trim()).length == 0) {
        return errorMessage;
    }


    // 8 characters length
    // 1 characters in Upper Case
    // 1 Special Character (!@#$&*)
    // 1 numerals (0-9)
    var res = val.match(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8}/
    );
    if (res) {
        return true;
    } else {
        return errorMessage;
    }
}

export const isEmail = (val) => {
    var res = val.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return res;
}

export const validateForm = (form) => {
    var validatedFormField = {};
    var isFormValid = true;
    var allErrors = [];
    for (const fieldName in form.fields) {
        if (Object.hasOwnProperty.call(form.fields, fieldName)) {
            var field = form.fields[fieldName];
            var results = validateInput(field);
            validatedFormField[fieldName] = {
                ...field,
                errors: results === true ? [] : results,
                isValid: results === true
            }
            if (Object.hasOwnProperty.call(field, 'setEmptyStringIfNull') && field.value == null) {
                validatedFormField[fieldName].value = "";
            }
            if (results !== true) {
                isFormValid = false;
                allErrors = allErrors.concat(results);
            }
        }
    }
    return {
        ... form,
        isValid: isFormValid,
        fields: validatedFormField,
        errors: allErrors
    }
}

export const validateInput = (inputField) => {
    var errors = [];
    var val = inputField.value;
    if (Object.hasOwnProperty.call(inputField, 'setEmptyStringIfNull') && val == null) {
        val = "";
    }
    var validations = inputField.validate;
    for (const validationName in validations) {
        if (Object.hasOwnProperty.call(validations, validationName)) {
            const validationConfig = validations[validationName];
            var results = rules[validationName](val, validationConfig);
            if (results !== true) {
                errors.push(results);
            }
        }
    }
    return errors.length > 0 ? errors : true;
}

export const rules = {
    required(val, config) {
        if (typeof config == 'string') {
            config = {
                error: config,
                trim: false,
                wrongValues: [""]
            };
        }
        if (typeof val == 'undefined' || val == null) {
            return config.error;
        }
        if (typeof val == 'string') {
            val = config.trim ? val.trim() : val;
            if (val.length == 0 || (config.wrongValues && config.wrongValues.indexOf(val) >= 0)) {
                return config.error;
            } else {
                return true;
            }
        } else if (Array.isArray(val)) {
            if (val.length == 0) {
                return config.error;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    maxWords(val, config) {
        if (!config.trim) {
            config["trim"] = false;
        }
        if(typeof val == 'number'){
            val = val.toString();
        }
        if (typeof val == 'string' || Array.isArray(val)) {
            if (config.trim == true) {
                val = val.trim ? val.trim() : val;
            }
            const terms = val.split(" ");
            if (terms.length > config.value) {
                return config.error;
            } else {
                return true;
            }
        } else if (typeof val == undefined || val == null) {
            return config.error;
        } else {
            return "Expected a string or array value  ";
        }
    },
    maxLength(val, config) {
        if (!config.trim) {
            config["trim"] = false;
        }
        if(typeof val == 'number'){
            val = val.toString();
        }
        if (typeof val == 'string' || Array.isArray(val)) {
            if (config.trim == true) {
                val = val.trim ? val.trim() : val;
            }
            if (val.length > config.value) {
                return config.error;
            } else {
                return true;
            }
        } else if (typeof val == undefined || val == null) {
            return config.error;
        } else {
            return "Expected a string or array value  ";
        }
    },
    minLength(val, config) {
        if (!config.trim) {
            config["trim"] = false;
        }
        if (typeof val == 'string' || Array.isArray(val)) {
            if (config.trim == true) {
                val = val.trim ? val.trim() : val;
            }
            if (val.length < config.value) {
                return config.error;
            } else {
                return true;
            }
        } else if (typeof val == undefined || val == null) {
            return config.error;
        } else {
            return "Expected a string or array value";
        }
    },
    length(val, config) {
        if (typeof val == 'number') {
            val = String(val);
        }
        if (!config.trim) {
            config["trim"] = false;
        }
        if (typeof val == 'string' || Array.isArray(val)) {
            if (config.trim == true) {
                val = val.trim ? val.trim() : val;
            }
            if (val.length != config.value) {
                return config.error;
            } else {
                return true;
            }
        } else if (typeof val == undefined || val == null) {
            return config.error;
        } else {
            return "Expected a string or array value";
        }
    },
    northAmericaPhoneFormat(val, config) {
        if (typeof config == 'string') {
            config = {
                error: config,
                trim: false,
            };
        }
        if (config.ignoreIfEmpty && typeof val == 'string' && (val = val.trim()).length == 0) {
            return true;
        }
        if (typeof val != 'string') {
            return config.error;
        }
        var res = val.match(/^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/);
        if (res) {
            return true;
        } else {
            return config.error;
        }
    },
    emailFormat(val, config) {
        if (typeof config == 'string') {
            config = {
                error: config,
                trim: false,
            };
        }
        if (config.ignoreIfEmpty && typeof val == 'string' && (val = val.trim()).length == 0) {
            return true;
        }
        if (typeof val != 'string') {
            return config.error;
        }
        var res = isEmail(val);
        if (res) {
            return true;
        } else {
            return config.error;
        }
    },
    digitsOnly(val, config) {
        if (typeof config == 'string') {
            config = {
                error: config
            };
        }
        val = String(val);
        if (typeof val != 'string') {
            return config.error;
        }
        var res = val.toLowerCase().match(/^\d+$/);
        if (res) {
            return true;
        } else {
            return config.error;
        }
    },
    alphaOnly(val, config) {
        if (typeof config == 'string') {
            config = {
                error: config,
                trim: false,
            };
        }
        val = String(val);
        if (typeof val != 'string') {
            return config.error;
        }
        if(config.trim){
            val = val.trim();
        }
        var res = val.toLowerCase().match(/^[a-zA-Z ]*$/);
        if (res) {
            return true;
        } else {
            return config.error;
        }
    },
    sameAs(val, config, formData) {
        var targetValue = formData[config.value].value;
        if (val === targetValue) {
            return true;
        } else {
            return config.error;
        }
    },
    extraField(val, config) {
        if (typeof config == 'string') {
            config = {
                error: config,
                trim: false,
                wrongValues: []
            };
        }
        if (typeof val == 'undefined' || val == null) {
            return config.error;
        }
        if (typeof val == 'string') {
            val = config.trim ? val.trim() : val;
            if(val.length == 0){
                return true;
            }
            var parts = val.split(":");
            if (val.indexOf("[") == 0 || val.indexOf("]") == (val.length - 1)) {
                return config.error;
            } else if (parts.length != 2) {
                return config.error;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    standardDateFormatStr(val, config) {
        //https://bobbyhadz.com/blog/javascript-validate-date-yyyy-mm-dd
        if (typeof config == 'string') {
            config = {
                error: config,
                ignoreIfEmpty: false
            };
        }
        if (config.ignoreIfEmpty && typeof val == 'string' && (val = val.trim()).length == 0) {
            return true;
        }
        if (typeof val != 'string') {
            return config.error;
        }
        var res = val.toLowerCase().match(
            /^\d{4}-\d{2}-\d{2}$/
        );
        if (res) {
            const date = new Date(val);
            const timestamp = date.getTime();
            if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
                return config.error;
            } else {
                if (date.toISOString().startsWith(val)) {
                    return true;
                } else {
                    return config.error;
                }
            }
        } else {
            return config.error;
        }
    },
    inList(val, config) {
        if (Object.hasOwnProperty.call(config, "ignoreIfEmpty") == false) {
            config["ignoreIfEmpty"] = false;
        }
        if (config.ignoreIfEmpty && typeof val == 'string' && (val = val.trim()).length == 0) {
            return true;
        }
        if(config.value.indexOf(val) < 0){
            return config.error;
        }
        return true;
    },
    maxValue(val, config) {
        if (parseFloat(val) > parseFloat(config.value)) {
            return config.error;
        } else {
            return true;
        }
    },
    minValue(val, config) {
        if (parseFloat(val) < parseFloat(config.value)) {
            return config.error;
        } else {
            return true;
        }
    },
    numeric(val, config) {
        //https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
        if (typeof config == 'string') {
            config = {
                error: config
            };
        }
        val = String(val);
        if (typeof val != 'string') {
            return config.error;
        }
        var res = !isNaN(parseFloat(val)) && isFinite(val);
        if (res) {
            return true;
        } else {
            return config.error;
        }
    },
    dateFormat(val, config){
        //https://www.scaler.com/topics/date-validation-in-javascript/
        if (typeof config == 'string') {
            config = {
                error: config
            };
        }
        if(typeof config.format != "string"){
            config.format = "mm/dd/yyyy";
        }
        let date = String(val);
        if(config.format.toLowerCase() == "mm/dd/yyyy"){
            let dateformat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
            // Matching the date through regular expression      
            if (date.match(dateformat)) {
                let operator = date.split('/');

                // Extract the string into month, date and year      
                let datepart = [];
                if (operator.length > 1) {
                    datepart = date.split('/');
                }
                let month = parseInt(datepart[0]);
                let day = parseInt(datepart[1]);
                let year = parseInt(datepart[2]);

                // Create a list of days of a month      
                let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (month == 1 || month > 2) {
                    if (day > ListofDays[month - 1]) {
                        //to check if the date is out of range     
                        return config.error;
                    }
                } else if (month == 2) {
                    let leapYear = false;
                    if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
                    if ((leapYear == false) && (day >= 29)) return config.error;
                    else
                        if ((leapYear == true) && (day > 29)) {
                            return config.error;
                        }
                }
            } else {
                return config.error;
            }
            return true;
        }
    }
}

export const clearFormErrors = (form) => {
    var clearedFormField = {};
    for (const fieldName in form.fields) {
        if (Object.hasOwnProperty.call(form.fields, fieldName)) {
            var field = form.fields[fieldName];
            clearedFormField[fieldName] = {
                ...field,
                errors: [],
                isValid: true
            }
            if (Object.hasOwnProperty.call(field, 'setEmptyStringIfNull') && field.value == null) {
                clearedFormField[fieldName].value = "";
            }
        }
    }
    return {
        ... form,
        isValid: true,
        fields: clearedFormField,
        errors: []
    }
}