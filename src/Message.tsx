import {format} from 'date-fns';
import {Img, interpolate, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import {GiftedAvatar} from './Avatar';
import heart from './heart.svg';
import {getMessageDuration, getOpacityForWord, LIKE_DURATION} from './math';

export type User = {
	username: string;
	id: string;
	avatar: string | null;
	joined: number;
	lastUsernameChange: number;
	admin: boolean;
	verified?: boolean;
};

export type ChatMessage = {
	_id: string;
	text: string;
	createdAt: number;
	uni_identifier: string;
	university: 'UZH';
	userId: string;
	system?: boolean;
	likes?: string[];
	quotes?: string;
};

export type SingleMessageApiResponse = {
	message: ChatMessage;
	user: User;
	usersWhoLiked: User[];
};

const Container = styled.div`
	font-size: 45px;
	line-height: 1.3;
	margin-left: 100px;
	margin-right: 100px;
	font-family: Arial, Helvetica, sans-serif;
	margin-bottom: 50px;
	margin-top: 50px;
`;

const Spacer = styled.div`
	width: 30px;
`;

const Username = styled.div`
	font-weight: bold;
	font-size: 0.8em;
	margin-bottom: 9px;
`;

const Time = styled.span`
	color: gray;
	font-size: 0.9em;
	font-weight: normal;
`;

const Heart = styled(Img)`
	width: ${342 * 0.09}px;
	height: ${315 * 0.09}px;
`;

const LikesLabel = styled.div`
	color: rgba(0, 0, 0, 0.2);
	font-size: 0.9em;
`;

export const Message: React.FC<{
	message: SingleMessageApiResponse;
	delay: number;
}> = ({delay, message}) => {
	const frame = useCurrentFrame();
	const likeArray = message.usersWhoLiked.map((m) => m.username);
	const words = message.message.text.split(' ');
	const wordOpacity = (i: number) =>
		getOpacityForWord(message, i, frame - delay);
	const totalDuration = getMessageDuration(message);
	const likesOpacity = interpolate(
		frame - delay,
		[totalDuration - LIKE_DURATION, totalDuration],
		[0, 1]
	);
	return (
		<Container>
			<div style={{flexDirection: 'row', display: 'flex'}}>
				<GiftedAvatar user={message.user} />
				<Spacer />
				<div style={{flex: 1}}>
					<Username>
						{message.user.username}{' '}
						<Time>{format(message.message.createdAt, 'HH:mm')}</Time>
					</Username>
					<div>
						{words.map((w, i) => {
							return (
								<span key={i} style={{opacity: wordOpacity(i)}}>
									{w}{' '}
								</span>
							);
						})}
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 8,
							opacity: likesOpacity,
						}}
					>
						<Heart src={heart} />
						<div style={{width: 15}} />
						{likeArray.length > 0 ? (
							<LikesLabel>
								{likeArray.length > 2
									? likeArray[0] +
									  ' + ' +
									  String(likeArray.length - 1) +
									  ' ' +
									  'others'
									: likeArray.join(', ')}
							</LikesLabel>
						) : null}
					</div>
				</div>
			</div>
		</Container>
	);
};
