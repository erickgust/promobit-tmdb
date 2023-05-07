import poster from '@/assets/poster.png'
import { Post } from './components/post'
import { Header } from './components/header'
import { Genres } from './components/genres'

function App () {
  return (
    <div>
      <Header />

      <main>
        <Genres />

        <Post
          date='2021-11-12'
          poster={poster}
          title='Homem-Aranha: Sem Volta Para Casa'
        />
      </main>
    </div>
  )
}

export { App }
