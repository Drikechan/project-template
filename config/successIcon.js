let fs = require('fs');
let path = require('path');
class RunSuccessIcon {
    initRunIcon(option={}) {
        let data,iconType,dirs=path.resolve(__dirname,'icon');
        iconType = option.iconType || 'icon';
        let files=fs.readdirSync(dirs);
        let str=files.map(file=>path.join(dirs,file)).filter(file=>file.includes(iconType)).join()
        data=fs.readFileSync(str,'utf-8');
        return data;
    }
    handlerRunConfig(){
        let data;
        if(fs.existsSync(path.resolve(__dirname,'./icon'))){
            let dirs=path.resolve(__dirname,'./icon');
            let files=fs.readdirSync(dirs);
            let file=files.map(file=>path.join(dirs,file)).join();
            data=fs.readFileSync(file,'utf-8');
        }
        return data;
    }
}
let obj=new RunSuccessIcon();
exports.initRunIcon=obj.initRunIcon;
exports.handlerRunConfig=obj.handlerRunConfig;
