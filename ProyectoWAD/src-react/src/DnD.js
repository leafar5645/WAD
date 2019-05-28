import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Item from './Item';
import DragTarget from './DragTarget';

 class DnD extends React.Component
{
	
	
		 constructor(props) {
    super(props);
	this.state ={
		items:[ 
			{id:1 ,name:"Item 1", Recurso:"imagen.jpg" },
			{id:2 ,name:"Item 2", Recurso:"descarga.jpg" }],
			 }
			}
			TodosI()
			{
				let items=this.state.items;
				let conItem=[];
				console.log(items.length);
				for(let i=0; i<items.length;i++)
				{
					console.log("entre");
					let option =<Item key={i}  items={items[i]} /* handleDrop={(id) => this.deleteItem(id)}*/ />;
					conItem.push(option);
				}
				
				return conItem;
			}
	deleteItem(id)
	{
		console.log("delete" + id);
		this.setState(prevState => {let items=prevState.items;
		const index= items.findIndex(item=> item.id==id);
		items.splice(index, 1);
		return {items};
		} );
	}
		
	render()
	{
		
		return(
	<div className="drag">
	{this.TodosI()}
		<br/>
		
		soy el 1<DragTarget id="1"  handleDrop={(id) => this.deleteItem(id)} /> 
		<br/>
		
		soy el 2<DragTarget id="2"  handleDrop={(id) => this.deleteItem(id)} /> 
		</div>		
		
		
		);
	}
		
	
	
}
export default DragDropContext(HTML5Backend)(DnD);