interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string
  kind: 'background'
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: Array<string>
  kind: 'special'
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial

interface ContentProps {
  courseParts: CoursePart[]
}

interface HeaderProps {
  courseName: string
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const App = () => {
  const courseName = 'Half Stack application development'

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group'
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background'
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic'
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special'
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
            <Part part={part} />
          </p>
        ))}
      </>
    )
  }

  const Part = ({ part }: { part: CoursePart }): React.JSX.Element => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <br />
            <i>{part.description}</i>
          </>
        )
      case 'group':
        return (
          <>
            <br />
            {'project excercises: '}
            {part.groupProjectCount}
          </>
        )
      case 'background':
        return (
          <>
            <br />
            <i>{part.description}</i>
            <br />
            {'submit to: '}
            {part.backgroundMaterial}
          </>
        )
      case 'special':
        return (
          <>
            <br />
            <i>{part.description}</i>
            <br />
            {'required skills: '}
            {part.requirements.map(req => {
              return (
                <>
                  {req}
                  {req === part.requirements.at(-1) ? null : ', '}
                </>
              )
            })}
          </>
        )
      default:
        return assertNever(part)
    }
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
