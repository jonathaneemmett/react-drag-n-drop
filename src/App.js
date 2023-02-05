import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './App.css';

export const sqData = ['item1', 'item2', 'item3', 'item4', 'item5'];

function App() {
	const [items, setItems] = useState(sqData);
	const [dragged, setDragged] = useState(null);

	function onDragStart(e, index) {
		let draggedItem = items[index];
		setDragged(draggedItem);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', e.target.parentNode);
		e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
	}

	function onDragEnd(e) {
		e.target.style.opacity = '1';
		e.target.style.backgroundColor = 'transparent';
		setDragged(null);
	}

	function onDragOver(e, index) {
		e.preventDefault();
		e.target.style.backgroundColor = '#424242';
		const draggedOverItem = items[index];
		if (dragged === draggedOverItem) {
			e.target.style.opacity = '0';
			return;
		}

		let itemsCopy = items.filter((item) => item !== dragged) || [];
		itemsCopy.splice(index, 0, dragged);
		setItems(itemsCopy);
	}

	function onDragLeave(e) {
		e.target.style.backgroundColor = 'transparent';
	}

	function onDrop(e) {
		e.preventDefault();
		e.target.style.backgroundColor = 'transparent';
	}

	return (
		<div className='App'>
			<h2 className='list__header'>React Drag-N-Drop Demo</h2>
			<p>Move items to desired location</p>
			<ul>
				{items.map((item, index) => {
					return (
						<li key={item} className='list__item'>
							{index + 1}: {item}
						</li>
					);
				})}
			</ul>
			<ul>
				{items.map((item, index) => {
					return (
						<li
							key={item}
							className='drag__item'
							onDragOver={(e) => onDragOver(e, index)}
							onDragLeave={onDragLeave}
							onDrop={onDragEnd}>
							<div
								className='draggable'
								key={index}
								draggable
								onDragStart={(e) => onDragStart(e, index)}
								onDragOver={(e) => e.preventDefault()}>
								<FaBars />
							</div>
							<span className='item'>{item}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
