import { useState } from 'react'
import { DiaryEntry, NewDiaryEntry, NewEntryFormProps } from '../types'
import { createDiaryEntry } from '../services/diaryService'
import RadioBtnGroup from './RadioBtnGroup'

const NewEntryForm = ({
  diaries,
  setDiaries
}: NewEntryFormProps): React.JSX.Element => {
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
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <br />
        {'visibility: '}
        <RadioBtnGroup
          name='visibility'
          setState={setVisibility}
          state={visibility}
          values={['great', 'good', 'ok', 'poor']}
        />
        <br />
        {'weather: '}
        <RadioBtnGroup
          name='weather'
          setState={setWeather}
          state={weather}
          values={['sunny', 'rainy', 'cloudy', 'stormy', 'windy']}
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

export default NewEntryForm
