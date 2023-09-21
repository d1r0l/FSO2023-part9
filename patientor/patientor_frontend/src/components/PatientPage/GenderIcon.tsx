import { Male, Female, Transgender } from '@mui/icons-material'
import { Gender } from '../../types'

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <Male />
    case Gender.Female:
      return <Female />
    case Gender.Other:
      return <Transgender />
    default:
      return null
  }
}

export default GenderIcon
