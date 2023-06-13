import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

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
}

export function MovieCard ({ title, date, poster }: MovieCardProps) {
  return (
    <article className='inline-block w-39 sm:w-44'>
      <img
        src={poster}
        alt='Poster'
        className='object-cover object-center rounded h-58 sm:h-66'
      />

      <div className='mt-2 flex flex-col'>
        <strong className='text-sm sm:text-base'>
          {title}
        </strong>

        <span className='text-xs sm:text-sm text-gray-500 uppercase font-bold'>
          {formatDate(date)}
        </span>
      </div>
    </article>
  )
}