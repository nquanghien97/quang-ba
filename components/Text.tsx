import React from 'react'

function TextCustom() {
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
      <text className="fill-[#825e1f]">
        <textPath xlinkHref="#curve" fontSize={radius / 20} textAnchor="middle" startOffset="50%">
          W123 - Nguyễn Văn A
        </textPath>
      </text>
    </svg>
  )
}

export default TextCustom