import poster from '@/assets/poster.png'

function App () {
  return (
    <div className='inline-block w-39 sm:w-44'>
      <img
        src={poster}
        alt='Poster'
        className='object-cover rounded h-58 sm:h-66'
      />

      <div className='mt-2 flex flex-col'>
        <strong className='text-sm sm:text-base'>
          Homem-Aranha: Sem Volta Para Casa
        </strong>

        <span className='text-xs sm:text-sm text-gray-500 uppercase'>
          12 nov 2021
        </span>
      </div>
    </div>
  )
}

export { App }
