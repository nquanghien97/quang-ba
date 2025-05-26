import React from 'react'

interface TextCustomProps {
  text: string
}

function TextCustom(props: TextCustomProps) {

  const { text } = props

  const radius = 800
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 50}`}>
      {/* Hiển thị đường cong (tùy chọn) */}
      <path
        d={`M 10,${radius} a ${radius},${radius} 0 1,0 ${radius * 2},0`}
        fill="none"
        stroke="transparent"
        strokeWidth="1"
        id="curve"
      />

      {/* Văn bản theo đường cong */}
      <text className="fill-[#002A9E]">
        <textPath xlinkHref="#curve" fontSize={radius / 20} textAnchor="middle" startOffset="50%">
          {text}
        </textPath>
      </text>
    </svg>
  )
}

export default TextCustom