import React, { FC } from 'react'
import styles from './styles.module.css'

export const PopperContainer: FC = ({ children }) => {
  return (
    <div role='tooltip' className={styles.popperContainer}>
      {children}
    </div>
  )
}
