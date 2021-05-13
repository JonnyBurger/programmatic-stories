import {useEffect, useState} from 'react';
import {
	Composition,
	continueRender,
	delayRender,
	getInputProps,
} from 'remotion';
import {getDuration} from './fetch-msgs';
import {Story} from './Story';

export const RemotionVideo: React.FC = () => {
	const props = getInputProps();
	const [handle] = useState(() => delayRender());

	const messages = props?.messageIds
		? props.messageIds.split(',')
		: '12697cdc-60cb-4860-9bd5-930c965a7abd,1817905d-a33f-42ec-a0d2-152db5b78325,0ed77e51-11a1-497a-b5fa-63538f6cd0c8'.split(
				','
		  );

	const [duration, setDuration] = useState<number | null>(null);

	useEffect(() => {
		getDuration(messages).then((d) => {
			setDuration(Math.floor(d));
			continueRender(handle);
		});
	}, [handle, messages]);

	return (
		<>
			<Composition
				id="Story"
				component={Story}
				durationInFrames={duration ?? 3 * messages.length * 30}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					messageIds: messages.join(','),
				}}
			/>
		</>
	);
};
