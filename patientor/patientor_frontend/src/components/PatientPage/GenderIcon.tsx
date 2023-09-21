import { Male, Female, Transgender } from '@mui/icons-material'
import { Gender } from '../../types'

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case 'male':
      return <Male />
    case 'female':
      return <Female />
    case 'other':
      return <Transgender />
    default:
      return null
  }
}

export default GenderIcon
