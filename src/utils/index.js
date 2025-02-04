export const formField = (defaults) => {
    return {
        value: defaults?.value??'',
        isValid: defaults?.isValid??null,
        validate: defaults?.validate??[],
        errors: defaults?.errors??[],
        isDisabled: defaults?.isDisabled??false,
        isRequired: defaults?.isRequired??true,
        placeholder: defaults?.placeholder??"",
        id: defaults?.id??generateUUIDv4()
    }
    // setEmptyStringIfNull : true, an empty string will be assigned if the value is null
}

export const generateUUIDv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


export const bigNumberFormat = (n, d) => {
    //https://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js
    let x = ('' + n).length;
    let p = Math.pow;
    d = p(10, d);
    x -= x % 3;
    return (Math.round(n * d / p(10, x)) / d) + " kMGTPE"[x / 3];
}

export const comma = (val) => {
    //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    var t = parseFloat(val);
    var bt = t.toLocaleString();
    return bt;
}

export const formatDate = (date, format) => {
    if (!date || (typeof date == 'string' && date == "")) {
        return date;
    }
    if (typeof date == 'string') {
        date = new Date(date);
    }
    const shortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthIndex = date.getMonth();
    let dayStr = date.getDate();
    if (dayStr < 10) {
        dayStr = `0${dayStr}`;
    } else {
        dayStr = `${dayStr}`;
    }
    let montStr = "";
    if (monthIndex < 10) {
        montStr = `0${monthIndex + 1}`;
    } else {
        montStr = `${monthIndex + 1}`;
    }

    let hrStr = date.getHours();
    var ampm = "AM";
    if (hrStr > 12) {
        hrStr -= 12;
        ampm = "PM";
    }
    if (hrStr < 10) {
        hrStr = `0${hrStr}`;
    } else {
        hrStr = `${hrStr}`;
    }
    let minStr = date.getMinutes();
    if (minStr < 10) {
        minStr = `0${minStr}`;
    } else {
        minStr = `${minStr}`;
    }

    if (format === "month date, year") {
        return `${shortNames[monthIndex]} ${dayStr},  ${date.getFullYear()}`;
    } else if (format === "month date, year hrs:mins") {
        return `${shortNames[monthIndex]} ${dayStr},  ${date.getFullYear()} ${hrStr}:${minStr} ${ampm}`;
    } else if (format === "mm-dd-yy") {
        return `${montStr}-${dayStr}-${date.getFullYear()}`;
    } else if (format === "mm-dd-yy hrs:mins") {
        return `${montStr}-${dayStr}-${date.getFullYear()} ${hrStr}:${minStr} ${ampm}`;
    }
    return date.toDateString();
}

export const getLastWeeksDate = () => {
    //https://bobbyhadz.com/blog/javascript-get-last-week-date
    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7 //supposed to be 7 
    );
}

export const isLessThanMonth = (date, fromDate) =>  {
    const itemDate = typeof date === 'string' ? new Date(date) : date;
    fromDate = !fromDate ? new Date() : fromDate;
    // const acceptedTimeSpan = 30 * 24 * 60 * 60 * 1000 ; //todo: 30 days
    // const acceptedTimeSpan = 30 * 24 * 60 * 60 * 1000 * 2; //two months
    const acceptedTimeSpan = 7 * 24 * 60 * 60 * 1000; //weeks time
    let timeDiffInMs = fromDate.getTime() - itemDate.getTime();
    if (timeDiffInMs < 0) {
        //the item date is greater, newer
        //check if its within a week
        const nowTime = (new Date()).getTime();
        timeDiffInMs = nowTime - itemDate.getTime(); //makes sure that things are within a weeks time
        if (timeDiffInMs <= acceptedTimeSpan) {
            return true;
        }
        return false;
    }

    return false;
}

export const shuffle = (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}