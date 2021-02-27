export const Background: React.FC = () => {
	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(to bottom, #7affad, #3be374)',
				padding: 54,
			}}
		>
			<div
				style={{
					flex: 1,
					backgroundColor: 'white',
					padding: 10,
					display: 'flex',
					height: '100%',
					boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
				}}
			/>
		</div>
	);
};
