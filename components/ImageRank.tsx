import React from 'react'
import Image from 'next/image'
import { TYPE_RANK } from '@/types/ranks'
import TextCustom from './Text'

interface ImageRankProps {
  // src: string
  // alt: string
  width: number
  height: number
  typeRank: TYPE_RANK
}

function ImageRank(props: ImageRankProps) {
  const { width, height, typeRank } = props

  const typeRankOptions = {
    rank1: '/1.png',
    rank2: '/2.png',
    rank3: '/3.png'
  }

  return (
    <div
      className={`relative mx-auto`}
      style={{ width: `${width}px`, height: `${height}px` }}
      >
      {/* Ảnh nền khung */}
      <Image
        src={typeRankOptions[typeRank]}
        alt={typeRankOptions[typeRank]}
        className="absolute w-full h-full object-contain z-20"
        width={width}
        height={height}
      />

      {/* Ảnh người nằm giữa */}
      <Image
        src="/images.jpg"
        alt="Ảnh người"
        className={`absolute ${typeRank === TYPE_RANK.rank1 ? 'top-1/2' : 'top-[58%]'} left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full object-cover shadow-md z-10`}
        width={width}
        height={height}
      />

      {/* Tên ở ruy băng */}
      <div className="absolute w-[200%] bottom-[4%] left-1/2 -translate-x-1/2 text-center text-black font-semibold text-lg px-2 whitespace-nowrap z-30">
        <TextCustom />
      </div>
    </div>
  )
}

export default ImageRank