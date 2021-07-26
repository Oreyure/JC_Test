// 使用腾讯云开发的数据库
const app = cloudbase.init({
	env: "xiaomi-answer-2goch6zbbc11614e"
});

var auth = app.auth();

async function login(){
  await auth.signInAnonymously();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  console.log(loginState.isAnonymous); // true
}

login();

// 加载题目库
let questions = []
app.callFunction({
	name: "XMA-GetQuestions"
})
.then((res) => {
	questions = res.result.questions
	console.log(questions)
});

new Vue({
	el: '#mainapp',
	data: {
		page:0,
		questionPoint:0,
		score:0,
		nowQuestion:{},
	},
  
	methods: {
		
		// 选择选项（判断/换题）
		pickOption:function(index){
			if(index == this.nowQuestion.answer)
				this.score++
			if(this.questionPoint<questions.length)
				this.nowQuestion = questions[this.questionPoint++]
			else
				this.changePage()
		},
		
		// 设置首题，切换到答题页面
		toAnswerPage:function(){
			console.log(questions)
			if(questions){
				this.nowQuestion = questions[this.questionPoint++]
				console.log(this.nowQuestion)
				this.changePage()
			}
		},
		
		
		changePage:function(){
			this.page++;
		}
		
	}
})
