/**
 * @description 多语言相关处理
 */
const _ = require('lodash');

class Translate {
	constructor(options) {
		this.settings = _.extend({
			entryPath: '',
			zhIndex: 1,
			keyIndex: null,
			outputPath: '',
			autoTranslate: false,
		}, options);
		this.init();
	}
	init() {
		console.log(this.settings);
	}
}

module.exports = Translate;