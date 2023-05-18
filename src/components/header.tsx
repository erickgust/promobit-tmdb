import logo from '@/assets/icons/tmdb.svg'
import { Link } from 'react-router-dom'

export function Header () {
  return (
    <header>
      <Link
        to='/'
        className='flex justify-center items-center bg-indigo-500 py-4 sm:pl-28 sm:justify-start'
      >
        <img src={logo} alt='Logo' />
      </Link>
    </header>
  )
}
