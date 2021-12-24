/*
把原本的 node打开浏览器-->浏览器插件签到 改成了 node直接打开浏览器访问签到链接 
所以浏览器插件可以不用了直接在本地node qiandao.js丢后台就行了
目前还没有做出自动获取签到链接的版本，所以记得隔段时间检查一下formhash变了没有
！！！没用chrome的话记得把google-chrome换成自己浏览器的启动命令(或者干脆就换成start)！！！

checkinTime	签到结束的时间，格式：HHmmss (这里设置的是每天23:59:59开始反复签到直到00:00:01)  根据自己网络情况调整
checkinURL	签到的链接，记得定期换(！！！！！改成自己的！！！！！)
*/

const schedule = require('node-schedule')
const req = require('child_process')

let checkinTime = 2
let checkinURL = "https://www.gtloli.gay/plugin.php?id=k_misign:sign&operation=qiandao&formhash=93f4103c&format=empty"

let HHmmss = new Date().toTimeString()
let HH = parseInt(HHmmss.substring(0,2))
let mm = parseInt(HHmmss.substring(3,5))
let ss = parseInt(HHmmss.substring(6,8))
HHmmss = (HH * 10000)+(mm * 100)+ss;
console.log(HH,":",mm,":",ss,",",HHmmss);
HHmmss = (HHmmss == 235959) ? 0 : HHmmss+1;

function setTime(){
	HHmmss = new Date().toTimeString()
	HH = parseInt(HHmmss.substring(0,2))
	mm = parseInt(HHmmss.substring(3,5))
	ss = parseInt(HHmmss.substring(6,8))
	HHmmss = (HH * 10000)+(mm * 100)+ss;
	console.log(HH,":",mm,":",ss,",",HHmmss);
	HHmmss = (HHmmss == 235959) ? 0 : HHmmss+1;
}

console.log("Runing...")
const signTask = () => {
    // 时间格式为'秒 分 时 日 月 年'，* 代表每天/每月/每年   开始签到时间
    schedule.scheduleJob('59 59 23 * * *', () => {
    	//签到（尽量最快速度）
    	req.exec('google-chrome '+checkinURL)
        console.log("-----> \"" + nowTime + "\" -开始签到<-----");
        setTime();
        while(HHmmss < checkinTime){
		req.exec('google-chrome '+checkinURL)
		setTime();
	}
	//领低保
	console.log("-----> \"" + nowTime + "\" -开始领低保<-----");
	req.exec('google-chrome https://www.gtloli.gay/home.php?mod=task&do=apply&id=32')
	req.exec('google-chrome https://www.gtloli.gay/home.php?mod=task&do=apply&id=33')
	setTimeout(function (){
		req.exec('google-chrome https://www.gtloli.gay/home.php?mod=task&do=draw&id=32')
		req.exec('google-chrome https://www.gtloli.gay/home.php?mod=task&do=draw&id=33')
	},1000)
	console.log("-----> \"" + nowTime + "\" -消除低保后2条系统消息<-----");
	setTimeout(function (){
		req.exec('google-chrome https://www.gtloli.gay/home.php?mod=space&do=notice&view=system')
	},5000)
	console.log("-----> \"" + nowTime + "\" -全部完成<-----");
    })
}
signTask()
