// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Subtitle } from '@/utils/types/subtitle'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import srtParser2 from 'srt-parser-2'
var parser = new srtParser2()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const folderPath = req.query.folderPath as string

  var parseSrt = (path?: string) => {
    if (!path) return
    const str = fs.readFileSync(folderPath + '/' + path, 'utf-8')
    if (!str) return
    return parser.fromSrt(str)
  }

  try {
    const folderNames = fs.readdirSync(folderPath)
    const subtitle = parseSrt(
      folderNames.find(p => p.endsWith('.srt'))
    )?.reduce((acc, cur) => {
      if (acc.length === 0) return [cur]
      const last = acc[acc.length - 1]
      const lastEnd = last.endSeconds

      if (cur.startSeconds - lastEnd < 3 && last.text.length < 80) {
        acc.pop()
        acc.push({
          ...last,
          endSeconds: cur.endSeconds,
          text: last.text + ' ' + cur.text,
        })
      } else {
        acc.push(cur)
      }

      return acc
    }, [] as Subtitle[])

    res.status(200).json({
      videoPath: folderNames.find(
        p =>
          p.endsWith('.mp4') ||
          p.endsWith('.mkv') ||
          p.endsWith('.webm') ||
          p.endsWith('.mov')
      ),

      subtitleData: subtitle,
    })
    // res.status(200).json(folderNames.filter(p => !p.endsWith('.parts')))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve folders.' })
  }
}
