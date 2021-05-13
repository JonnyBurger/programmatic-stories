import {darken} from 'polished';
import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {Img} from 'remotion';
import {getAvatarInitials} from './get-avatar-initials';
import {getImageUrl} from './get-image-url';
import {User} from './Message';

export const BLUE = darken(0.1, '#3498db');
export const ORANGE = '#f39c12';
export const GREEN = '#2ecc71';
export const RED = '#e74c3c';

const Colors = {
	backgroundTransparent: 'transparent',
	carrot: ORANGE,
	emerald: GREEN,
	peterRiver: BLUE,
	wisteria: '#8e44ad',
	alizarin: '#e74c3c',
	turquoise: '#1abc9c',
	midnightBlue: '#2c3e50',
};

const {
	carrot,
	emerald,
	peterRiver,
	wisteria,
	alizarin,
	turquoise,
	midnightBlue,
} = Colors;

const styles = {
	avatarStyle: {
		justifyContent: 'center' as const,
		alignItems: 'center' as const,
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	noAvatar: {
		height: 0,
		width: 100,
	},
	avatarTransparent: {
		backgroundColor: Colors.backgroundTransparent,
	},
	textStyle: {
		color: 'white',
		fontSize: 50,
		backgroundColor: Colors.backgroundTransparent,
		fontWeight: '500' as const,
	},
};

interface GiftedAvatarProps {
	user: User | null;
	onPress?(props: any): void;
}

const IMGIX_DOMAIN = 'https://img.bestande.ch';

export const GiftedAvatar: React.FC<GiftedAvatarProps> = (props) => {
	const userName = props.user?.username || '';

	const avatarName = useMemo(() => {
		return getAvatarInitials(userName);
	}, [userName]);

	const avatarColor = useMemo(() => {
		let sumChars = 0;
		for (let i = 0; i < userName.length; i += 1) {
			sumChars += userName.charCodeAt(i);
		}

		const colors = [
			carrot,
			emerald,
			peterRiver,
			wisteria,
			alizarin,
			turquoise,
			midnightBlue,
		];

		return colors[sumChars % colors.length];
	}, [userName]);

	const renderAvatar = useCallback((user: User) => {
		if (typeof user.avatar === 'string') {
			return (
				<Img
					src={getImageUrl({
						cdn_identifier: user.avatar,
						height: 200,
						width: 200,
						crop: null,
					})}
					style={styles.avatarStyle}
				/>
			);
		}
		return null;
	}, []);

	if (!props.user) {
		return <View style={styles.noAvatar} />;
	}
	if (props.user.avatar) {
		return renderAvatar(props.user);
	}

	return (
		<View style={[styles.avatarStyle, {backgroundColor: avatarColor}]}>
			<Text style={styles.textStyle}>{avatarName}</Text>
		</View>
	);
};
