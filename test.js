var translate = require('./libs/google-translate-api');
// 
// var api = require('google-translate-api');
// api('中文的撒', {from: 'zh-CN', to: 'en'}).then(res => {
// 	console.log(res);
//     console.log(res.text);
//     //=> Ik spreek Nederlands!
//     console.log(res.from.text.autoCorrected);
//     //=> true
//     console.log(res.from.text.value);
//     //=> I [speak] Dutch!
//     console.log(res.from.text.didYouMean);
//     //=> false
// }).catch(err => {
// 	console.log(err);
// });

async function test() {
    // for (var i = 0; i < 3; i++) {
    //     console.log('Hello')
    //     await sleep(1000)
    //     console.log('world!')
    // }
    [1, 2, 3].forEach(async (item) => {
    	console.log('Hello')
        await sleep(1000)
        console.log('world!')
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// test();
