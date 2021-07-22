module.exports = {
    devServer:{
		host:'localhost',
		port:8080,
		open:true,
        proxy:{
          '/': {
				target:'http://39.106.127.16:6793',
				//target: 'http://39.106.31.26:8289',//设置你调用的接口域名和端口号 别忘了加http
				changeOrigin: true,    //这里true表示实现跨域
				websockets: true,
				secure: false, // 如果是https接口，需要配置这个参数
				pathRewrite: {
				'^/':'/'
				}
			}
		}
	}
}