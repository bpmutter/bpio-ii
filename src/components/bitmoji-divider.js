import React from 'react'
import styles from './bitmoji-divider.module.css'

export default function BitmojiDivider() {
  return (
    <div class={styles.bitmojiDivider}>
      <img src="bitmoji-neutral.png" class={styles.bitmoji} />
      <img src="bitmoji-neutral.png" class={styles.bitmoji} />
      <img src="bitmoji-neutral.png" class={styles.bitmoji} />
    </div>
  )
}
