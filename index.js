/**
 * @description 多语言相关处理
 */
const _ = require('lodash');
const xlsx = require('./src/xlsx');
const getZhKey = require('./src/zh-key');
const translateZh = require('./src/translate');

class Translate {
    constructor(options) {
        this.settings = _.extend({
            entryPath: '',
            zhIndex: 1,
            keyIndex: null,
            outputPath: '',
            autoTranslate: false,
        }, options);
        if (this.validateSettings()) {
            this.init();
        }
    }
    init() {
        const {
            entryPath,
            zhIndex,
            keyIndex,
            outputPath,
            autoTranslate,
        } = this.settings;
        let {
            keys,
            data
        } = xlsx.parseFile(entryPath);
        // 判断是否需要生成中文key
        if (keyIndex !== null) {
            this.setZhKey(data, zhIndex, keyIndex);
        }
        // 判断是否需要进行自动翻译繁体和英文
        if (autoTranslate) {
            this.translateZh(data, zhIndex);
        }

        data = [keys].concat(data);
        xlsx.writeFile(outputPath, [{
            name: '多语言',
            data,
        }]).then(() => {
            console.log(`任务已完成，已输出到${outputPath}`);
        }).catch(err => {
            console.log(err);
        });
    }
    validateSettings() {
        const {
            entryPath,
            zhIndex,
            keyIndex,
            outputPath,
        } = this.settings;

        if (!entryPath) {
            throw new Error('No entryPath!');
            return false;
        }

        if (!zhIndex) {
            throw new Error('No zhIndex!');
            return false;
        }

        if (!outputPath) {
            throw new Error('No outputPath!');
            return false;
        }
        return true;
    }
    // 设置中文key
    setZhKey(data, zhIndex, keyIndex) {
        data.forEach(item => {
            item[keyIndex] = getZhKey(item[zhIndex]);
        });
    }
    // 设置翻译中文
    translateZh(data, zhIndex) {
        translateZh()
    }
}

module.exports = Translate;

// const https = require('https');

let url = 'https://translate.google.cn/translate_a/single?client=webapp&sl=zh-CN&tl=en&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=2&ssel=0&tsel=0&kc=2&tk=872070.777708&q=%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%B5%8B%E8%AF%95%E5%95%8A';

const got = require('got');
got.get(url)
    .then(function(res) {
        console.log(res.body);
    }).catch(function(err) {
        var e;
        e = new Error();
        if (err.statusCode !== undefined && err.statusCode !== 200) {
            e.code = 'BAD_REQUEST';
        } else {
            e.code = 'BAD_NETWORK';
        }
        throw e;
    });