import React from 'react';
import { DropTarget } from 'react-dnd';
let styles ={border: '1px solid black'};
function collect(connect , monitor){
    return {connectDropTarget:connect.dropTarget(),
            hovered:monitor.isOver(),
            item: monitor.getItem(),
    }
}
const itemDragTarjet={
drop(props , monitor , component){

  
const dragIndex = monitor.getItem().id;
const hoverIndex= props.id;
console.log("voy " + dragIndex);
if(dragIndex==hoverIndex)
{
    console.log("correcto");
    return props.handleDrop(monitor.getItem().id);
}
}

}
class DragTarget extends React.Component{


    render(){
        const {connectDropTarget, hovered , item }= this.props;
        const backgroundColor = hovered ? 'lightgreen' : 'white';
        return connectDropTarget(
          <div className="targets" style={{background: backgroundColor}} >
                Target
          </div>  
        );

    }

}
export default DropTarget('item' , itemDragTarjet , collect)(DragTarget);