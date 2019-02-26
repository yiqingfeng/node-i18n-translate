/**
 * @description 解析 xlsx 文件的数据
 */
const fs = require('fs');
const xlsx = require('node-xlsx');

/**
 * 解析 xlsx 文件数据
 * @param  {String} src 文件路径
 */
exports.parseFile = function parseFile(src) {
    let data = xlsx.parse(fs.readFileSync(src));
    // 取第一张表的数据
    data = data[0].data;
    // 获取各列数据对应的key
    const keys = data[0];
    // 过滤表头信息
    data = data.slice(1);
    return {
        keys,
        data,
    };
}


/**
 * 将 xlsx 数据写入到指定文件中
 */
exports.writeFile = function writeFile(src, data) {
    return new Promise((resolve, reject) => {
    	if (!/.xlsx$/.test(src)) {
    		return reject('写入的目标文件的格式不符合要求： xlsx');
    	}
        const buffer = xlsx.build(data);
        fs.writeFile(src, buffer, err => {
            if (err) {
            	return reject(err);
            }
            resolve();
        });
    });
}