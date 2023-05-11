import { Genres } from '@/components/genres'
import { Header } from '@/components/header'
import { Post } from '@/components/post'
import poster from '@/assets/poster.png'

export function Home () {
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
