import Image from 'next/image'
import style from './Navigation.module.css'
import meghamenu1 from '../../assets/meghamenuimg/1 (1).jpg'
import meghamenu2 from '../../assets/meghamenuimg/1 (2).jpg'
import meghamenu3 from '../../assets/meghamenuimg/1 (3).jpg'
import meghamenu4 from '../../assets/meghamenuimg/1 (4).jpg'

function ShopSubMenu() {
    return (
        <div className={style.meghaMenu}>
            <div className='grid  gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                <div className='relative'>
                    <div className={style.imageContainer}>
                        <Image src={meghamenu1} className="mx-auto" width={300} height={300} alt='cosmetics-image' />
                        <div className={`${style.content} ${style.hiddenContent}`}>Shop Now</div>
                    </div>
                </div>
                <div className='relative'>
                    <div className={style.imageContainer}>
                        <Image src={meghamenu2} className="mx-auto" width={300} height={300} alt='cosmetics-image' />
                        <div className={`${style.content} ${style.hiddenContent}`}>Shop Now</div>
                    </div>
                </div>
                <div className='relative'>
                    <div className={style.imageContainer}>
                        <Image src={meghamenu3} className="mx-auto" width={300} height={300} alt='cosmetics-image' />
                        <div className={`${style.content} ${style.hiddenContent}`}>Shop Now</div>
                    </div>
                </div>
                <div className='relative'>
                    <div className={style.imageContainer}>
                        <Image src={meghamenu4} className="mx-auto" width={300} height={300} alt='cosmetics-image' />
                        <div className={`${style.content} ${style.hiddenContent}`}>Shop Now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSubMenu