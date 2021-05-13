import {interpolate, spring} from 'remotion';
import {SingleMessageApiResponse} from './Message';

const DURATION_PER_CHARACTER = 0.1;
export const LIKE_DURATION = 4;
const ENTRANCE_TRANSITION_DURATION = 40;
const END_STILL_TIME = 250;

export const getMessageSegments = (
	message: SingleMessageApiResponse
): string[] => {
	return message.message.text.split(' ');
};

export const getMessageSegmentDurations = (
	message: SingleMessageApiResponse
): number[] => {
	return getMessageSegments(message).map(
		(t) => t.length * DURATION_PER_CHARACTER
	);
};

export const getMessageDuration = (
	message: SingleMessageApiResponse
): number => {
	return (
		getMessageSegmentDurations(message).reduce((a, b) => a + b, 0) +
		LIKE_DURATION
	);
};

export const getOpacityForWord = (
	message: SingleMessageApiResponse,
	wordIndex: number,
	frame: number
): number => {
	const charactersBefore = getMessageSegmentDurations(message)
		.slice(0, wordIndex)
		.reduce((a, b) => a + b, 0);
	return interpolate(frame, [charactersBefore, charactersBefore + 4], [0, 1]);
};

export const getMessageDurations = (
	messages: SingleMessageApiResponse[]
): number[] => messages.map((m) => getMessageDuration(m));

export const messageStart = (
	messages: SingleMessageApiResponse[],
	index: number
): number => {
	const durationsBefore = getMessageDurations(messages).slice(0, index);
	return (
		durationsBefore.reduce((a, b) => a + b, 0) +
		durationsBefore.length * ENTRANCE_TRANSITION_DURATION
	);
};

export const messageEntrance = ({
	messages,
	index,
	fps,
	frame,
}: {
	messages: SingleMessageApiResponse[];
	index: number;
	fps: number;
	frame: number;
}): number => {
	return spring({
		fps,
		frame: frame - messageStart(messages, index),
		config: {
			damping: 200,
		},
	});
};

export const getAllMessagesDurations = (
	messages: SingleMessageApiResponse[]
): number => {
	const durations = getMessageDurations(messages);
	return (
		durations.reduce((a, b) => a + b, 0) +
		(messages.length - 1) * ENTRANCE_TRANSITION_DURATION +
		END_STILL_TIME
	);
};
