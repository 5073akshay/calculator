//1:12:42 go to sleep lmaoo

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const displayEl = document.querySelector('.display');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');

const percentEl = document.querySelector('.percent');
const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');

const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');

const numberElArray = [
    number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, number8El, number9El
];

//variables
let displayStrInMemory = null;
let operatorInMemory = null;


//functions
const getValueAsStr = () => displayEl.textContent.split(',').join('');


const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (displayStr) => {
    if (displayStr[displayStr.length - 1] === '.') {
        displayEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = displayStr.split('.');
    if (decimalStr)
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    else
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
};

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getValueAsStr();

    if (currentDisplayStr === '0')
        setStrAsValue(numStr);
    else
        setStrAsValue(currentDisplayStr + numStr);

}

const getResultOfOperationsAsStr = () => {
    const currentDisplayNmum = getValueAsNum();
    const displayNumInMemory = parseFloat(displayStrInMemory);
    let newDisplayNum;
    if (operatorInMemory === 'addition')
        newDisplayNum = displayNumInMemory + currentDisplayNmum;
    else if (operatorInMemory === 'subtraction')
        newDisplayNum = displayNumInMemory - currentDisplayNmum;
    else if (operatorInMemory === 'multiplication')
        newDisplayNum = displayNumInMemory * currentDisplayNmum;
    else if (operatorInMemory === 'division')
        newDisplayNum = displayNumInMemory / currentDisplayNmum;
    return newDisplayNum.toString();
}

const handleOperatorClick = (operations) => {
    const currentDisplayStr = getValueAsStr();

    if (!displayStrInMemory) {
        displayStrInMemory = currentDisplayStr;
        operatorInMemory = operations;
        setStrAsValue('0');
        return;
    }
    displayStrInMemory = getResultOfOperationsAsStr();
    operatorInMemory = operations;
    setStrAsValue('0');

};


//adding eventlistners to functions

acEl.addEventListener('click', () => {
    setStrAsValue('0');
    displayStrInMemory = null;
    operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
    const currentDisplayNum = getValueAsNum();
    const currentDisplayStr = getValueAsStr();

    if (currentDisplayStr === '-0') {
        setStrAsValue('0');
        return;
    }
    if (currentDisplayNum >= 0)
        setStrAsValue('-' + currentDisplayStr);
    else
        setStrAsValue(currentDisplayStr.substring(1));

});

percentEl.addEventListener('click', () => {
    const currentDisplayNmum = getValueAsNum();
    const newDisplayNum = currentDisplayNmum / 100;
    setStrAsValue(newDisplayNum.toString());
    displayStrInMemory = null;
    operatorInMemory = null;

});


//adding eventlistners to operators


additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
    if (displayStrInMemory) {
        setStrAsValue(getResultOfOperationsAsStr());
        displayStrInMemory = null;
        operatorInMemory = null;
    }
});
//adding eventlistners to number and decimal
for (let i = 0; i < numberElArray.length; i++) {
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalEl.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes('.'))
        setStrAsValue(currentValueStr + '.');
});



// time ki seetuing kar rhe ha dynamically

// check kar sakte ha ki dynamically value chnge ho rhi ha ki nhi 
// hourEl.textContent = '10';


const updateTime = () => {
    const currentTime = new Date();

    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    if (currentHour > 12)
        currentHour -= 12;

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();