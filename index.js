const schedule = require('node-schedule')
const req = require('child_process')
const signTask = () => {
    // 设置为每天0:00:00打开首页进行签到
    // 时间格式为'秒 分 时 日 月 年'，* 代表每天/每月/每年
    schedule.scheduleJob('0 0 0 * * *', () => {
        let nowTime = new Date();
        req.exec('start https://www.gtloli.gay/forum.php')
        console.log("----->" + nowTime.toLocaleDateString() + "-开始签到<-----");
    })
}
signTask()
