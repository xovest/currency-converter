import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=f798e5b8808f0895d825ddf3cd935580&format=1';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency)
      });
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <div className="equals">=</div>
      <CurrencyRow currencyOptions={currencyOptions} />
    </>
  );
}

export default App;
