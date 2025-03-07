import axios from 'axios'

const pexelsApi = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: 'pdfnTk6Mp5wRvSn9YQFUGg3noqNV746CAkm898rmMeJMoRkksZIKc5T4'
  }
})

export const searchImages = async (query: string, perPage: number = 1) => {
  try {
    const response = await pexelsApi.get('/search', {
      params: {
        query,
        per_page: perPage,
        locale: 'tr-TR'
      }
    })
    return response.data.photos
  } catch (error) {
    console.error('Pexels API hatası:', error)
    return []
  }
}

export const downloadImage = async (imageUrl: string, fileName: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'blob' })
    const blob = new Blob([response.data], { type: 'image/jpeg' })
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Görsel indirme hatası:', error)
  }
} 