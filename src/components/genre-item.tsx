import { ReactComponent as CloseIcon } from '@/assets/icons/close-icon.svg'

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
      <label htmlFor={genreName} className='inline-flex items-center justify-center text-neutral-700 peer-checked:text-white py-2 cursor-pointer px-4 bg-white rounded peer-checked:bg-yellow-600'>
        {genreName}
        {isSelected && (
          <CloseIcon
            className='w-5 h-5 inline-block ml-2'
            aria-label='Remove genre'
          />
        )}
      </label>
    </li>
  )
}
