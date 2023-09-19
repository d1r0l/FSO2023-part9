import axios from 'axios'
import { DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3001/api'

export const getDiaries = () => {
  return axios
    .get<DiaryEntry[]>(`${baseUrl}/diaries`)
    .then(response => response.data)
}
