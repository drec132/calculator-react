export default function CalculatorKeys(props) {
    const {action, className} = props;
    return (
        <button 
            onClick={action} 
            className={className} 
            {...props} />
    )
}