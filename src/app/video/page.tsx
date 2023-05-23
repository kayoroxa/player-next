import fs from 'fs'

export default function page() {
  const video = fs

  return (
    <video
      controls
      // ref={videoRef}
      style={{ objectFit: 'contain' }}
      className="w-screen h-screen object-cover"
    >
      <source
        className=""
        src={
          'M:/series/King Richard (2021) [720p] [WEBRip] [YTS.MX]/King.Richard.2021.720p.WEBRip.x264.AAC-[YTS.MX].mp4'
        }
        type="video/mp4"
      />
    </video>
  )
}
