import { RadioBtnProps } from '../types'

const RadioBtnGroup = ({
  name,
  state,
  setState,
  values
}: RadioBtnProps): React.JSX.Element => {
  const handleChange = (event: React.FormEvent) => {
    setState((event.target as HTMLInputElement).value)
  }

  return (
    <>
      {values.map(value => {
        return (
          <span key={value}>
            <input
              type='radio'
              radioGroup={name}
              id={name + '-radio-' + value}
              value={value}
              checked={state === value}
              onChange={handleChange}
            />
            <label htmlFor={name + '-radio-' + value}>{value}</label>
          </span>
        )
      })}
    </>
  )
}

export default RadioBtnGroup
