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
			{id:2 ,name:"Item 2", Recurso:"descarga.jpg" },
			{id:3 , name:"item3", Recurso:"preso.mp4" }],
		objetivos:[
			{id:1 , name:"taget1", Recurso:"imagen.jpg" },
			{id:2 , name:"taget2", Recurso:"descarga.jpg" },
			{id:3 , name:"taget3", Recurso:"preso.mp4" }],	
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
					let br =<br/>
					conItem.push(option);
					conItem.push(br);
					
				}
				
				return conItem;
			}
			TodosT()
			{
				let obj=this.state.objetivos;
				let conItem2=[];
				let targetsdesorcen=[];
				let z=0;
				let existe=false;
				for(let i=0;i<obj.length;i++)
				{
					targetsdesorcen[i]=-1;
				}
				while(z<obj.length)
				{	
					let randomM=Math.floor(Math.random()*(obj.length));
					//console.log(randomM);
					for(let p=0;p<obj.length;p++)
					{
						if(targetsdesorcen[p]===randomM){existe=true}
					}	
					if(existe===false){targetsdesorcen[z]=randomM; z++;}
					else{existe=false}

				}
				console.log(targetsdesorcen);
				for(let i=0; i<obj.length;i++)
				{
					let envia=(obj[targetsdesorcen[i]]);
					let enviaid=obj[targetsdesorcen[i]].id;
					console.log(enviaid);
					let option = <DragTarget items={envia} id={enviaid}   handleDrop={(id) => this.deleteItem(id)} /> 
					let br =<br/>
					conItem2.push(option);
					conItem2.push(br);
					
				}
				
				return conItem2;
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
		let styles= {float: "left"};
		let styles2= {float: "right"};
		let styledrag={backgroundColor:"aqua"};
		return(
	<div className="drag" style={styledrag}>
		<div className="container-items" style={styles}>
			{this.TodosI()}
		</div>
		
		<div className="container-targets" style={styles2}>		
			{this.TodosT()}
		</div>
	
		
	</div>		
		
		
		);
	}
		
	
	
}
export default DragDropContext(HTML5Backend)(DnD);