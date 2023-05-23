// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const videoPath = req.query.videoPath as string
  try {
    // const videoSize = fs.statSync(videoPath).size
    // const range = req.headers.range || 'bytes=0-'
    // // console.log(rangeParser(videoSize, range))
    // // @ts-ignore
    // const { start, end } = rangeParser(videoSize, range)[0]
    // const videoFileStream = fs.createReadStream(videoPath, { start, end })
    // res.writeHead(206, {
    //   'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    //   'Accept-Ranges': 'bytes',
    //   'Content-Length': end - start + 1,
    //   'Content-Type': 'video/mp4',
    // })
    // videoFileStream.pipe(res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve video.' + videoPath })
  }
}
