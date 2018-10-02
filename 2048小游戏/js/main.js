

$(document).ready(function(){
	prepareForMobile();
	newGame();
	$("#bot").click(function() {
		score = 0;
		updateScore(score)
		newGame()
	})
	
	$(".main").swipe({
		swipe:function(event,direction,distance,duration,fingerCount){
			if(direction=="up"){
				if(moveUp()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			}else if(direction=="down"){
				if(moveDown()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			}else if(direction=="left"){
				if(moveLeft()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			}else if(direction=="right"){
				if(moveRight()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			}
		}
	});
})

$(document).keydown(function(event){
	event.preventDefault();
	switch (event.keyCode){
		case 37:
			if(moveLeft()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			break;
		case 38:
			if(moveUp()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			break;
		case 39:
			if(moveRight()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			break;
		case 40:
			if(moveDown()){
				setTimeout("generateOneNumber()",200);
				setTimeout("isGameOver()",250);
			}
			break;
	}
})

function moveLeft(){
	
	if(!canMoveLeft(board)){
		return false;
	}
	
	for(var i=0;i<4;i++){		
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontl(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontl(i,k,j,board)
		 						&&!hasConflited[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
						hasConflited[i][k]=true;
						continue;
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",200);
		return true;
}

function canMoveLeft(){
	
	for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(board[i][j]!=0)
					if(board[i][j-1]==0||board[i][j-1]==board[i][j])
						return true;
		}
	}
	return false;
	
}



function moveUp(){
	
	if(!canMoveUp(board)) {
		return false;
	}
	for(var j = 0; j < 4; j++) {
		for(var i = 1; i < 4; i++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < i; k++) {
					if(board[k][j] == 0 &&
						noBlockVertival(j, k, i, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue
					} else if(board[k][j] == board[i][j] &&
						noBlockVertival(j, k, i, board) && !hasConflited[k][j]) {
						showMoveAnimation(i, j, k, j)
						board[k][j] *= 2;
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflited[k][j] = true;
						continue
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200)
	return true;
	
}

function canMoveUp(){
	
	for(var j=0;j<4;j++){
			for(var i=1;i<4;i++){
				if(board[i][j]!=0)
					if(board[i-1][j]==0||board[i-1][j]==board[i][j])
						return true;
		}
	}
	return false;
	
}

function moveRight(){
	
	if(!canMoveRight()){
		return false;
	}
	
	for(var i=0;i<4;i++){		
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontl(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontl(i,j,k,board)
		 						&&!hasConflited[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
						hasConflited[i][k]=true;
						continue;
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",200);
		return true;
	
}

function canMoveRight(){
	
	for(var j = 0; j < 4; j++) {
		for(var i = 1; i < 4; i++) {
			if(board[i][j] != 0) {
				if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
	
}

function moveDown(){
	
	if(!canMoveDown()){
		return false;
	}
	
	for(var j = 0; j < 4; j++) {
		for(var i = 2; i >= 0; i--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > i; k--) {
					if(board[k][j] == 0 &&
						noBlockVertival(j, k, i, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue
					} else if(board[k][j] == board[i][j] &&
						noBlockVertival(j, i, k, board) && !hasConflited[k][j]) {
						showMoveAnimation(i, j, k, j)
						board[k][j] *= 2;
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflited[k][j] = true;
						continue
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200)
	return true;
}

function canMoveDown(){
	
	for(var j = 0; j < 4; j++) {
		for(var i = 2; i >= 0; i--) {
			if(board[i][j] != 0) {
				if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
	
}


function isGameOver(){
	//如果没有空间且不能移动则游戏结束
	if(nospace(board) && noMove(board)) {
		$(".over").show();
		$(document).click(function() {
			$(".over").hide()
		})
	}
}

//判断能不能移动了
function noMove(board) {
	if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)) {
		return false;
	}
	return true;
}

function newGame(){
	init();
	generateOneNumber();
	generateOneNumber();
}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机取0-3之间的一个值
	var randX = parseInt(Math.floor(Math.random()*4));
	var randY = parseInt(Math.floor(Math.random()*4));
	
	var times = 0;
	while(times<50){
		if(board[randX][randY]==0){
			break;
		}
		randX = parseInt(Math.floor(Math.random()*4));
		randY = parseInt(Math.floor(Math.random()*4));
		times++;
	}
	
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randX=i;
					randY=j;
				}
			}
		}
	}
	//随机取一个数字（2 or 4  概率一半对一半）
	var randomNum=Math.random()<0.5?2:4;
	board[randX][randY] = randomNum;
	
	showNumberWithAnimation(randX,randY,randomNum);
	return true;
}

//判断16个格子中是否有空白区域，没有返回true，有返回false
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//小白或者实习生刚出来的动画
function showNumberWithAnimation(randX,randY,randomNum){
	var numberCell=$("#number_cell_"+randX+"_"+randY);
	numberCell.css("background-color",getNumberBackgroundColor(randomNum));
	numberCell.css("color",getNumberColor(randomNum));
	numberCell.text(getNumberText(randomNum));
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(randX,randY),
		left:getPosLeft(randX,randY)
	},100);
}


function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$("#box_"+i+"_"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	}
	
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflited[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflited[i][j]=false;
		}
	}
	score=0;
	
	updateBoardView();
}


function updateBoardView(){
	$(".number_cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#main").append('<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>')
			var theNumberCell=$('#number_cell_'+i+'_'+j);
			if(board[i][j]==0){
				theNumberCell.css({
					"width":"0",
					"height":"0"
				})
				theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css("left",getPosLeft()+cellSideLength/2);
			}else{
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength);
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(getNumberText(board[i][j]));
				hasConflited[i][j] = false;
			}
			$(".number_cell").css("line-height",cellSideLength+"px");
			$(".number_cell").css("font-size",0.33*cellSideLength);
		}
	}
}

function getPosTop(i,j){
	return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
	return cellSpace+j*(cellSpace+cellSideLength);
}

//主要为切换到移动端项目做准备
function prepareForMobile(){
	if(documentWidth > 500){
		gridContainerWidth=500;
		cellSideLength=100;
		cellSpace=20;
	}
		$("#main").css("width",gridContainerWidth-2*cellSpace);
		$("#main").css("height",gridContainerWidth-2*cellSpace);
		$("#main").css("border-radius",0.1*cellSideLength);
		$("#main").css("padding",cellSpace);

		$(".main_box").css("width",cellSideLength);				
		$(".main_box").css("height",cellSideLength);
		$(".main_box").css("border-radius",0.1*cellSideLength);
}
