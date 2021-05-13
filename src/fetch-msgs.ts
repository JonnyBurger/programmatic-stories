import {messageStart} from './math';
import {SingleMessageApiResponse} from './Message';

export const getDuration = async (messageIds: string[]) => {
	const messages = await Promise.all(
		messageIds.map(async (m) => {
			const response = await fetch(
				`https://bestande.ch/api/chat/messages/${m}`
			);
			const json = await response.json();
			return json.data as SingleMessageApiResponse;
		})
	);

	const entrance = messageStart(messages, messages.length - 1);

	return entrance + 100;
};
