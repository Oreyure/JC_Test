// 使用腾讯云开发的数据库
const app = cloudbase.init({
	env: "xiaomi-answer-2goch6zbbc11614e"
});

new Vue({
	el: '#mainapp',
	data: {
		xmid:"",
		page:0,
		
		questionPoint:0,
		questions:[],
		nowQuestion:{},
		score:0,
		
		showPop:false
	},
  
	methods: {
		// 选择选项（判断/换题）
		pickOption:function(index){
			if(index == this.nowQuestion.answer)
				this.score++
			if(this.questionPoint<this.questions.length)
				this.nowQuestion = this.questions[this.questionPoint++]
			else
				this.page++
		},
		
		// 切换到答题页面
		toAnswerPage:function(){
			if(true){
				app.callFunction({
					name: "XMA-GetQuestions"
				})
				.then((res) => {
					this.questions = res.result.questions
					this.nowQuestion = this.questions[this.questionPoint++]
					this.page++
				});
			}else{
				// 如果没登陆则登录
			}
		},
		
		// 抽奖
		doDraw:function(){
			// 这里调用抽奖的云函数
			// 抽奖时录入信息
			app.callFunction({
				name: "XMA-GetQuestions"
			})
			.then((res) => {
				this.showPop = true
			});
		},
		
		hideDrawPanel:function(){
			this.showPop = false;
		}
	}
})
