




import  { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [exchangeRates, setExchangeRates] = useState({}); 
    const [loading, setLoading] = useState(true); 

  
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/a3dc5751439bf9f4e0135c2d/latest/USD');
                const data = await response.json();
                setExchangeRates(data.conversion_rates); 
                setLoading(false); 
            } 
            catch (error) {
                console.error("Error fetching exchange rates:", error);
            }
        };


        fetchExchangeRates();
    }, []);

    const currencyOptions = Object.keys(exchangeRates); 

    const handleConvert = (e) => {
        e.preventDefault();
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
        setConvertedAmount(amount * rate);
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="currency-convert">
            <div className="convert-label">
                {loading ? (
                    <p>Loading exchange rates...</p>
                ) : (
                    <form className="form-section" onSubmit={handleConvert}>
                        <div className="from-convert">
                            <label className="form-label">From</label>
                            <input
                                className='Input'
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="from-select">
                                <select
                                    className='sel'
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                >
                                    {currencyOptions.map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="button" className='BUTTON' onClick={handleSwap}>
                            Swap
                        </button>

                        <div className="to-convert">
                            <label className="form-label">To</label>
                            <input
                                className='Input'
                                type="number"
                                readOnly
                                value={convertedAmount.toFixed(2)}
                            />
                            <div className="from-select">
                                <select
                                    className='sel'
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                >
                                    {currencyOptions.map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button className='btn' type="submit">
                            Convert
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default App;
