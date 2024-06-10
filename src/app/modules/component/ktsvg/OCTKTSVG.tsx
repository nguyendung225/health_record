import React from 'react'
import SVG from 'react-inlinesvg'

type TSVGProps = {
  className?: string
  path: string
  svgClassName?: string
}

const KTSVG: React.FC<TSVGProps> = ({ className = '', path, svgClassName = 'mh-50px' }) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={path} className={svgClassName} />
    </span>
  )
}

export default KTSVG 
