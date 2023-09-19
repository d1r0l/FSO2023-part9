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
    .catch(error => {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        throw error.response.data
      } else {
        throw error
      }
    })
}
