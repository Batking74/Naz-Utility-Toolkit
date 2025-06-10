import { useState } from "react";

export default function DigitalCalculatorProjectPage() {
    const [strings, setStrings] = useState({
        binary: 'Binary',
        Hex: 'Hex',
        hex: 'hex',
        factorial: 'Factorial',
        bit: 'bit',
        log: 'Log',
        sqrt: 'Sqrt',
        operationStr: 'operation'
    });
    // Targeting Elements
    const calculate = (e) => {
        const btn = e.target;
        const value = findValue(btn.textContent, btn);
        if (value === undefined) return;
        setCalaculationBackgroundOnClick(btn);
        validate(value, btn);
    }
    const buttons = document.getElementsByTagName('button');
    const binaryOperand = document.getElementById('binary-operand');
    const hexOperand = document.getElementById('hex-operand');
    const decimalOperand = document.getElementById('decimal-operand');
    let num = new Array(3);
    let operation, isAnumber, numSystem, i = 0, prevElement;


    // Checks if the user clicked on a numerical value and returns it. else returns non-numerical value.
    function findValue(value, btn) {
        const isNotSpecialChar = value != '.' && value != '=';
        const notACharBesidesNum = value.length == 1 && btn.classList[0] != strings.hex && btn.classList[1] != strings.operationStr;
        if (isNotSpecialChar && notACharBesidesNum) {
            isAnumber = true;
            return parseFloat(value);
        }
        isAnumber = false;
        return value;
    }


    // Validates the button that the user clicked on
    function validate(value, btn) {
        switch (value) {
            case 'DEL': deleteNum(); break;
            case 'AC':
                prevElement != undefined ? asign('#7aec2eb9', 2) : null;
                clearAndReset(); break;
            case strings.sqrt: asign(strings.sqrt, 0); i = 0; break;
            case strings.binary: changeNumberSystem(strings.binary, true, 8); break;
            case strings.Hex: changeNumberSystem(strings.Hex, false, 4); break;
            case strings.log: asign(value, 0); asign('Log', 1); break;
            case strings.factorial: asign(value, 0); asign('!', 1); break;
            case '=':
                const calc = isOperation();
                const hasNums = num[0] != undefined && num[1] != undefined;
                const isValid = calc[0] || operation === strings.log || calc[1] || hasNums || i > 1;
                if (isValid) {
                    asign('', 1);
                    displayResults(compute());
                    asign(undefined, 0);
                }
                break;
            default: appendToCalc(value, btn);
        }
    }


    // If clicked on an operation button it will be highlighted
    const setCalaculationBackgroundOnClick = (btn) => {
        const btnClass = btn.classList[1];
        if (btnClass === strings.operationStr || btnClass === 'numSystem') {
            if (prevElement != undefined) {
                btn.style.background = 'red';
                asign('#7aec2eb9', 2);
                prevElement = btn;
            }
            else {
                btn.style.background = 'red';
                prevElement = btn;
            }
        }
    }


    // Converts Number System to Decimal
    function convertToDecimal() {
        for (let btn of buttons) {
            if (btn.className === strings.hex) btn.disabled = true;
            else btn.disabled = false;
        }
        numSystem = undefined;
    }


    // Calculates value(s)
    function compute() {
        const arithmetic = {
            '+': num[0] + num[1],
            '-': num[0] - num[1],
            '×': num[0] * num[1],
            '÷': num[0] / num[1],
            '%': num[1] * (num[0] / 100),
            'Sqrt': Math.sqrt(num[0]),
            'Mod': num[0] % num[1],
            'Log': logarithm(num[0]),
            'Pow': Math.pow(num[0], num[1]),
            'Factorial': function () {
                let factorialSum = 1;
                for (let i = num[0]; i > 0; i--) factorialSum *= i;
                return factorialSum;
            }
        }
        return calculation(arithmetic);
    }


    // If its a Factorial calculation call the function. Else calculate user inputs
    function calculation(res) {
        if (isOperation()[0]) {
            if (i < 0) return;
            i++;
            return res[operation]();
        }
        else {
            num[0] = res[operation];
            i++;
            return num[0];
        }
    }


    // Changes the number System to Binary or Hexadecimal
    function changeNumberSystem(system, isDisabled, num) {
        if (numSystem != system) {
            for (let i = 0; i < buttons.length; i++) {
                const btnClass = buttons[i].classList;
                const btnClass2 = btnClass[1] === strings.operationStr;
                if ((btnClass[0] != bit && num == 8) || btnClass2) {
                    buttons[i].disabled = isDisabled;
                }
                if (num != 8) {
                    if (buttons[i].textContent === '.' || btnClass2) {
                        buttons[i].disabled = true;
                    }
                    else buttons[i].disabled = isDisabled;
                }
            }
            numSystem = system;
        }
    }


    // Deletes Number from far right
    function deleteNum() {
        let numbers = decimalOperand.textContent;
        if (numbers != undefined) {
            const newNumbers = numbers.substring(0, numbers.length - 1);
            asign(newNumbers, 1);
            if (!(newNumbers.length <= 0)) {
                asign(parseFloat(newNumbers).toString(2), 3);
                asign(parseFloat(binaryOperand.textContent, 2).toString(16), 4);
            }
            else asign('', 3); asign('', 4);
        }
    }


    // Resets Calculator
    function clearAndReset() {
        asign('', 1);
        asign('', 3);
        asign('', 4);
        i = 0;
        num[0] = 0;
        num[1] = 0;
        num[2] = '';
    }


    // Appends different calculations to operand
    function appendToCalc(value, btn) {
        // If the calculation is Factorial. Execute this code.
        if (isOperation()[0]) {
            const factorialNum = `${decimalOperand.textContent.replace('!', '')}${value}`;
            asign(parseFloat(factorialNum), 5);
            asign(`${factorialNum}!`, 1);
        }
        // If the calculation is Logarithm. Execute this code.
        else if (operation === strings.log) {
            const logNum = `${decimalOperand.textContent.replace('Log', '')}${value}`;
            asign(parseFloat(logNum), 5);
            asign(`Log${logNum}`, 1);
        }

        /*
        if the calculation is already defined and its not a sqrt, and the button (value) the user clicked on was is a number. Execute this code
        */
        else if (operation != undefined && isAnumber && operation != sqrt) {
            if (i == 0) asign('', 1);
            else if (i > 1) clearAndReset();
            num[1] = parseFloat(`${decimalOperand.textContent}${value}`);
            displayResults(value);
            i++;
        }

        // if the button the User clicked on was an operator execute this code
        else if (btn.classList[1] === strings.operationStr) {
            asign(value, 0);
        }

        // if the button (value) the user clicked on was a number, and the calculation is not defined Execute this code
        else if (isAnumber && operation === undefined) {
            if (i == 1) asign('', 1);
            else if (i > 1) clearAndReset();
            asign(parseFloat(`${decimalOperand.textContent}${value}`), 5);
            displayResults(value);
        }

        // If the calculation is Sqrt. Execute this code.
        else if (isOperation()[1]) {
            if (i > 1) clearAndReset();
            asign(`${decimalOperand.textContent}${value}`, 5);
            displayResults(value);
        }

        // If the Numerical System is Hexadecimal. Execute this code.
        else if (numSystem === strings.Hex) {
            if (i > 1) clearAndReset();
            displayResults(value);
        }

        // If the Numerical System is Binary. Execute this code.
        else if (numSystem === strings.binary) {
            if (i > 1) clearAndReset();
            displayResults(value);
        }
        else {
            decimalOperand.textContent += value;
        }
    }


    // Converts all numbers to decimal, hexadecimal, and binary
    function displayResults(value) {
        // Binary
        if (numSystem === strings.binary) {
            binaryOperand.textContent += value;
            asign(parseFloat(binaryOperand.textContent, 2), 1);
            asign(parseFloat(binaryOperand.textContent, 2).toString(16), 4);
        }
        // Hexadecimal
        else if (numSystem === strings.Hex) {
            hexOperand.textContent += value;
            asign(parseFloat(hexOperand.textContent, 16), 1);
            asign(parseFloat(decimalOperand.textContent).toString(2), 3);
        }
        // Decimal
        else {
            decimalOperand.textContent += value;
            asign(parseFloat(decimalOperand.textContent).toString(2), 3);
            asign(parseFloat(binaryOperand.textContent, 2).toString(16), 4);
        }
    }


    // Assigns values to variables and Dom Elements
    function asign(value, index) {
        if (index == 0) operation = value;
        else if (index == 1) decimalOperand.textContent = value;
        else if (index == 2) prevElement.style.background = value;
        else if (index == 3) binaryOperand.textContent = value;
        else if (index == 4) hexOperand.textContent = value;
        else if (index == 5) num[0] = value;
    }


    // Logarithm Algorithm
    function logarithm(number) {
        let log = 0;
        while (number > 1) {
            number /= 2;
            log++;
        }
        return log;
    }


    function isOperation() { return [operation === strings.factorial, operation === strings.sqrt]; }
    return (
        <main className="calculator-grid">
            <div className="output">
                <div className="binary-operand"><p id="binary-operand"></p></div>
                <div className="hex-operand"><p id="hex-operand"></p></div>
                <div onClick={convertToDecimal} className="decimal-operand"><p id="decimal-operand"></p></div>
            </div>
            <button onClick={calculate} className="bit span-two">Factorial</button>
            <button onClick={calculate} className="bit span-two">AC</button>
            <button onClick={calculate} className="bit">DEL</button>
            <button onClick={calculate} className="bit numSystem">Binary</button>
            <button onClick={calculate} disabled className="hex">A</button>
            <button onClick={calculate} disabled className="hex">B</button>
            <button onClick={calculate} disabled className="hex">C</button>
            <button onClick={calculate} className="bit operation">%</button>
            <button onClick={calculate} className="bit numSystem">Hex</button>
            <button onClick={calculate} disabled className="hex">D</button>
            <button onClick={calculate} disabled className="hex">E</button>
            <button onClick={calculate} disabled className="hex">F</button>
            <button onClick={calculate} className="bit operation">÷</button>
            <button onClick={calculate} className="bit operation">Mod</button>
            <button onClick={calculate} className="dec">7</button>
            <button onClick={calculate} className="dec">8</button>
            <button onClick={calculate} className="dec">9</button>
            <button onClick={calculate} className="bit operation">×</button>
            <button onClick={calculate} className="bit operation">Log</button>
            <button onClick={calculate} className="dec">4</button>
            <button onClick={calculate} className="dec">5</button>
            <button onClick={calculate} className="dec">6</button>
            <button onClick={calculate} className="bit operation">+</button>
            <button onClick={calculate} className="bit operation">Sqrt</button>
            <button onClick={calculate} className="bit dec">1</button>
            <button onClick={calculate} className="dec">2</button>
            <button onClick={calculate} className="dec">3</button>
            <button onClick={calculate} className="bit operation">-</button>
            <button onClick={calculate} className="bit operation">Pow</button>
            <button onClick={calculate} className="bit dec">0</button>
            <button onClick={calculate}>.</button>
            <button onClick={calculate} className="bit span-two">=</button>
        </main>
    );
}