import style from './pageHeader.module.css'

function PageHeader({ title }) {
  return (
    <div className={`font-bold text-2xl sm:text-4xl md:text-6xl  capitalize ${style.background}`}>
      {title}
    </div>
  )
}

export default PageHeader