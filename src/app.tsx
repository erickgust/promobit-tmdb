import poster from '@/assets/poster.png'
import { Post } from './components/post'
import { Header } from './components/header'

function App () {
  return (
    <div>
      <Header />

      <Post
        date='2021-11-12'
        poster={poster}
        title='Homem-Aranha: Sem Volta Para Casa'
      />
    </div>
  )
}

export { App }
