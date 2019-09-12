import React from 'react'
import ReactDOM from 'react-dom'
import { MyApp } from './components/MyApp'

let el = document.getElementById('main-js')
console.log('Hello from start file')

if (el) {
  ReactDOM.render(<MyApp />, el)
}
