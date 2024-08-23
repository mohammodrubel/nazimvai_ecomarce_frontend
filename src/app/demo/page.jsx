"use client"
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi'
import React from 'react'

function page() {
    const {data} = useFetchAllProductsQuery()
    console.log(data)
  return (
    <div>
        
    </div>
  )
}

export default page