import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3001/api'

export const getDiaryEntries = () => {
  return axios
    .get<DiaryEntry[]>(`${baseUrl}/diaries`)
    .then(response => response.data)
}

export const createDiaryEntry = (newEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${baseUrl}/diaries`, newEntry)
    .then(response => response.data)
}
