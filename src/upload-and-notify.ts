import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
// @ts-expect-error slackbot doesn't have types
import Slackbot from 'slackbot';
import xns from 'xns';

dotenv.config();

xns(async () => {
	const s3 = new AWS.S3({
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
	});
	const result = await new Promise<AWS.S3.ManagedUpload.SendData>(
		(resolve, reject) => {
			s3.upload(
				{
					Bucket: 'bestande-stories',
					Key: `video-${Date.now()}.mp4`,
					Body: fs.readFileSync(path.join(__dirname, '..', 'out.mp4')),
					ACL: 'public-read',
				},
				(err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				}
			);
		}
	);
	const slackbot = process.env.SLACK_TOKEN
		? new Slackbot('hackercompany', process.env.SLACK_TOKEN)
		: null;
	slackbot.send(
		'#bestande-stories',
		['New story available:', result.Location].join('\n')
	);
	await new Promise((resolve) => setTimeout(resolve, 2000));
});
