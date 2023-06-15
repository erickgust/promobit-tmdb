import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { ReactComponent as DefaultImage } from '@/assets/icons/default.svg'

function formatDate (date: string) {
  const formattedDate = dayjs(date)
    .locale('pt-br')
    .format('DD MMM YYYY')

  return formattedDate
}

type MovieCardProps = {
  title: string
  date: string
  poster: string
  id: number
}

export function MovieCard ({ title, date, poster, id }: MovieCardProps) {
  const isPosterNull = poster.includes('null')

  return (
    <article className='inline-block w-39 sm:w-44'>
      <Link to={'/' + id}>
        {!isPosterNull ? (
          <img
            src={poster}
            alt={title}
            className='object-cover object-center rounded h-58 sm:h-66'
          />
        ) : (
          <div className='h-58 sm:h-66 bg-gray-100 flex items-center justify-center rounded'>
            <DefaultImage
              className='w-24 sm:w-28'
              aria-label='No poster available'
            />
          </div>
        )}

        <div className='mt-2 flex flex-col'>
          <strong className='text-sm sm:text-base'>
            {title}
          </strong>

          <span className='text-xs sm:text-sm text-gray-500 uppercase font-bold'>
            {formatDate(date)}
          </span>
        </div>
      </Link>
    </article>
  )
}
