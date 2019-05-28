import React from "react";
import $ from 'jquery'; 
import { DragSource } from 'react-dnd'
let styles ={border: '1px solid black'};
const itemSource={
	beginDrag(props){
    console.log("hola");
    return props.items},
  isDragging(props, monitor) {
    console.log("moviendo");
    return monitor.getItem().id === props.id
  },

  endDrag(props, monitor, component) {
   
      if(!monitor.didDrop())
      {
      // You can check wshether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
      }
      return;
      //return props.handleDrop(props.items.id);
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
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  }
}
class Item extends React.Component
{
	
constructor(props) {
    super(props);
   
			 }
	

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    
	render() {
    const { isDragging, connectDragSource , item } = this.props;
     let res="Recursos/" + this.props.items.Recurso;
		return connectDragSource ( <div style={styles}> <img className="item-img" src= {res}/> 
    {this.props.items.name}
      </div>
    )
  }
}
export default DragSource ("item", itemSource, collect)(Item);