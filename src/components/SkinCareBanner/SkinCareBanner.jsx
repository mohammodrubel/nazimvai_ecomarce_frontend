import { Button } from 'antd';
import React from 'react'
import styles from './SkinCareBanner.module.css'

function SkinCareBanner() {
  return (
    <div className={styles.skncareBanner}>
        <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 justify-between items-center'>
                <div></div>
                <div className='text-center'>
                    <h4 className='font-bold text-[#663130]'>Skincare</h4>
                    <div className='text-2xl sm:text-4xl text-[#F04D2B] md:text-6xl text-center'>Skincare made with <br/> the world finest</div>
                    <p className='my-4 text-[#663130]'>Balance, purify, and heal your skin with Monastery. <br/>
                    Ingredients of the highest quality.</p>
                    <Button className={styles.shopButton}>Shop Now</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SkinCareBanner