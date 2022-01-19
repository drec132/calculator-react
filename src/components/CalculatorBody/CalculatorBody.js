import React, { useState, useCallback } from 'react';
import CalculatorDisplay from '../CalculatorDisplay/CalculatoryDisplay';
import CalculatorKeys from '../CalculatorKey/CalculatorKey';
import './style.css';

export default function CalculatorBody() {
    const [value, setValue] = useState(null);
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [queueForOperand, setQueueForOperand] = useState(false);

    const clearText = displayValue === '0' ? "AC": "C";

    const clearAllDisplay = () => {
        setValue(null);
        setDisplayValue('0');
        setOperator(null);
        setQueueForOperand(false);
    }
    
    const inDigit = useCallback((digit) => {
        if (queueForOperand) {
            setQueueForOperand(false);
            setDisplayValue(String(digit));
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
        }
    }, [displayValue, queueForOperand]);

    const inOperand = useCallback((operand) => {
        const inputValue = parseFloat(displayValue);

        const CalculateWithOperator = {
            '/': (prevValue, nextValue) => prevValue / nextValue,
            '*': (prevValue, nextValue) => prevValue * nextValue,
            '+': (prevValue, nextValue) => prevValue + nextValue,
            '-': (prevValue, nextValue) => prevValue - nextValue,
            '=': (nextValue) => nextValue,
        };

        if (value == null) {
            setValue(inputValue);
        } else if (operator) {
            const currValue = value || 0;
            const newValue = CalculateWithOperator[operator](currValue, inputValue);
            
            setValue(newValue);
            setDisplayValue(String(newValue));
        }

        setQueueForOperand(true);
        setOperator(operand);    
    }, [displayValue, operator, value]);
    

    const inSign = useCallback(() => {
        const newValue = parseFloat(displayValue) * -1;

        setDisplayValue(String(newValue));
    }, [displayValue]);
    
    const inPercent = useCallback(() => {
        const currValue = parseFloat(displayValue);

        if (currValue === 0) return

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = parseFloat(displayValue) / 100;

        setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
    }, [displayValue]);

    const inDot = useCallback(() => {
        if (!(/\./).test(displayValue)) {
            setDisplayValue(displayValue + '.');
            setQueueForOperand(false);
        }
    }, [displayValue]);

    // const clearDisplay = () => {
    //     setDisplayValue('0');
    // }
      
    // const clearLastChar = useCallback(() => {
    //     setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0')
    // }, [displayValue]);
    // TODO having a bug when using the keydown event
    // const handleKeyDown = useCallback((event) => {
    //     let {key} = event;

    //     event.preventDefault();
    //     if (key === 'Enter') {
    //         key = '=';
    //     }

    //     if (key === 'Backspace') {
    //         event.preventDefault();
    //         clearLastChar();
    //     } else if (key === 'Clear') {
    //         event.preventDefault();
            
    //         if (displayValue !== '0') {
    //             clearDisplay();
    //         } else {
    //             clearAllDisplay();
    //         }
    //     } else if (key === '.') {
    //         event.preventDefault();
    //         inDot();
    //     } else if (key === '%') {
    //         event.preventDefault();
    //         inPercent();
    //     } else if (key in CalculateWithOperator) {
    //         event.preventDefault();
    //         inOperand(key);
    //     } else if ((/\d/).test(key)) {
    //         event.preventDefault();
    //         inDigit(parseInt(key, 10));
    //     } 

    // }, [CalculateWithOperator, clearLastChar, displayValue, inDigit, inDot, inOperand, inPercent]);
    
    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyDown);
    
    //   return () => {
    //     document.addEventListener('keydown', handleKeyDown);
    //   };
    // }, [handleKeyDown]);
    


    return (
        <div className='calculator-body'>
                <CalculatorDisplay className="display-area" value={displayValue} />
    
                <div className='keypad-area'>
                    <div className='input-area'> 
                        <div className="function-keys">
                            <CalculatorKeys className="key-clear calc-key" action={()=> {clearAllDisplay()}}>{clearText}</CalculatorKeys>
                            <CalculatorKeys className="key-sign calc-key" action={()=> {inSign()}}>±</CalculatorKeys>
                            <CalculatorKeys className="key-percentage calc-key" action={()=> {inPercent()}}>%</CalculatorKeys>
                            <CalculatorKeys className="key-divide calc-key" action={()=> {inOperand('/')}}>÷</CalculatorKeys>
                        </div>
                        <div className="digit-keys">
                            <CalculatorKeys className="key-0 calc-key" style={{width: "160px"}} action={()=> {inDigit(0)}}>0</CalculatorKeys>
                            <CalculatorKeys className="key-dot calc-key" action={()=> {inDot()}}>.</CalculatorKeys>
                            <CalculatorKeys className="key-1 calc-key" action={()=> {inDigit(1)}}>1</CalculatorKeys>
                            <CalculatorKeys className="key-2 calc-key" action={()=> {inDigit(2)}}>2</CalculatorKeys>
                            <CalculatorKeys className="key-3 calc-key" action={()=> {inDigit(3)}}>3</CalculatorKeys>
                            <CalculatorKeys className="key-4 calc-key" action={()=> {inDigit(4)}}>4</CalculatorKeys>
                            <CalculatorKeys className="key-5 calc-key" action={()=> {inDigit(5)}}>5</CalculatorKeys>
                            <CalculatorKeys className="key-6 calc-key" action={()=> {inDigit(6)}}>6</CalculatorKeys>
                            <CalculatorKeys className="key-7 calc-key" action={()=> {inDigit(7)}}>7</CalculatorKeys>
                            <CalculatorKeys className="key-8 calc-key" action={()=> {inDigit(8)}}>8</CalculatorKeys>
                            <CalculatorKeys className="key-9 calc-key" action={()=> {inDigit(9)}}>9</CalculatorKeys>
                        </div>
                    </div>
    
                    <div className="operand-keys">
                        <CalculatorKeys className="key-times calc-key" action={()=> {inOperand('*')}}>X</CalculatorKeys>
                        <CalculatorKeys className="key-minus calc-key" action={()=> {inOperand('-')}}>-</CalculatorKeys>
                        <CalculatorKeys className="key-plus calc-key" action={()=> {inOperand('+')}}>+</CalculatorKeys>
                        <CalculatorKeys className="key-equals calc-key" action={()=> {inOperand('=')}}>=</CalculatorKeys>
                    </div>
                </div>
            </div>
    )
}
