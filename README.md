# wetube   

>### express 설치
**npm init을 통해 node 프로그램을 시작하고, package.json 생성한다.**   
<br>

**package.json만으로도 npm install을 할 시, 필요한 모듈을 다 설치한다.**   
(*협업할 때, 굳이 node_modules을 공유안해도 됨.*)   

<br>

----------------------------------------   

<br>

>### express(서버) 실행   
**express를 import 하고, 실행할 변수를 만든다.**     

```
// express를 express변수에 import
const express = require('express');

// 변수 app에 express를 담아 실행하게끔 한다.
const app = express();
```   
<br>   

**package.json에 scripts 항목을 추가하여, 실행을 간단하게 한다.**    

<br>

----------------------------------------   

<br>

>### 라우팅 (app.get)   

**app의 listen 메소드로 콜백함수를 담는다.**   

```
// 포트명과 리스닝이 성공했을 때 실행될 콜백 함수
app.listen(PORT, handleListening);

------함수(예시)-------
function handleListening(){
    console.log(`Listening on : http://localhost:${PORT}`)
}
```   
<br> 

**app.get에 쓰인 함수로 사용자가 임의의 경로로 들어왔을 때, 실행될 것을 결정한다.**      

**라우터안에 경로와 핸들러(함수)를 담는다.**   

```
// 경로가 '/' 인 라우터 
app.get("/", handleHome);

// 경로가 '/profile' 인 라우터
app.get("/profile", handleProfile)
```   

<br>

----------------------------------------   

<br>

>### babel   

**ES6를 쓰고 있지만, 하위 버전에 대한 호환을 위해 사용한다.**   

**.babelrc에 설정내용 저장.**   

*babel preset중 env이용*   

```
.babelrc내용

{
    "presets" : ["@babel/preset-env"]

}
```  
<br>  

**프로젝트말고 개발환경을 위해 다운받는 패키지는 -D를 붙인다.**   

**package.json의 devDependencies에서 확인 가능.**   


*서버를 자동으로 새로고침 해주는 패키지(nodemon)*   

```
"devDependencies": {
    "nodemon": "^2.0.6"

}

```

<br>

----------------------------------------   

<br>


>### middleware

**일반적으로 유저와 마지막 응답사이에 존재하는 것.**   

**라우팅하기전 미들웨어 함수를 배치하는 경우가 많다.**   

```
---미들웨어 함수---

const betweenHome = (req, res, next) => {
    console.log("i'm between");
    next();

}

---미들웨어 함수 호출---
app.use(betweenHome);

app.get("/", handleHome);

app.get("/profile", handleProfile)
```   

*위와 같은 경우에는 모든 라우팅 전에 미들웨어 함수가 호출된다.*   

<br>

```
app.get("/", handleHome);

app.use(betweenHome);

app.get("/profile", handleProfile)

```   

*하지만, 이번 경우에는 profile로 가기전에만 실행된다.*   

**next() 메소드를 이용하여 앱의 각각 루트에 맞는 middleware를 배치.**   

<br>

**morgan -> logging 지원하는 미들웨어**   

**helmet -> 보안 기능 담당**   
*(아직은 이정도만...)*   

<br>

># body-parser   

**body-parser는 node.js의 모듈이다.**   

**post 메소드의 request의 body를 편리하게 추출하게 한다.**      

**express에는 내장되어 있으므로, import할 필요가 없음.**    

*그밖에도 다양한 인코딩 기능 지원.*   

```
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));
```   

<br>

----------------------------------------   

<br>



