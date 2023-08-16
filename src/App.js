import './App.css'
import {useState} from 'react'
import PulseLoader from "react-spinners/PulseLoader"


const App = () => {
  const [userValue, setUserValue] = useState('')
  const [displayText,setDispalyText] = useState("")
  const [loading,setLoading] = useState(null)
  const [error,setError] = useState("")

  const getKeyWords = async event => {
    
    let userEnteredValue = event.target.value
    if (event.key === 'Enter' && userEnteredValue) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userEnteredValue}),
      }
      
      setUserValue("")
      setDispalyText("")
      setLoading(true)
      setError("")
      try{
        const response = await fetch('http://localhost:3001/chat', options)
       const data = await response.json()
      if (response.ok){
         console.log(data)
         setDispalyText(data.result)

      }else{
        setError("An error occurred while fetching data.")
         
      }
      }catch(error){
        setError("An error occurred while processing your request.")
      }
     setLoading(false)
    }
  }

  return (
    <div>
      <div className="app-container">
        <h1 className="ask-me-title">Ask Me</h1>
        <h1 className="story-title">anything ?</h1>
        <div className="user-input-form-container">
          <input
            className="user-input"
            type="text"
            placeholder="How can I help you ?"
            onKeyDown={getKeyWords}
            value={userValue}
            onChange={e => setUserValue(e.target.value)}
            
          />
        </div>
        <div className="story-container">
          <div className="loader">
            <PulseLoader
              color="#ff6161"
              loading={loading}
              size={8}
              margin={4}
              speedMultiplier={0.8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          {error ? <p className='error-keyword-msg'>{error}</p> : 
          <p className='story-des'>{displayText}</p> }
        </div>
      </div>

    </div>
  )
}

export default App