import React from 'react'
import styles from './bitmoji-divider.module.css'
import bitmoji from '../images/bitmoji-neutral.png'

export default function BitmojiDivider() {
  return (
    <div class={styles.bitmojiDivider}>
      <img src={bitmoji} class={styles.bitmoji} />
      <img src={bitmoji} class={styles.bitmoji} />
      <img src={bitmoji} class={styles.bitmoji} />
    </div>
  )
}
