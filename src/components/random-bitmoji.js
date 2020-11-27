import React from 'react'
import bitmojis from '../images/bitmojis'
import PropTypes from 'prop-types'

function RandomBitmoji({ width, ...props }) {
  console.log('bitmojis...', bitmojis)

  const getRandomBitmoji = () => Math.floor(Math.random() * bitmojis.length)
  const [bitmoji, setBitmoji] = React.useState(bitmojis[getRandomBitmoji()])
  return (
    <span {...props}>
      <img
        src={bitmoji}
        alt="random bitmoji"
        style={{ width: width || 50, cursor: 'pointer' }}
        onClick={() => setBitmoji(bitmojis[getRandomBitmoji()])}
      />
    </span>
  )
}

RandomBitmoji.propTypes = {
  width: PropTypes.number,
}

export default RandomBitmoji
