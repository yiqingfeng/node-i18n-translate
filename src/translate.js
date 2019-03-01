/**
 * @description 多语言翻译
 */
const translate = require('google-translate-api');

function translateZh(word, to) {
	return new Promise((resolve, reject) => {
		translate(word, {
			from: 'zh-cn',
			to,
		}).then(text => {
			resolve(text);
		}).catch(err => {
			reject(err);
		});
	});
}

// translate('I spea Dutch!', {from: 'en', to: 'nl'}).then(res => {
//     console.log(res.text);
//     //=> Ik spreek Nederlands!
//     console.log(res.from.text.autoCorrected);
//     //=> true
//     console.log(res.from.text.value);
//     //=> I [speak] Dutch!
//     console.log(res.from.text.didYouMean);
//     //=> false
// }).catch(err => {
//     console.error(err);
// });

// translateZh('这是一个测试', 'en').then(text => {
// 	console.log(text);
// });
// translateZh('这是一个测试', 'zh-TW');

module.convertZh = function convertZh(word, data) {
	return new Promise((resolve, reject) => {
		const keys = Object.keys(data);
		const length = keys.length;
		let i = 0;
		const next = () => {
			if (i === length) {
				return resolve(data);
			}
			translateZh(word, keys[i]).then(text => {
				data[keys[i]] = text;
				// i++；
				next();
			});
		};
		next();
	});
}