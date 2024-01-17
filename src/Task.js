import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdDeleteOutline,
	MdOutlineColorLens,
} from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { useGlobalContext } from './context';

const Task = ({ id, time, name, completed, color, index }) => {
	const { removeTask, toggleDone } = useGlobalContext();

	return (
		<Draggable
			key={id}
			draggableId={'draggable-' + id}
			index={index}
		>
			{(provided, snapshot) => (
				<li
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={{
						...provided.draggableProps.style,
						boxShadow: snapshot.isDragging
							? '0 0 5rem #666'
							: 'none',
						opacity: snapshot.isDragging
							? '1'
							: provided.draggableProps.style.opacity,
						backgroundColor: color,
					}}
					className={`task ${completed && 'task-done'}`}
				>
					<p>{name}</p>{' '}
					<span style={{ color: 'lightgray', fontSize: 'small' }}>
						{time}
					</span>
					<button onClick={() => toggleDone(id)}>
						{completed ? (
							<MdCheckBox />
						) : (
							<MdCheckBoxOutlineBlank />
						)}
					</button>
					<button onClick={() => removeTask(id)}>
						<MdDeleteOutline />
					</button>
				</li>
			)}
		</Draggable>
	);
};

export default Task;
