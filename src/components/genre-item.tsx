type GenreItemProps = {
  genre: string
}

export function GenreItem ({ genre }: GenreItemProps) {
  return (
    <li>
      <input type='checkbox' id={genre} className='peer hidden' />
      <label htmlFor={genre} className='inline-block text-neutral-700 peer-checked:text-white py-2 cursor-pointer px-4 bg-white rounded peer-checked:bg-yellow-600'>
        {genre}
      </label>
    </li>
  )
}
