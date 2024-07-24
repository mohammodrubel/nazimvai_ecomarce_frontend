import React from 'react'
import { HashLoader } from 'react-spinners'

function Loading() {
  return (
    <div style={{width:'100%',height:"80vh",display:'flex',alignItems:'center'}}>
        <HashLoader style={{color:'#663130'}} />
    </div>
  )
}

export default Loading