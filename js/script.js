var calcDisplay = (input) => document.getElementById('result').innerHTML = input;

var getDisplay = () => document.getElementById('result').innerHTML;

var getKey = (value) => {
    if (value == "equals") {
        calcEquals();
    } else if (value == "Ans") {
        if (!isNaN(getDisplay())) {
            calcDisplay(getDisplay());
        }
    } else if (value == "AC") {
        //Clear
        calcDisplay("0");
    } else if (value == "CE") {
        //Remove last digit or operator
        if (getDisplay().length < 2) {
            calcDisplay("0");
        } else {
            calcDisplay(getDisplay().slice(0, -1));
        }
    } else if (value == "/" || value == "*") {
        //Prevent double entry of the above operators. Needed for some calculations to work properly
        noDoubleOps(value);
    } else if (value == "-" || value == "+") {
        //Prevent triple entry of the above operators. Needed for some calculations to work properly
        noTripleOps(value);
    } else if (value == ".") {
        //Prevent double entry of decimal
        if (getDisplay().slice(-1) == ".") {
            calcDisplay(getDisplay());
        } else {
            calcDisplay(getDisplay() + ".");
        }
    } else {
        if (getDisplay() == "0") {
            calcDisplay(value);
        } else {
            calcDisplay(getDisplay() + value);
        }
    }
}

var calcEquals = () => {
    //replace "--" with "+" operator, assuming user wants to subtract a specified negative number e.g. 5-(-3)=8
    let x = getDisplay().replace(/\-{2,}/g, "+");
    //replace "++" with "+" operator, assuming user want to add a specified positive number e.g. 5+(+3)=8
    x = x.replace(/\+{2,}/g, "+");
    if (getDisplay()) {
        calcDisplay(eval(x));
    } else {
        calcDisplay("0");
    }
}

var noDoubleOps = (value) => {
    let lastChar = getDisplay()[getDisplay().length - 1];
    //prevent adding additional "/" or "*" operator to expression if last character in string is one of the following
    if (lastChar == "/" || lastChar == "*" || lastChar == "-" || lastChar == "+") {
        calcDisplay(getDisplay());
    } else {
        switch (value == "/" || value == "*") {
            case (value == "/"):
                calcDisplay(getDisplay() + "/");
                break;
            case (value == "*"):
                calcDisplay(getDisplay() + "*");
                break;
        }
    }
}

var noTripleOps = (value) => {
    let lastChars = getDisplay().slice(-2);
    //prevent adding additional "-" or "+" operator to expression if last two characters are one of the following
    if (lastChars == "--" || lastChars == "-+" || lastChars == "++" || lastChars == "+-") {
        calcDisplay(getDisplay());
    } else {
        switch (value == "-" || value == "+") {
            case (value == "-"):
                calcDisplay(getDisplay() + "-");
                break;
            case (value == "+"):
                calcDisplay(getDisplay() + "+");
                break;
        }
    }
}