import {format} from 'date-fns';
import {Img} from 'remotion';
import styled from 'styled-components';
import {GiftedAvatar} from './Avatar';
import heart from './heart.svg';

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
	font-family: --Arial, Helvetica, sans-serif;
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

export const Message: React.FC<{message: SingleMessageApiResponse}> = ({
	message,
}) => {
	const likeArray = ['jonny', 'burger', 'three'];
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
					<div>{message.message.text}</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 8,
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
