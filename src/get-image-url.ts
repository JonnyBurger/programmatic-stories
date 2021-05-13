import memoize from 'lodash/memoize';
import pickBy from 'lodash/pickBy';
import qs from 'qs';

const IMGIX_DOMAIN = 'https://img.bestande.ch';

export const getCdnUrlWithOptions = (
	domain: string = IMGIX_DOMAIN,
	cdn_identifier: string,
	options: Record<string, string | number | null | undefined>
): string => {
	return `${domain}/${cdn_identifier}?${qs.stringify(pickBy(options))}`;
};

export const getImageUrl = memoize(
	({
		height,
		width,
		cdn_identifier,
		format,
		crop,
		domain = IMGIX_DOMAIN,
		fit = 'crop',
	}: {
		height: number | 'auto';
		width: number | 'auto';
		cdn_identifier: string;
		crop: 'faces' | null;
		format?: string;
		domain?: string;
		fit?: 'crop' | 'clamp';
	}): string => {
		const options = {
			w: width,
			h: height,
			crop,
			fit,
			fm: format,
			auto: 'format',
			q: 50,
		};
		return getCdnUrlWithOptions(domain, cdn_identifier, options);
	}
);
