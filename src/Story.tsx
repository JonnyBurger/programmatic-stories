import {useCallback, useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender} from 'remotion';
import {Background} from './Background';
import {Message, SingleMessageApiResponse} from './Message';

export const Story: React.FC<{
	messageIds: string[];
}> = ({messageIds}) => {
	const [handle] = useState(() => delayRender());
	const [messages, setMessages] = useState<null | SingleMessageApiResponse[]>(
		null
	);

	const fetchMessages = useCallback(async () => {
		const messages = await Promise.all(
			messageIds.map(async (m) => {
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

	if (!messages) {
		return null;
	}
	return (
		<div>
			<AbsoluteFill>
				<Background />
				<AbsoluteFill style={{justifyContent: 'center'}}>
					{messages.map((m) => {
						return <Message key={m.message._id} message={m} />;
					})}
				</AbsoluteFill>
			</AbsoluteFill>
		</div>
	);
};
