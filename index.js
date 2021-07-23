var http = require("http");
var hostname = "127.0.0.1";
var port = 8080;

//서버에서 요청이 왔을 때 호출되는 함수 응답받는거 응답주는거
const server = http.createServer(function (req, res) {
    // 요청 나눠서 사용 
    const path = req.url;
    const method = req.method;
    // 패스가 프로덕츠일때 겟일때 등등 다 나눠서 작성
    if (path === "/products") {
        if (method === "GET") {
            // 배열을 보내줘야할땐 writehead사용 정상적인 상황이니 200 컨텐트 타입은 제이슨형식의 구조를 보내겠다 선언
            res.writeHead(200, { "Content-Type": "application/json" });
            //배열을 스트링 형태로 바꿔주는 것
            const products = JSON.stringify([
                {
                    name: "농구공",
                    price: 5000,
                },
            ]);
            res.end(products);
        } else if (method === "POST") {
            res.end("생성되었습니다!");
        }
    } else {
        res.end("Good Bye");
    }
});

// 요청을 기다리고 있겠다.
server.listen(port, hostname);

console.log("grab market server on!");