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
