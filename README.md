# wetube - node.js Cloning   

>## Error  

<br>

>#### *video재생에 관한 문제(helmet 보안문제)*   

[1] app.use( helmet({ contentSecurityPolicy: false })); 로 변경

[2] main.pug에 meta(http-equiv="Content-Security-Policy" content="default-src *") 추가

<br>

>#### *mongoDB server 실행 문제*   

[1] /var/lib/mongodb의 디렉토리가 파일 생성 권한이 없고, 사용자도 다르기에 생긴 문제

[2] sudo chown -R mongodb:mongodb mongodb로 권한설정 해주기.



<br>
<br>

>## express 설치
**npm init을 통해 node 프로그램을 시작하고, package.json 생성한다.**   
<br>

**package.json만으로도 npm install을 할 시, 필요한 모듈을 다 설치한다.**   
(*협업할 때, 굳이 node_modules을 공유안해도 됨.*)   

<br>

----------------------------------------   

<br>

>## express(서버) 실행   
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

>## 라우팅 (app.get)   

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

>## babel   

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

*하위 폴더의 파일에 대해 작동을 안할 때가 있다. --> 한 폴더에 모두 묶어 관리.*

```
"devDependencies": {
    "nodemon": "^2.0.6"

}

```

<br>

----------------------------------------   

<br>


>## middleware

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

>#### morgan, helmet  

**morgan -> logging 지원하는 미들웨어**   

**helmet -> 보안 기능 담당**   
*(아직은 이정도만...)*   

<br>

>#### body-parser   

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


>## Router   

**route들을 쪼개서 보관하는 파일들**   

**기존에 app.js 파일에 쓰였던 route들을 정리해서, Router.js로 옮겼다.**   

**깔끔하게 정리가 가능하고, 가독성도 올라가는 듯 하다.**   


```
---Router.js---

import express from "express";

export const userRouter = express.Router();

---route 모음--- (단순 arrow function으로 표현)
userRouter.get("/", (req,res) => res.send('user index'));
userRouter.get("/edit", (req,res) => res.send('user edit'));
userRouter.get("/password", (req,res) => res.send('user password'));

---app.js 에서 import 하고 쓰이는 부분---

import {userRouter} from "./router";

app.use("/user", userRouter);
```  
<br>

>#### Router 분리   

**router.js 하나에 모든 router를 보관하면 지저분하다.**   

**목적에 맞게 router 파일들을 만들어 보관한다.**   


```
routers---|
           globalRouter.js (기본적인 url)
           userRouter.js   (user관련 url)
           videoRouter.js 


```    

<br>

**url 명칭을 정리하는 파일을 하나 만들어서 관리한다.**   

```
WETUBE---|
         routers---|
                    globalRouter.js (기본적인 url)
                    userRouter.js   (user관련 url)
                    videoRouter.js  (video관련 url)
         routes.js (정리하는 파일)

```

<br>

----------------------------------------   

<br>

>## MVC(Model, View, Controller)   

<br>

>#### Controller

**MVC패턴중 model과 view를 이어주는 역할을 한다.(model과 view를 호출하는 함수를 담당.)**     

**router파일에 작성되어 있는 함수를 controller에 옮긴다.**    

```
---예시---
export const users = (req, res) => res.send("Users");
export const userDetail = (req, res) => res.send("userDetail");
```   
<

**form 태그로 데이터 전송하기 위해선, controller 파일에 함수가 필요하다.**    

**해당 라우팅 함수에서 변수를 생성해서 template에 쏴준다.**   

```
---const searchingBy = req.query.term와 동일한 코드---

    const {query : {term : searchingBy}} = req;
   

   ---search.pug에 쏴주는 부분---

    res.render("search", {pageTitle : "Search", searchingBy});
```


<br>

>#### View   

**MVC패턴중 template를 담당하고 있다.**   

**pug를 이용해서 template 제작. --> 기본적인 layout을 만들고 상속한다.**      

**먼저, view engine를 pug로 설정한다.**

**controller 파일들에 res 메소드를 render로 바꾸고, pug 파일 이름을 쓴다.**   

```
---view engine를 pug로 설정---

app.set('view engine', "pug"); 


---render 메소드로 pug파일을 불러온다.---

const videos =(req, res) => res.render("videos");

```

<br>



*<>가 아닌 들여쓰기로 구분한다.*      

```
---예시(main.pug -> layout용 template)---

doctype html
html
    head
        title Wetube
    body
        header
            h1 WeTube
        main   
            block content
        footer
            span &copy; WeTube

---예시(home.put -> layout을 상속받는 template)---

extends layouts/main

block content
    p Hello!

```

<br>

**middleware를 이용해서 전역적으로 사용하는 변수를 만든다.**   

**변경사항이 있을 때, 동작 최소화**

**middleware 이기 때문에 next()를 이용해서 다음 함수로 넘어간다.**   

*함수 실행 위치를 잘 선정해야 함.*   

```
---올바른 위치---

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

---이 경우에는 home, users 라우터가 영향을 못받는다.---

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(localsMiddleware);
app.use(routes.videos, videoRouter);
```
<br>

*middleware 함수 예시*

```
---locals를 이용해서 변수를 생성---

export const localsMiddleware =  (req, res, next) => {

    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next();

};

---javascript변수는 #{}안에 넣어서 pug에 사용---

span.footer__text #{siteName} #{new Date().getFullYear()} &copy; 

```

<br>

**controller를 통해서 template에 변수를 보낼 수 있다.**   

**렌더링을 할 때, 변수를 같이 넘겨준다.**   

```
---pageTitle이라는 변수에 "Home"을 정의하고 렌더링한다.---

export const home = (req, res) => res.render("home", {pageTitle : "Home"})
```

<br>

**mixin을 이용해서 같은 구조를 가지는 데이터 표시 캡슐화.**   

**mixin으로 사용할 template파일에 ``` mixin videoBlock(video = {})```**
**을 추가하고,**   

**구조화된 태그를 완성한다.**

```
---예시(mixin template)---

mixin videoBlock(video = {})
    .videoBlock 
        video.videoBlock__thumbnail(src=video.videoFile, controls=true)
        h4.videoBlock__title=video.title
        h6.videoBlock__views=video.views
```   

**mixin template를 사용할 template에서 변수명을 일치시켜야 한다.**   

```
---예시---

each video in videos
            +videoBlock({
                title: video.title,
                views: video.views,
                videoFile: video.videoFile

            })

```
*+videoBlock의 title 변수를 videoBlock template의 video.title과 일치시켜야한다.*   

<br>

>#### Model   

**SQL과 NOSQL의 차이**   
#### SQL   

```
[1] 정해진 데이터 스키마에 따라 데이터베이스 테이블에 데이터가 저장된다.

[2] 관계를 통해서 연결된 여러개의 테이블에 분산된다.

[3] 수직적 확장
```   
<br>

#### NOSQL   

```
[1] 스키마가 없기 때문에, 다른 구조의 데이터를 추가할 수 있다.

[2] 데이터베이스를 더욱 유연하게 변경할 수 있다.

[3] 수평적 확장
```











