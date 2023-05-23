import Subtitles from '@/components/Subtitle'
import { Subtitle } from '@/utils/types/subtitle'
import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [mainPath, setMainPath] = useState(
    // 'King Richard (2021) [720p] [WEBRip] [YTS.MX]'
    'M:/series/King Richard (2021) [720p] [WEBRip] [YTS.MX]'
  )

  const { data } = useQuery<{
    videoPath: string
    subtitleData: Subtitle[]
  }>('folder', () =>
    fetch(`/api/readFolder?folderPath=${mainPath}`).then(res => res.json())
  )

  // mutate

  // const { mutate: mutateFolder } = useMutation((folderPath: string) =>
  //   fetch(`/api/createFolder?folderPath=${folderPath}`).then(res => res.json())
  // )

  // useEffect(() => {
  //   mutateFolder(mainPath)
  // }, [mainPath, mutateFolder])

  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <div className="relative ">
        {data?.videoPath && (
          <video
            controls
            ref={videoRef}
            style={{ objectFit: 'contain' }}
            className="w-screen h-screen object-cover"
          >
            <source
              className=""
              src={`http://localhost:9999/${
                'King Richard (2021) [720p] [WEBRip] [YTS.MX]' +
                '/' +
                data?.videoPath
              }`}
              // src={`/api/video?videoPath=${mainPath + '/' + data?.videoPath}`}
              type="video/mp4"
            />
          </video>
        )}
        <Subtitles
          videoRef={videoRef}
          subtitles={data?.subtitleData || []}
          className="absolute m-auto ml-0 mr-0 w-full text-center bottom-40 text-5xl px-[400px]"
        />
      </div>
      {/* {JSON.stringify(mainPath + '/' + data?.videoPath)} */}
    </main>
  )
}
