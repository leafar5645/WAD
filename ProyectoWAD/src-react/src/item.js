import React from "react";
import $ from 'jquery'; 
import { DragSource } from 'react-dnd'
const itemSource={
	beginDrag(props){return props.isReady},
isDragging(props, monitor) {
    return monitor.getItem().id === props.id
  },
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return
	}
	 const item = monitor.getItem()

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult()

    // This is a good place to call some Flux action
    //CardActions.moveCardToList(item.id, dropResult.listId)
  },
}



/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  }
}
export class item extends React.Component
{
	
constructor(props) {
    super(props);
   
			 }
	

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props
	render() {
		return connectDragSource <div className="item"><img className="item-img" src="descarga.png"/> 
		{isDragging && ' (and I am being dragged now)'}</div>
	}
}
export default DragSource("item", itemSource, collect)(item)