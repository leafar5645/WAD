import React from "react";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Item from './Item';
import DragTarget from './DragTarget';

 class DnD extends React.Component
{
	constructor(props) 
	{
		super(props);
		var items= JSON.parse( JSON.stringify( this.props.items ) );
		this.state =
		{
		items:this.props.items,
		objetivos:this.props.objetivos,
		itemsBase: items
		}
		this.Reiniciar=this.Reiniciar.bind(this);
	}
	Reiniciar()
	{
		
		var itms= JSON.parse( JSON.stringify(this.state.itemsBase) );
		this.setState({items:itms});
		sessionStorage.setItem("RU"+this.props.id,2);//valor de inicio
	}
	TodosI()
		{
				let items=this.state.items;
				let conItem=[];
				//console.log(items.length);
				for(let i=0; i<items.length;i++)
				{
					
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
					//console.log(enviaid);
					let option = <DragTarget items={envia} id={enviaid}   handleDrop={(id) => this.deleteItem(id)} handleDropBad={(id) => this.deleteItemMal(id)} /> 
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
		//para calificar si esta correctamente contestado
		if(this.state.items.length==0)
		{
			if(sessionStorage.getItem("RU"+this.props.id)!=0)
			sessionStorage.setItem("RU"+this.props.id,1);
		}
	}
	deleteItemMal(id)
	{
		//console.log("delete" + id);
		this.setState(prevState => {let items=prevState.items;
		const index= items.findIndex(item=> item.id==id);
		items.splice(index, 1);
		return {items};
		} );
		sessionStorage.setItem("RU"+this.props.id,0);
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
		<div>
		<button onClick={this.Reiniciar}>Reiniciar</button>
		</div>
	
		
	</div>		
		
		
		);
	}
		
	
	
}
export default DragDropContext(HTML5Backend)(DnD);