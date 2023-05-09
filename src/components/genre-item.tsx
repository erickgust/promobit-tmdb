type GenreItemProps = {
  genreName: string
  isSelected: boolean
  onSelectedGenre: () => void
}

export function GenreItem ({ genreName, isSelected, onSelectedGenre }: GenreItemProps) {
  return (
    <li>
      <input
        type='checkbox'
        id={genreName}
        className='peer hidden'
        checked={isSelected}
        onChange={onSelectedGenre}
      />
      <label htmlFor={genreName} className='inline-block text-neutral-700 peer-checked:text-white py-2 cursor-pointer px-4 bg-white rounded peer-checked:bg-yellow-600'>
        {genreName}
      </label>
    </li>
  )
}
