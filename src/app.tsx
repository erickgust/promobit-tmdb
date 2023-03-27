import { ReactNode, useState } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick: () => void
}

function Button ({ children, onClick }: ButtonProps) {
  return (
    <button
      className='text-3xl font-bold'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function App () {
  const [counter, setCounter] = useState(0)

  function handleIncrement () {
    setCounter(counter => counter + 1)
  }

  function handleDecrement () {
    setCounter(counter => counter - 1)
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold'>{counter}</h1>

      <div className='flex gap-4'>
        <Button onClick={handleDecrement}>-</Button>
        <Button onClick={handleIncrement}>+</Button>
      </div>
    </div>
  )
}

export { App }
