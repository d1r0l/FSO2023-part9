export interface DiaryEntry {
  id: number
  date: string
  weather: string
  visibility: string
  comment?: string
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export interface NewEntryFormProps {
  diaries: DiaryEntry[]
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

export interface RadioBtnProps {
  name: string
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  values: string[]
}
