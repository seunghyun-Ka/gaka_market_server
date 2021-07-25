const express = require('express'); //모듈 불러오기
const cors = require('cors')
const app = express();
const models = require('./models');
const port = 8080;

//익스프레스 사용 제이슨 형식을 사용하기
app.use(express.json())
//모든 브라우저에서 내 서버에 요청 가능
app.use(cors());

//람다 기존 함수 대신 겟오면 이 함수 실행
app.get("/products", (req, res) => {
    models.Product.findAll()
        .then((result) => {
            console.log("PRODUCTS : ", result);
            res.send({
                products: result,
            });
        })
        .catch((error) => {
            console.error(error);
            res.send("에러 발생");
        });
});

app.post("/products", (req, res) => {
    const body = req.body;
    res.send({
        body,
    });
    const { id, name, description, price, seller } = body;
    if (!id, !name || !description || !price || !seller) {
        res.send("모든 필드를 입력해주세요");
    }
    models.Product.create({
        id,
        name,
        description,
        price,
        seller,
    })
        .then((result) => {
            console.log("상품 생성 결과 : ", result);
            res.send({
                result,
            });
        })
        .catch((error) => {
            console.error(error);
            res.send("상품 업로드에 문제가 발생했습니다");
        });
});

app.delete("/products", (req, res) => {
    const body = req.body;
    const { id } = body;
    models.Product.destroy({
        where: {
            "id": id
        }
    }).then((result) => {
        console.log(id + "번째 상품이 삭제 되었습니다.");
        res.send(id + "번째 상품이 삭제 되었습니다.");
    })
        .catch((error) => {
            console.error(error);
            res.send("상품 삭제에 문제가 발생했습니다");
        });
});

app.get("/products/:id", (req, res) => {
    const params = req.params;
    const { id } = params;
    res.send(`id는 ${id}입니다.`)
})

// 기다리는중
app.listen(port, () => {
    console.log("서버 돌아가는중");
    //모델스에 넣은 테이블을 가져오겠다.
    models.sequelize.sync().then(() => {
        console.log("디비 연결 성공");
    }).catch((err) => {
        console.error(err);
        console.log("디비 연결 에러")
        process.exit()
    })
})
