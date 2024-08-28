import Address from '@/components/Address/Address'
import FinalProduct from '@/components/FinalProduct/FinalProduct'


function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-5">
        <div className="mt-5"><FinalProduct/></div>
        <div className="mt-5"><Address/></div>
    </div>
  )
}

export default page