import React, { FC, useEffect, useRef, useState } from 'react'
import { PopperContainerProps } from './popper.intefaces'
import { computePopperPosition } from './popper.utils'
import styles from './styles.module.css'

export const PopperContainer: FC<PopperContainerProps> = ({
  children,
  appendTo
}) => {
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({})
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const popperContainerRect = containerRef.current?.getBoundingClientRect()
    const appendToRect = appendTo.getBoundingClientRect()
    if (popperContainerRect) {
      const { top, left } = computePopperPosition(
        appendToRect,
        popperContainerRect
      )
      setContainerStyle({ top, left })
    }
  }, [containerRef])
  return (
    <div
      role='tooltip'
      style={{ ...containerStyle }}
      ref={containerRef}
      className={styles.popperContainer}
    >
      {children}
    </div>
  )
}
