type CircularProgressProps = {
  size: number
  percent: number
}

export function CircularProgress ({ size, percent }: CircularProgressProps) {
  const strokeWidth = 6
  const radius = (size / 2) - (strokeWidth * 2)
  const circumference = radius * 2 * Math.PI
  const offset = circumference - percent / 100 * circumference

  return (
    <div className='relative inline-flex items-center justify-center overflow-hidden rounded-full w-fit'>
      <svg width={size} height={size} className='transform -rotate-90'>
        <circle
          strokeWidth={strokeWidth}
          className='text-[#ffffff19]'
          fill='currentColor'
          r={radius + strokeWidth / 2}
          cx={size / 2}
          cy={size / 2}
        />

        <circle
          strokeWidth={strokeWidth}
          className='text-green-500 transition-all duration-300 ease-in-out'
          stroke='currentColor'
          fill='transparent'
          strokeLinecap='round'
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className='absolute text-base text-green-500 font-bold'>
        {percent}%
      </span>
    </div>
  )
}
