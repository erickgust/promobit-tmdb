import logo from '@/assets/icons/tmdb.svg'

export function Header () {
  return (
    <header>
      <div className='
        flex justify-center items-center bg-indigo-500 py-4
        sm:pl-28 sm:justify-start
      '>
        <img src={logo} alt='Logo' />
      </div>
    </header>
  )
}
