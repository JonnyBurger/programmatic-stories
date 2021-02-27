export const getAvatarInitials = (username: string): string => {
	if (username.match(/boomer/i)) {
		return '💥';
	}
	if (username.match(/hänger/i)) {
		return '🎮';
	}
	if (username.match(/asvz/i)) {
		return '🏋️';
	}
	if (username.match(/influencer/i)) {
		return '🤳';
	}
	if (username.match(/einstein/i)) {
		return '🧑‍🔬';
	}
	if (username.match(/avocado/i)) {
		return '🥑';
	}
	if (username.match(/woman/i)) {
		return '👩';
	}
	if (username.match(/girl/i)) {
		return '👧';
	}
	if (username.match(/professor/i)) {
		return '👨‍🏫';
	}
	if (username.match(/bqm/i)) {
		return '🍻';
	}
	if (username.match(/winniepooh/i)) {
		return '🐻';
	}
	if (username.match(/döner/i)) {
		return '🥙';
	}
	if (username.match(/kebab/i)) {
		return '🥙';
	}
	if (username.match(/kebap/i)) {
		return '🥙';
	}
	if (username.match(/chiller/i)) {
		return '⛱';
	}
	if (username.match(/kermit/i)) {
		return '🐸';
	}
	if (username.match(/420/i)) {
		return '🍁';
	}
	if (username.match(/orange/i)) {
		return '🍊';
	}
	if (username.match(/abc/i)) {
		return '🔤';
	}
	if (username.match(/zürch/i)) {
		return '🏙';
	}
	if (username.match(/zurich/i)) {
		return '🏙';
	}
	if (username.match(/uzh/i)) {
		return '🏫';
	}
	if (username.match(/banana/i)) {
		return '🍌';
	}
	if (username.match(/studi/i)) {
		return '🎓';
	}
	if (username.match(/bachelor/i)) {
		return '🎓';
	}
	if (username.match(/Iamfirst/i)) {
		return '🥇';
	}
	if (username.match(/biendli/i)) {
		return '🐝';
	}
	if (username.match(/2pac/i)) {
		return '👨🏿‍🦲';
	}
	const name = username.toUpperCase().split(' ');
	if (name.length === 1) {
		return `${name[0].charAt(0)}`;
	} else if (name.length > 1) {
		return `${name[0].charAt(0)}${name[1].charAt(0)}`;
	} else {
		return '';
	}
};
