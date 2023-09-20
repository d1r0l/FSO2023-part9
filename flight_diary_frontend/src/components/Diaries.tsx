import { DiaryEntry } from '../types'

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

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }): React.JSX.Element => {
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

export default Diaries
