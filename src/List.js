import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useGlobalContext } from './context';
import Task from './Task';

const List = () => {
	const { tasks, filter } = useGlobalContext();

	let filtered = [...tasks];

	switch (filter) {
		case 'all':
			filtered = [...tasks];
			break;
		case 'completed':
			filtered = tasks.filter((task) => task.completed);
			break;
		case 'uncompleted':
			filtered = tasks.filter((task) => !task.completed);
			break;
		default:
			filtered = [...tasks];
			break;
	}

	return (
		<Droppable droppableId='droppable-1'>
			{(provided, snapshot) => (
				<ul
					className='tasks-wrapper'
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{filtered.map((task, i) => (
						<Task
							key={task.id}
							{...task}
							index={i}
						/>
					))}
					{provided.placeholder}
				</ul>
			)}
		</Droppable>
	);
};

export default List;
