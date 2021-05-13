import {useCallback, useEffect, useState} from 'react';
import {
	AbsoluteFill,
	Audio,
	continueRender,
	delayRender,
	interpolate,
	measureSpring,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Background} from './Background';
import {messageEntrance, messageStart} from './math';
import {Message, SingleMessageApiResponse} from './Message';
import collapse from './sounds/collapse.mp3';
import audio1 from './sounds/tab1.mp3';
import audio2 from './sounds/tab2.mp3';
import audio3 from './sounds/tab3.mp3';

console.log('hi');

export const Story: React.FC<{
	messageIds: string;
}> = ({messageIds}) => {
	const {fps, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const [handle] = useState(() => delayRender());
	const [messages, setMessages] = useState<null | SingleMessageApiResponse[]>(
		null
	);

	const fetchMessages = useCallback(async () => {
		const messages = await Promise.all(
			messageIds.split(',').map(async (m) => {
				const response = await fetch(
					`https://bestande.ch/api/chat/messages/${m}`
				);
				const json = await response.json();
				return json.data as SingleMessageApiResponse;
			})
		);
		setMessages(messages);

		continueRender(handle);
	}, [handle, messageIds]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages, handle]);

	const fadeOut = spring({
		fps,
		frame:
			frame -
			durationInFrames +
			measureSpring({
				fps,
				config: {
					damping: 200,
				},
			}),
		config: {
			damping: 200,
		},
		from: 1,
		to: 0,
	});

	if (!messages) {
		return null;
	}

	return (
		<div>
			<AbsoluteFill>
				<Background />
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						opacity: interpolate(fadeOut, [0.2, 1], [0, 1]),
						transform: `translateY(${interpolate(
							fadeOut,
							[0, 1],
							[-600, 0]
						)}px)`,
					}}
				>
					{messages.map((m, i) => {
						const entrance = messageEntrance({
							messages,
							fps,
							frame,
							index: i,
						});
						return (
							<>
								<div
									style={{
										transform: `translateY(${interpolate(
											entrance,
											[0, 1],
											[300, 0]
										)}px)`,
										opacity: entrance,
									}}
								>
									<Message
										key={m.message._id}
										delay={messageStart(messages, i)}
										message={m}
									/>
								</div>
								<Sequence
									from={Math.floor(messageStart(messages, i)) + 10}
									durationInFrames={Infinity}
								>
									<Audio src={[audio1, audio2, audio3][i % 3]} />
								</Sequence>
							</>
						);
					})}
				</AbsoluteFill>
				<Sequence from={durationInFrames - 20} durationInFrames={Infinity}>
					<Audio src={collapse} />
				</Sequence>
			</AbsoluteFill>
		</div>
	);
};
