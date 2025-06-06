import { useState } from 'react'

export const useImageConverter = () => {
  const [result, setImage] = useState('')

  const base64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(setImage(reader.result as string))
      reader.onerror = () => reject(reader.abort())
    })
  }

  const clear = () => setImage('')

  return { result, base64, clear }
}
