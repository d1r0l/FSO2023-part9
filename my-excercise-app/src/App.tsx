interface CourseParts {
  name: string
  exerciseCount: number
}

interface ContentProps {
  courseParts: CourseParts[]
}

interface HeaderProps {
  courseName: string
}

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ]

  const Header = ({ courseName }: HeaderProps): React.JSX.Element => {
    return <h1>{courseName}</h1>
  }

  const Content = ({ courseParts }: ContentProps): React.JSX.Element => {
    return (
      <>
        {courseParts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </>
    )
  }

  const Total = ({ courseParts }: ContentProps): React.JSX.Element => {
    return (
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
