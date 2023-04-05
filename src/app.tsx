import poster from '@/assets/poster.png'

function App () {
  return (
    <div className='inline-block'>
      <img
        src={poster}
        alt='Poster'
        className='object-cover rounded w-39 h-58 sm:h-66 sm:w-44'
      />

      <div className='mt-2 flex flex-col'>
        <strong>Oi, Alberto</strong>
        <span>12 nov 2021</span>
      </div>
    </div>
  )
}

export { App }
