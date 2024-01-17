import React, { useState, useContext, useRef } from 'react';

const getTasks = () => {
	const tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
	const inputRef = useRef(null);
	const [tasks, setTasks] = useState(getTasks());
	const [alert, setAlert] = useState({ show: false, msg: '' });
	const [name, setName] = useState('');
	const [filter, setFilter] = useState('all');
	const [location, setLocation] = useState({});
	const refContainer = useRef(null);

	const removeTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		showAlert(true, 'Task Removed.');
	};

	const toggleDone = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
		showAlert(true, 'Task State Changed.');
	};

	const showAlert = (show, msg) => {
		setAlert({ show, msg });
	};

	const showColors = (e, id) => {
		const { top, right } = e.target.getBoundingClientRect();
		setLocation({ top, right, id });
	};

	return (
		<AppContext.Provider
			value={{
				tasks,
				setTasks,
				removeTask,
				toggleDone,
				refContainer,
				alert,
				showAlert,
				name,
				setName,
				getTasks,
				filter,
				setFilter,
				inputRef,
				location,
				setLocation,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
