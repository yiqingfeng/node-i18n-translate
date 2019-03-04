/**
 * 利用谷歌自动翻译
 */
const _ = require('lodash');
const api = require('./api');

function delay() {
	return new Promise(resolve => {
		// 2 - 4 s
		const time = Math.ceil((Math.random() + 1) * 2 * 1000);
		setTimeout(resolve, time);
	});
}

api('啊实打实的', {from: 'zh-CN', to: 'en'}).then(res => {
	console.log(res);
    console.log(res.text);
    //=> Ik spreek Nederlands!
    console.log(res.from.text.autoCorrected);
    //=> true
    console.log(res.from.text.value);
    //=> I [speak] Dutch!
    console.log(res.from.text.didYouMean);
    //=> false
}).catch(err => {
	console.log(err);
});

async function translate(data, options) {
	const list = typeof data === 'string' ? [data] : data;
	const tos = typeof options.to === 'string' ? [options.to] : options.to;
	list.forEach(text => {
		let item = {};
		item[options.from] = text;
		tos.forEach(async (to) => {
			await delay();
			await api.translate(text, _.extend({}, options, {to,})).then();
		});
	});
	// await delay();
	// await api.translate()
	// return new Promise((resolve, reject) => {
	// 	delay()
	// });
};

module.exports.translate = (data, options) => {
	return new Promise((resolve, reject) => {
		delay()
	}); 
};