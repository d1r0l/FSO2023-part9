import { Favorite } from '@mui/icons-material'
const EntryIcon = ({ healthCheckRating }: { healthCheckRating: number }) => {
  const style = { fontSize: 12, color: '' }

  switch (healthCheckRating) {
    case 0:
      style.color = 'green'
      return <Favorite style={style} />
    case 1:
      style.color = 'yellow'
      return <Favorite style={style} />
    case 2:
      style.color = 'orange'
      return <Favorite style={style} />
    case 3:
      style.color = 'red'
      return <Favorite style={style} />
    default:
      return null
  }
}

export default EntryIcon
