import { Male, Female, Transgender } from '@mui/icons-material'

const GenderIcon = ({ gender }: { gender: string }) => {
  switch (gender) {
    case 'male':
      return <Male />
    case 'female':
      return <Female />
    default:
      return <Transgender />
  }
}

export default GenderIcon
