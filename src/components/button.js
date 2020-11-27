import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.css'
function Button({ href, rel, fontSize, target, children, ...props }) {
  return (
    <span {...props}>
      <a className={styles.button} href={href} rel={rel}>
        <span
          className={styles.buttonText}
          style={{ fontSize: fontSize || 14 }}
        >
          {children}
        </span>
      </a>
    </span>
  )
}

Button.propTypes = {
  href: PropTypes.string,
  rel: PropTypes.string,
  fontSize: PropTypes.number,
  target: PropTypes.string,
}
export default Button
