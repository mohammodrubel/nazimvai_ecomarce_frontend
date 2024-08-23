import { Input } from 'antd';
import React from 'react'
import style from './Navigation.module.css'

function SearchWithDropdowns() {
  return (
    <div className={style.search}>
      <Input placeholder='Search Your Product'></Input>
    </div>
  )
}

export default SearchWithDropdowns