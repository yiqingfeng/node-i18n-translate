/**
 * @description 获取简体中文对应的key值
 */
const crypto = require('crypto');

// 中文匹配 \u4e00-\u9fa5
const reg = '\\sa-zA-Z0-9\u4e00-\u9fa5\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5';

/**
 * 格式化 key
 * @param  {[String]} key 
 * @return {[String]} 
 */
function formatKey(key) {
    if (!key) return '';
    
    let result = key;
    result = result.replace(/(\{\{(.+)\}\})/g, '*');
    result = result.replace(new RegExp(`[^${reg}]`, 'g'), '*');
    result = result.replace(/(\*(\s+\*)*)+/g, '*');
    result = result.replace(/\s+/g, '');
    return result;
}

/**
 * 将 key 进行加密生成唯一标识 hash
 */
function encrypKey(key) {
    const md5 = crypto.createHash('md5');
    const result = md5.update(key).digest('hex');
    return result.substr(0, 8);
}

module.exports = word => {
    let key = '';
    const w = formatKey(word);

    if (w.length <= 15) {
        key = w;
    } else {
        const prefix = w.substr(0, 15);
        const hash = encrypKey(word);
        key = `${prefix}-${hash}`;
    }
    return key || null;
}