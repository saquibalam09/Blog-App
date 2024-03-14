import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [loading , setLoading] = useEffect(true);
  const dispatch = useDispatch();
  return (
    <>
      <h1>A Blog App with Apprite</h1>
    </>
  )
}

export default App
