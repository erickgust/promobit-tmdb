type GenreItemProps = {
  genre: string
}

export function GenreItem ({ genre }: GenreItemProps) {
  return (
    <li className='inline-block text-neutral-700'>
      <input type='checkbox' id={genre} className='peer hidden' />
      <label htmlFor={genre} className='peer-checked:text-white py-1 px-4 bg-white rounded peer-checked:bg-yellow-600'>
        {genre}
      </label>
    </li>
  )
}
