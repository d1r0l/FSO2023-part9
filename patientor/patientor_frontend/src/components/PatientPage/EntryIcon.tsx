import { LocalHospital, MonitorHeart, Work } from '@mui/icons-material'
const EntryIcon = ({ type }: { type: string }) => {
  const style = { fontSize: 12 }

  switch (type) {
    case 'Hospital':
      return <LocalHospital style={style} />
    case 'HealthCheck':
      return <MonitorHeart style={style} />
    case 'OccupationalHealthcare':
      return <Work style={style} />
    default:
      return null
  }
}

export default EntryIcon
