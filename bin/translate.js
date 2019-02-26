#!/usr/bin/env node

const npath = require('path');
const program = require('commander');
const Translate = require('../index');

program
    .version(require('../package').version)
    .option('-k, --key-index <index>', '中文key所属列', /^(\d)+$/i)
    .option('-z, --zh-index <index>', '简体中文所属列', /^(\d)+$/i, 1)
    .option('-r, --replace-file', '是否直接替换原文件')
    .option('-t, --translate-auto', '是否自动替换中英文')
    .usage('<command> [options]')
    .command('translate <path>', '自动处理多语言中的key和翻译')
    .action(function(path, cmd) {
    	console.log(`开始处理${path}`);
    	new Translate(getParams(path, cmd));
    })
    .parse(process.argv);

function getParams(path, cmd) {
	const entryPath = npath.resolve(__dirname, '../', path);
	const outputPath = cmd.replaceFile ? entryPath : npath.resolve(__dirname, '../output.xlsx');
	return {
		entryPath,
		zhIndex: cmd.zhIndex,
		keyIndex: cmd.keyIndex || null,
		outputPath,
		autoTranslate: !!cmd.translateAuto,
	}
}