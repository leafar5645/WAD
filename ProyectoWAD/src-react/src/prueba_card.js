import React from 'react'
import { DragSource } from 'react-dnd'


/**
 * Your Component
 */
function Card({ isDragging, dragSource, text }) {
  const opacity = isDragging ? 0.5 : 1
  return dragSource(<div style={{ opacity }}>{text}</div>)
}

/**
 * Implement the drag source contract.
 */
const cardSource = {
  beginDrag: props => ({ text: props.text }),
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

// Export the wrapped component:
export default DragSource("Card", cardSource, collect)(Card)