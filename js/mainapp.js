var questions = []
$.ajax({
	url: 'https://xiaomi-answer-2goch6zbbc11614e-1301214601.ap-shanghai.app.tcloudbase.com/GetQuestions',
	type: 'get',
	dataType: 'json',
	success: function (data) {
		console.log(data)
		questions = data.questions
	},
	error: function(xhr, errorType, error) {
		console.log('error')
	}
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
			if(questions){
				console.log(questions)
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
