import { useState, useEffect } from 'react'
import { DiaryEntry } from './types'
import { getDiaryEntries } from './services/diaryService'
import NewEntryForm from './components/NewEntryForm'
import Diaries from './components/Diaries'

const App = (): React.JSX.Element => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getDiaryEntries().then(response => setDiaries(response))
  }, [])

  const Header = (): React.JSX.Element => {
    return <h1>Diary entries</h1>
  }

  return (
    <div>
      <Header />
      <NewEntryForm diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
