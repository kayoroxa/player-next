import { Subtitle } from '@/utils/types/subtitle'
import { RefObject, useEffect, useMemo, useState } from 'react'

// function subtitleLacunar(sentence: string) {
//   const words = sentence.split(' ')
//   if (words.length === 0) return ''
//   return words
//     .map(word => {
//       const random = Math.random()
//       console.log('hello')

//       if (random < 0.7) return word
//       return '_'.repeat(word.length)
//     })
//     .join(' ')
// }

const Subtitles = ({
  videoRef,
  subtitles,
  className,
}: {
  videoRef: RefObject<HTMLVideoElement>
  subtitles: Subtitle[]
  className: string
}) => {
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle>()
  const [putLacuna, setPutLacuna] = useState(true)

  useEffect(() => {
    if (!videoRef.current) return
    const getCurrentSubtitle = () => {
      if (!videoRef.current) return
      const currentTime = videoRef.current.currentTime
      const currentSubtitleData = subtitles.find(
        subtitle =>
          currentTime >= subtitle.startSeconds &&
          currentTime <= subtitle.endSeconds
      )
      setCurrentSubtitle(currentSubtitleData)
    }

    videoRef.current.addEventListener('timeupdate', getCurrentSubtitle)

    return () => {
      if (videoRef.current) {
        videoRef?.current?.removeEventListener('timeupdate', getCurrentSubtitle)
      }
    }
  }, [subtitles, videoRef])

  const showSubtitle = useMemo(() => {
    if (!currentSubtitle) return ''
    const words = currentSubtitle.text.replace(/\n/g, ' ').split(' ')
    if (words.length === 0) return ''

    return words
      .map(word => {
        const random = Math.random()

        if (random < 0.3) return word
        return word.replace(/[\w{2}]/gi, '_').replace(/[\w|']/g, '_')
      })
      .join(' ')
  }, [currentSubtitle])

  useEffect(() => {
    // keydown
    if (!videoRef.current) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g') {
        setPutLacuna(prev => !prev)
      }
      if (e.key === 's' && currentSubtitle && videoRef.current) {
        videoRef.current.currentTime = currentSubtitle.startSeconds
      }
      if (e.key.toLowerCase() === 'a') {
        setCurrentSubtitle(prev => {
          const index = subtitles.findIndex(
            subtitle => subtitle.id === prev?.id
          )
          if (!subtitles[index - 1]) return prev
          if (videoRef.current) {
            videoRef.current.currentTime = subtitles[index - 1]?.startSeconds
          }
          return subtitles[index - 1]
        })
      }
      if (e.key.toLowerCase() === 'd') {
        setCurrentSubtitle(prev => {
          const index = subtitles.findIndex(
            subtitle => subtitle.id === prev?.id
          )
          if (!subtitles[index + 1]) return prev
          if (videoRef.current) {
            videoRef.current.currentTime = subtitles[index + 1]?.startSeconds
          }
          return subtitles[index + 1]
        })
      }
    }
    videoRef.current.addEventListener('keydown', handleKeyDown)

    return () => {
      videoRef.current?.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className={className}>
      {
        <p className="">
          {currentSubtitle && putLacuna
            ? showSubtitle
            : currentSubtitle?.text || ''}
        </p>
      }
    </div>
  )
}

export default Subtitles
