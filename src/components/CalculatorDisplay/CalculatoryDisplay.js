export default function CalculatorDisplay(props) {
    const {value, className} = props
    let formattedValue = parseFloat(value).toLocaleString(navigator.language, {
        useGrouping: true,
        maximumFractionDigits: 6
    });

    const match = value.match(/\.\d*?(0*)$/);
    if (match)
        formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0];

    return (
        <div className={className}>
            
            <h1>{formattedValue}</h1>
        </div>
    )
}