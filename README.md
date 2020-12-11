# wetube   

>### express 설치
**npm init을 통해 node 프로그램을 시작하고, package.json 생성한다.**   
<br>

**package.json만으로도 npm install을 할 시, 필요한 모듈을 다 설치한다.**   
(*협업할 때, 굳이 node_modules을 공유안해도 됨.*)   

<br>

----------------------------------------   

>### express(서버) 실행   
**express를 import 하고, 실행할 변수를 만든다.**     

```
// express를 express에 import
const express = require('express');
// app에 express를 담아 실행하게끔 한다.
const app = express();
```   
<br>   

**package.json에 scripts 항목을 추가하여, 실행을 간단하게 한다.**    
