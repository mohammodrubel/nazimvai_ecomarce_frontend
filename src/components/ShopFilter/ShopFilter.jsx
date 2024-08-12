import {FilterOutlined} from '@ant-design/icons';

function ShopFilter() {
    
    return (
        <div className='grid bg-slate-50 mt-3 p-4 justify-between gap-5 h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto'>
            <div>
                <h3 className='font-bold text-2xl'>Sort by</h3>
                <ul>
                    <li className='text-gray-500 cursor-pointer'>Sort by popularity</li>
                    <li className='text-gray-500 cursor-pointer'>Sort by average rating</li>
                    <li className='text-gray-500 cursor-pointer'>Sort by latest</li>
                    <li className='text-gray-500 cursor-pointer'>Sort by price: low to high</li>
                    <li className='text-gray-500 cursor-pointer'>Sort by price: high to low</li>
                </ul>
            </div>
            <div>
                <h3 className='font-bold text-2xl'> <FilterOutlined /> Filter by price</h3>
                <ul>
                    <ul>
                        <li className='text-gray-500 cursor-pointer'>All</li>
                        <li className='text-gray-500 cursor-pointer'>100.00 - 200.00</li>
                        <li className='text-gray-500 cursor-pointer'>300.00 - 400.00</li>
                        <li className='text-gray-500 cursor-pointer'>500.00 - 600.00</li>
                        <li className='text-gray-500 cursor-pointer'>700.00 - 800.00</li>
                        <li className='text-gray-500 cursor-pointer'>800.00 - 900.00</li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}

export default ShopFilter