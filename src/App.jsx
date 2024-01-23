import { useEffect, useState} from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

  const [amount, setAmount] = useState("") //Before amount
  const [convertedAmount, setConvertedAmount] = useState("") //After amount

  const [from, setFrom] = useState("usd") //From Currency type
  const [to, setTo] = useState("inr")  //   To Currency type

  const currencyInfo = useCurrencyInfo(from)
   //returns conversion list on the basis of From Currency type
//   ex-
//   from = usd
//     currencyInfo : 
//     inr: 83.11472546
//     inv: 0.030222748
//     iost: 115.21312492
//     iota: 4.39003968

  const options = Object.keys(currencyInfo) 

//   console.log("this is currencyInfo ",currencyInfo)
//   console.log("this is options ",options)

// converting the amount into another currency amount & setting it up
 const convert = () => {
  setConvertedAmount(amount * currencyInfo[to])
 }


//Swapping {amount, convertedAmount, before & after currency types}
const swap = () => {
    // console.log( "Before swap: " ,from,to, amount, convertedAmount) ;
    setFrom(to)
    setTo(from) 
    setConvertedAmount(amount)
    setAmount(convertedAmount)
    
  }


  

// Just to check after swap state
// useEffect(() => {
//     console.log("After state updates:", from, to, amount, convertedAmount);
//   }, [from, to, amount, convertedAmount]); // Include state variables in dependency array
  



 return (
  <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
          backgroundImage: `url('https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
  >
      <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      convert()
                     
                  }}
              >
                  <div className="w-full mb-1">
                      <InputBox
                          label="From"
                          amount={amount}
                          currencyOptions={options}
                          onCurrencyChange={(currency)=> 
                          setFrom(currency)
                          }
                          onAmountChange={(amount) => 
                          setAmount(amount)}
                          selectCurrency={from}
                      />
                  </div>
                  <div className="relative w-full h-0.5">
                      <button
                          type="button"
                          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                          onClick={swap}
                      >
                          SWAP
                      </button>
                  </div>
                  <div className="w-full mt-1 mb-4">
                      <InputBox
                          label="To"
                          amount={convertedAmount}
                          currencyOptions={options}
                          onCurrencyChange={(currency)=> 
                          setTo(currency)}
                          selectCurrency={to}
                          amountDisable
                          
                      />
                  </div>


                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                      Convert {from.toUpperCase()} to {to.toUpperCase()}
                  </button>
              </form>
          </div>
      </div>
  </div>
);
}

export default App
