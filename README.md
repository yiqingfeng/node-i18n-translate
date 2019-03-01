## node-i18n-translate

多语言自动翻译，用于国际化处理

### 使用

快速使用：

```
npx github:yiqingfeng/node-i18n-translate D:\mine\node\node-i18n-translate\i18n.xlsx -k 0 -z 1
```

> **注意：**
>
> 使用 npx 形式时，文件路径
>
> 不要使用相对路径，英文此时的相对路径是相对 npx 所在位置的

常规使用：

```
git clone https://github.com/yiqingfeng/node-i18n-translate.git
cd node-i18n-translate
npm install
npm start
node ./bin/translate.js ./i18n.xlsx -k 0 -z 1
```


### 项目结构

```
.
├── /bin/                       # 命令配置
├── /src/                       # 源文件
├── /node_modules/              # 第三方依赖库
│── READMD.md                   # 文档
│── package.json                # 项目包说明
└── index.js                    # 入口文件
```