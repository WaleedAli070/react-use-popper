import React from 'react'
import styles from './styles.module.css'

type DivProps = React.ComponentPropsWithoutRef<'div'>

export const PopperContainer = React.forwardRef<HTMLDivElement, DivProps>(({ children }, ref) => (
  <div role="tooltip" className={styles.popperContainer} ref={ref}>
    {children}
  </div>
))