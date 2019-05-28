import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import {Card} from './prueba_card.js'
export class DnD extends React.Component
{
		 constructor(props) {
    super(props);
    
			 }
	
	
	render()
	{
		
		return(
	<div className="drag">
			hola
			<br/>
			
		</div>		
		
		
		);
	}
		
	
	
}
export default DragDropContext(HTML5Backend)(DnD)