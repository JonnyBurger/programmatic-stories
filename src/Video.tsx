import {Composition} from 'remotion';
import {Story} from './Story';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Story"
				component={Story}
				durationInFrames={7 * 30}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					messageIds: [
						'b077588c-488f-458c-bf5a-33585850c3ae',
						'dcd83c57-aa47-45a2-b41d-0bd8d3f95724',
					],
				}}
			/>
		</>
	);
};
