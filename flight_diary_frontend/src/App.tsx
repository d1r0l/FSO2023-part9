import { useState, useEffect } from 'react'
import { DiaryEntry, NewDiaryEntry } from './types'
import { getDiaryEntries, createDiaryEntry } from './services/diaryService'

const App = (): React.JSX.Element => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getDiaryEntries().then(response => setDiaries(response))
  }, [])

  const Header = (): React.JSX.Element => {
    return <h1>Diary entries</h1>
  }

  // let timeout: NodeJS.Timeout

  const NewEntryForm = (): React.JSX.Element => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [errorVisible, setErrorVisible] = useState<boolean>(false)
    const [timer, setTimer] = useState<NodeJS.Timeout>()

    const popupError = (message: string) => {
      clearTimeout(timer)
      setErrorMessage(message)
      setErrorVisible(true)
      setTimer(setTimeout(() => setErrorVisible(false), 5000))
    }

    const emptyForm = () => {
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault()
      const newEntry: NewDiaryEntry = {
        date: date,
        weather: weather,
        visibility: visibility
      }
      if (comment !== '') newEntry.comment = comment
      try {
        const respondedEntry: DiaryEntry = await createDiaryEntry(newEntry)
        setDiaries([...diaries, respondedEntry])
        emptyForm()
      } catch (error) {
        if (typeof error === 'string') {
          popupError(error)
        } else {
          popupError('Something went wrong.')
        }
      }
    }

    return (
      <div>
        <h2>Add new entry</h2>
        {errorVisible && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {'date: '}
          <input
            type='text'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <br />
          {'visibility: '}
          <input
            type='text'
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
          />
          <br />
          {'weather: '}
          <input
            type='text'
            value={weather}
            onChange={e => setWeather(e.target.value)}
          />
          <br />
          {'comment: '}
          <input
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <br />
          <button type='submit'> add </button>
        </form>
      </div>
    )
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
      <NewEntryForm />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
