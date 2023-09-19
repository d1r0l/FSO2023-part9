import { useState, useEffect } from 'react'
import { DiaryEntry } from './types'
import { getDiaries } from './services/diaryService'

const App = (): React.JSX.Element => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getDiaries().then(response => setDiaries(response))
  }, [])

  const Header = (): React.JSX.Element => {
    return <h1>Diary entries</h1>
  }

  const Diaries = ({
    diaries
  }: {
    diaries: DiaryEntry[]
  }): React.JSX.Element => {
    return (
      <>
        {diaries.map((entry, index) => {
          return (
            <div key={index}>
              <Entry entry={entry} />
            </div>
          )
        })}
      </>
    )
  }

  const Entry = ({ entry }: { entry: DiaryEntry }) => {
    return (
      <>
        <h2>{entry.date}</h2>
        <p>
          {'comment' in entry ? entry.comment : null}
          <br />
          {'Visibility: '}
          {entry.visibility}
          <br />
          {'Weather: '}
          {entry.weather}
        </p>
      </>
    )
  }

  return (
    <div>
      <Header />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
