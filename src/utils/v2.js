export default {
    toValueLabelList(source, valueProp, labelProp){
        var list = [];
        for (let index = 0; index < source.length; index++) {
            var item = source[index];
            var text = "";
            if(typeof labelProp == 'function'){
                text = labelProp(item);
            }else{
                text = item[labelProp];
            }
            list.push({
                value: item[valueProp],
                label: text
            });
        }
        return list;
    },
    toSearchValueLabelList(source, valueProp, labelProp){
        var list = [];
        for (let index = 0; index < source.length; index++) {
            var item = source[index];
            var text = "";
            if(typeof labelProp == 'function'){
                text = labelProp(item);
            }else{
                text = item[labelProp];
            }
            list.push({
                value: item[valueProp],
                text: text
            });
        }
        return list;
    },
    fillValues(formData, sourceObject, objectRefFun){
        if(typeof objectRefFun == 'undefined'){
            objectRefFun = function(name, value, item){
                return value;
            }
        }
        var editObject = {};
        for (const fieldKey in formData) {
            if (Object.hasOwnProperty.call(formData, fieldKey)) {
                var formField = formData[fieldKey];
                //check if sourceObject has this field
                if(
                    Object.hasOwnProperty.call(formField, "ref") && 
                    Object.hasOwnProperty.call(sourceObject, formField.ref)
                ){
                    var tempValue = sourceObject[formField.ref];
                    formField.value = objectRefFun(formField.ref,tempValue, sourceObject);
                }else if (Object.hasOwnProperty.call(sourceObject, fieldKey)) {
                    //get the value 
                    var tempValue = sourceObject[fieldKey];
                    formField.value = objectRefFun(fieldKey, tempValue, sourceObject);
                }
                editObject[fieldKey] = formField;
            }
        }
        return editObject;
    },
    pick(list, prop, value, def=null){
        var selectedItem = def;
        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            if (Object.hasOwnProperty.call(item, prop)) {
                if(typeof value == 'function'){
                    let searchRes = value(item);
                    if(searchRes === true){
                        selectedItem = {...item };
                    }
                }else{
                    var itemValue = item[prop];
                    if(itemValue == value){
                        selectedItem = {...item };
                        break;
                    }
                }
            }
        }
        return selectedItem;
    },
    pickFilter(list, prop, value){
        var temp = [];
        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            if (Object.hasOwnProperty.call(item, prop)) {
                var itemValue = item[prop];
                if(itemValue == value){
                    temp.push({
                        ...item 
                    });
                }
            }
        }
        return temp;
    },
    index(list, prop){
        var indexed = {};
        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            var key  = item[prop];
            if(typeof key == "string"){
                key = key.toLowerCase();
            }
            indexed[key] = item;
        }
        return indexed;
    },
    inject(list, sourceObject, propsObject){
        var newList = [];
        for (let index = 0; index < list.length; index++) {
            var item = {...list[index]};
            for (const propKey in propsObject) {
                if (Object.hasOwnProperty.call(propsObject, propKey)) {
                    var property = propsObject[propKey];
                    if(typeof property == "string" && Object.hasOwnProperty.call(item, property)){
                        var pointr = item[property];
                        item[propKey] = Object.hasOwnProperty.call(sourceObject, pointr)?sourceObject[pointr]:null;
                    }else if(typeof property == "string" && Object.hasOwnProperty.call(item, property) == false){
                        item[propKey] = null;
                    }else if(typeof property == "object"){
                        if(Object.hasOwnProperty.call(item, property.prop)){
                            var pointr = item[property.prop];
                            if(Object.hasOwnProperty.call(sourceObject, pointr) == false && property.default){
                                item[propKey] = property.default
                            }else{
                                item[propKey] = sourceObject[pointr];
                            }
                        }else{
                           item[propKey] = null;
                        }
                    }
                }
            }
            newList.push(item);
        }
        return newList;
    },
    addYearsToDate(date, years){
        let result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    },
    addDaysToDate(dateStr, days){
        let result = new Date(dateStr);
        result.setDate(result.getDate()  + days);
        return result;
    },
    dateToStandardDateString(date){
        let dateObj = (typeof date == "string") ? new Date(date) : date;
        var month = dateObj.getMonth() + 1;
        month = month < 10? `0${month}`:`${month}`;
        var day = dateObj.getDate();
        day = day < 10? `0${day}`:`${day}`;
        return `${dateObj.getFullYear()}-${month}-${day}`;
    },
    formDataToObject(formData){
        var obj = {};
        for (const propKey in formData) {
            if (Object.hasOwnProperty.call(formData, propKey)) {
                const config = formData[propKey];
                if(typeof config == "object"){
                    var key = config.ref? config.ref : propKey;
                    obj[key] = config.value;
                }else{
                    obj[propKey] = config;
                }
            }
        }
        return obj;
    },
    extractValuesList(valueLabelList){
        var list = [];
        valueLabelList.forEach(valueItem => {
            list.push(valueItem.value);
        });
        return list;
    },
    getIndexedUserRoles(){
        let rolesRefs = {};
        let user = localStorage.getItem("user");
        if(user){
            user = JSON.parse(user);
            for (let index = 0; index < user.user_roles.length; index++) {
                const userRole = user.user_roles[index];
                rolesRefs[parseInt(userRole.role_id)] = userRole.role;
            }
        }
        return rolesRefs;
    },
    defaultUser(){
        return {
            name: "",
            avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            user_roles: []
            //Business Owner
        }
    },
    defaultConfigs(){
        return {
            upcomingrepair: 5,
            missedrepair: 5,
            depreciation: 50,
            currency: ""
        };
    },
    defaultGlAccount(){
        return {
            id: 0,
            name: "",
            ref_no: "",
            rows: []
        };
    },
    //if you want to get other details like salvage etc then set 2nd param to true
    getCurrentAssetValue(asset, getDetails, asOfDate){
        //nyd: address these concerns
        //concerns
        //1. The days of the year are not always 365
        //2. The time does not take care of timezone and day light savings
        //3. This relies on a clients browser date, which might be wrong
        //4. We are rounding off and we lose accuraccy with money

        //https://www.wikiaccounting.com/net-book-value-non-current-assets/
        //https://www.deskera.com/blog/residual-value/
        //https://www.youtube.com/watch?v=B1GIBeJDjMM
        //https://blog.bitsrc.io/calculate-the-difference-between-two-2-dates-e1d76737c05a

        
        if(typeof getDetails == 'undefined'){
            getDetails = false;
        }

        let depreciation = 0;
        let salvageAmount = 0; //also known as residue value
        let useFullYears = parseFloat(asset.useful_years);
        let purchaseCost = parseFloat(asset.purchase_cost);
        if (useFullYears > 0)
        {
            salvageAmount = purchaseCost / useFullYears;
        }
        if(useFullYears != 0){
            depreciation = (purchaseCost - salvageAmount) / useFullYears;
        }
        let purchaseDate = new Date(asset.purchase_date + ' 00:00:00');
        let todayDate = new Date();
        if(typeof asOfDate != 'undefined'){
            if(typeof asOfDate == 'string'){
                todayDate = new Date(asOfDate);
            }else{
                todayDate = asOfDate;
            }
        }
        let purchaseDateTime = purchaseDate.getTime();
        let todayDateTime = todayDate.getTime();
        let differenceMs = todayDateTime - purchaseDateTime;
        //Get 1 day in milliseconds
        let oneDayMs=1000*60*60*24;
        let daysPast = Math.round(differenceMs/oneDayMs);
        let depreciationOneDay = depreciation / 365;
        let totalDepreciation = Math.round(depreciationOneDay * daysPast);
        let currentValue = purchaseCost - totalDepreciation;
        if(currentValue < 0){
            currentValue = 0;
        }
        if(getDetails === true){
            return {
                purchaseDate: asset.purchase_date,
                purchaseCost: purchaseCost,
                useFullYears: useFullYears,
                salvageAmount: salvageAmount,
                todayDate: this.dateToStandardDateString(todayDate),
                durationInDays: daysPast,
                daysInAYear: 365,
                dailyDepreciation: depreciationOneDay,
                totalDepreciation: totalDepreciation,
                currentValue: currentValue
            }
        }else{
            return currentValue; //this the default return value
        }
    },
    dashboardPillValue(val){
        if(val < 10){
            return `00${val}`;
        }else if(val < 100){
            return `0${val}`;
        }else if(val < 1000){
            return `${val}`;
        }else{
            return this.comma(val);
        }
    },
    dashboardTaskValue(val){
        if(val < 10){
            return `0${val}`;
        }else{
            return this.comma(val);
        }
    },
    comma(val) {
        //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        var t = parseFloat(val);
        var bt = t.toLocaleString();
        return bt;
    },
    remove_commas(str) {
        return str.replace(/,/g, '');
    },
    add_commas(num) {
        //https://stackoverflow.com/questions/6784894/add-commas-or-spaces-to-group-every-three-digits
        num = num.toString();
        var isNegative = num.startsWith("-");
        if (isNegative == true) {
            num = num.substr(1);
        }
        var str = num.split('.');
        if (str[0].length > 3) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1');
        }
        str = str.join('.');
        if (isNegative == true) {
            str = "-" + str;
        }
        return str;
    },
    pad0(val) {
        var temp = val.toString();
        if (temp.length < 2) {
            temp = "0" + temp;
        }
        return temp;
    },
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    phpTimeToJsDateString(time, withTime = false){
        if(typeof time == "string"){
            time = parseFloat(time);
        }
        var dtTime = time * 1000;
        var thisDate = new Date();
        thisDate.setTime(dtTime);
        var str = this.getDateString(thisDate, withTime);
        return str;
    },
    getDateString(thisDate, withTime){
        if (typeof thisDate == "undefined" || thisDate == null) {
          thisDate = new Date();
        }
        if (typeof withTime == "undefined" || withTime == null) {
          withTime = false;
        }
        var m = (1 + thisDate.getMonth());
        m = m < 10 ? ("0" + m) : m;
        var d = thisDate.getDate();
        d = d < 10 ? ("0" + d) : d;
        var thisDateStr = thisDate.getFullYear() + "-" + m + "-" + d;
        if (withTime == true) {
          thisDateStr = thisDateStr + " " + thisDate.toLocaleTimeString();
        }
        return thisDateStr;
    },
    getMonthEnding(thisDate){
        if (typeof thisDate == "undefined" || thisDate == null) {
          thisDate = new Date();
        }
        var months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        var m = thisDate.getMonth();
        return `${months[m]}, ${thisDate.getDate()}`;
    },
    getFileType(filePath){
        var parts = filePath.split(".");
        var extension  = parts[parts.length - 1];
        return extension.toLowerCase();
    },
    allFileExtensions(){
        // /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        ///(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd)$/i;
        return ["pdf", "doc", "docx", "odt", "txt", "rtf", "jpg", "jpeg", "png", "gif", "xlsx", "xlx"];
    },
    imageFileExtensions(){
        return ["jpg", "jpeg", "png", "gif"];
    },
    fileTypeIconRef(){
        return {
            "pdf": "fas fa-file-pdf text-danger",
            "doc": "fas fa-file-word text-primary",
            "docx": "fas fa-file-word text-primary",
            "odt": "fas fa-file-alt text-info",
            "txt": "fas fa-file text-info",
            "rtf": "fas fa-file-word text-info",
            "jpg": "fas fa-file-image",
            "jpeg": "fas fa-file-image",
            "png": "fas fa-file-image",
            "gif": "fas fa-file-image",
            "xlsx": "fas fa-file-excel text-success",
            "xlx": "fas fa-file-excel text-success",
        };
    },
    //nyd
    //write a blog post about this and add it to bee
    //The Eval Way Of Turning Flat Array Data Into A Tree
    //the idea is to describe the location of where the childrren of the items will be inserted
    //in js we can refrence an objects property like this obj["prop_name"] = cool_value;
    getTree(items, primary_key, parent_key, sortItemsBeforeProcessing = false, children_key = "_children", addLevelProp = false){
        //nyd
        //order by parent_key and primary_key first before
        if (sortItemsBeforeProcessing == true) {
            // eslint-disable-next-line no-self-assign
            items = items;//sorted items missing sorting function
        }
    
        var chart = [];
        var source = items;
        var waiting = [];
        var locations = { 0: "chart" };
        //beacuse we dont want to be stack in a loop we assume that you cannot loop more than 
        //the length of the source
        var breakAt = source.length;
        var tries = 0;
        while (source.length > 0) {
        tries = tries + 1;
        for (let index = 0; index < source.length; index++) {
            var item = source[index];
            if (locations.hasOwnProperty(item[parent_key])) {
            //add the child key
            item[children_key] = [];
            var loc = locations[item[parent_key]];
            //calulate the _level
            if (addLevelProp) {
                var level = (loc.split(children_key)).length - 1;
                item["_level"] = level;
            }
    
            //the item will be pushed to this location
            var pushLine = loc + ".push(item);";
            //push the item by evaluating the js statment
            eval(pushLine);
            //we need to get the index of the item where it has been inserted in this array/location
            var tempIndex = eval(loc + ".length - 1;");
            //we need to create a location for the children of that item
            var itemLoc = loc + "[" + tempIndex + "]." + children_key;
            //save this location for indexing
            locations[item[primary_key]] = itemLoc;
            } else {
            //take this item to the waiting room
            waiting.push(item);
            }
        }
        //process the waiting
        if (waiting.length == 0) {
            break;
        } else {
            source = waiting;
            waiting = [];
        }
        if (tries == breakAt) {
            console.log("source", source);
            console.log("locations", locations);
            console.log("waiting", waiting);
            Error("Tree error, please check if all entries are fine");
            break;
        }
        }
        return chart;
    },
    getParentChildTree(items, children_property, sortItemsBeforeProcessing = false, children_key = "_children"){
        //nyd
        //order by parent_key and primary_key first before
        if (sortItemsBeforeProcessing == true) {
        // eslint-disable-next-line no-self-assign
        items = items;//sorted items missing sorting function
        }
        var tree = [];
        for (let index = 0; index < items.length; index++) {
        //need to use clone
        var item = items[index].valueOf();
        item[children_key] = item[children_property];
        tree.push(item);
        }
        return tree;
    },
    flattenTree(tree){
        let list = [];
        for (let index = 0; index < tree.length; index++) {
          let node = { ... tree[index]};
          //the kids
          let children = node.children ? [...node.children] : [];
          
          //remove the children prop
          node.children = null;
          delete node.children;
          //add item to list
          list.push(node);
          if(children.length > 0){
            let childrenFlatList = this.flattenTree(children);
            //concat the kids list
            list = list.concat(childrenFlatList);
          }
        }
        return list;
    },
    getOrderItemFormDataFactory: function () {
        return function(){
            return {
            id: {
                id: "receive-purchase-order-item-id-input",
                label: "",
                tooltip: "",
                errors: [],
                value: "",
                isValid: null,
                validations: {
                },
            },
            name: {
                id: "receive-purchase-order-item-name-input",
                label: "Item Name",
                tooltip: "",
                value: "",
                isValid: null,
                validations: {
                }
            },
            specifications: {
                id: "receive-purchase-order-item-specification-input",
                label: "Specifications",
                tooltip: "",
                value: "",
                isValid: null,
                validations: {
                }
            },
            quantity: {
                id: "receive-purchase-order-item-quantity-input",
                label: "Ordered Quantity",
                tooltip: "",
                value: "",
                isValid: null,
                validations: {
                }
            },
            quantityDelivered: {
                id: "receive-purchase-order-item-quantity-delivered-input",
                label: "Delivered Quantity",
                tooltip:
                "Quantity delivered must be a whole number e.g 34, 105, 2 - no decimals allowed because an asset cannot be counted with a decimal point i.e you cannot have 2.5 cars",
                value: "",
                isValid: null,
                validations: {
                required: "Quanity delivered is required",
                maxLength: {
                    value: 10,
                    error: "Cannot be more than 10 digits",
                },
                digitsOnly: "Only digits are allowed",
                },
                ref: "quantity_delivered"
            },
            quantityRejected: {
                id: "receive-purchase-order-item-quantity-rejected-input",
                label: "Balance",
                tooltip: "",
                value: "",
                isValid: null,
                validations: {
                },
                ref: "quantity_rejected"
            },
            rejectionComment: {
                id: "receive-purchase-order-delivery-comment-input",
                label: "Delivery Notes:",
                tooltip: "Include more information about the delivery of the items if possible",
                errors: [],
                value: "",
                isValid: null,
                validations: {
                maxLength: {
                    value: 500,
                    error: "Cannot be more than 500 letters",
                },
                },
                setEmptyStringIfNull: true,
                ref: "rejection_comment"
            },
            receivePackageIdentityLabel: {
                id: "receive-purchase-order-delivery-package-label-input",
                label: "Delivery Package lables",
                tooltip: "If they were multiple packages, use a comma to seperate the labels",
                value: "",
                isValid: null,
                validations: {
                maxLength: {
                    value: 100,
                    error: "Cannot be more than 100 letters",
                },
                },
                setEmptyStringIfNull: true,
                ref: "receive_package_identity_label"
            },
            status: {
                id: "receive-purchase-order-item-status-input",
                label: "Status",
                tooltip: "",
                value: "",
                isValid: null,
                validations: {
                }
            },
            unitPrice: {
                id: "receive-purchase-order-item-unit-price-placeholder",
                label: "",
                tooltip: "",
                value: 0,
                isValid: null,
                validations: {
                },
                ref: "unit_price"
            },
            };
        };
    },
    getReceivePurchaseOrderFormDataFactory: function () {
        return function () {
            return {
                id: {
                    id: "receive-purchase-order-id-input",
                    label: "",
                    tooltip: "",
                    errors: [],
                    value: "",
                    isValid: null,
                    validations: {
                    },
                },
                deliveryDate: {
                    id: "receive-purchase-order-delivery-date-input",
                    label: "Delivery Date",
                    tooltip: "When are the items delivered",
                    value: "",
                    isValid: null,
                    validations: {
                    required: "Delivery date is required",
                    maxLength: {
                        value: 10,
                        error: "Cannot be more than 10 digits",
                    },
                    },
                    ref: "delivery_date"
                },
                notes: {
                    id: "receive-purchase-order-delivery-date-input",
                    label: "Delivery Notes:",
                    tooltip: "Include more information about the delivery of the items if possible",
                    errors: [],
                    value: "",
                    isValid: null,
                    validations: {
                    maxLength: {
                        value: 500,
                        error: "Cannot be more than 500 letters",
                    },
                    },
                    setEmptyStringIfNull: true,
                    ref: "delivery_notes"
                },
                grnNumber: {
                    id: "receive-purchase-order-grn-number-input",
                    label: "Good Received Number",
                    tooltip: "An automatic order number will be assigned, if none is given",
                    value: "",
                    isValid: null,
                    validations: {
                    maxLength: {
                        value: 20,
                        error: "Cannot be more than 20 digits",
                    },
                    },
                    setEmptyStringIfNull: true,
                    ref: "grn_number",
                },
                checkedByName: {
                    id: "receive-purchase-order-checked-by-name-input",
                    label: "Checked By:",
                    tooltip: "(optional) The full names of the person who checked this delivery",
                    errors: [],
                    value: "",
                    isValid: null,
                    validations: {
                    maxLength: {
                        value: 500,
                        error: "Cannot be more than 500 letters",
                    },
                    },
                    setEmptyStringIfNull: true,
                    ref: "checked_by_name"
                },
                supplierName: {
                    id: "receive-purchase-supplier-name-placaholder",
                    label: "",
                    tooltip: "",
                    errors: [],
                    value: "",
                    isValid: null,
                    validations: {
                    },
                },
            };
        }
    },
    generateSampleTrendingDataRegisterReport(assets, lastDate, daysRange){
        let valueTrends = [];

        if(typeof lastDate == 'string'){
            lastDate = new Date(lastDate + ' 00:00:00');
        }
        let lastDateTime = lastDate.getTime();

        for (let assetIndex = 0; assetIndex < assets.length; assetIndex++) {
            let asset = assets[assetIndex];
            let asOfDateStr = asset.purchase_date;
            while (true) {
                //add days to this date
                let nextDate = this.addDaysToDate(asOfDateStr, daysRange);
                let nextDateTime = nextDate.getTime();
                if(nextDateTime > lastDateTime){
                    break;
                }
                //get the depreciation as of this next date
                let valueDetails = this.getCurrentAssetValue(asset, true, nextDate);
                //if the depreciation is greater than the asset salvage amount then stop
                if(valueDetails.totalDepreciation > valueDetails.salvageAmount){
                    break;
                }
                valueTrends.push({
                    id: (valueTrends.length + 1),
                    bg_scanner_work_id: 0,
                    asset_id: asset.id,
                    entry_date: this.dateToStandardDateString(nextDate),
                    entry_date_time: nextDateTime/1000, //to php time
                    purchase_date: asset.purchase_date,
                    purchase_date_time: asset.purchase_date_time,
                    purchase_cost: parseFloat(asset.purchase_cost),
                    useful_years: valueDetails.useFullYears,
                    salvage_amount: valueDetails.salvageAmount,
                    duration_in_days: valueDetails.durationInDays,
                    days_in_year_used: valueDetails.daysInAYear,
                    daily_depreciation: valueDetails.dailyDepreciation,
                    total_depreciation: valueDetails.totalDepreciation,
                    current_value: valueDetails.currentValue,
                    outof_service_date: asset.outof_service_date,
                    outof_service_date_time: (new Date(asset.outof_service_date)).getTime()/1000,
                    condition: "",
                    method_used_to_calculate: "straightline",
                    category_id: asset.category_id,
                    debit_account_id: 0,
                    credit_account_id: 0,
                    account_transaction_id: 0
                });
                asOfDateStr = this.dateToStandardDateString(nextDate);
            }
            
        }
        return valueTrends;
    }
}