const express = require('express'); //모듈 불러오기
const cors = require('cors')
const app = express();
const models = require('./models');
const multer = require('multer');
// 저장 앤 파일 내가 원하는 걸로 저장
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})
const port = 8080;

//익스프레스 사용 제이슨 형식을 사용하기
app.use(express.json())
//모든 브라우저에서 내 서버에 요청 가능
app.use(cors());
// 사진 올렸을 때 이미지 안깨지게
app.use('/uploads', express.static('uploads'))
// 배너 관리
app.get('/banners', (req, res) => {

})


//람다 기존 함수 대신 겟오면 이 함수 실행
app.get("/products", (req, res) => {
    models.Product.findAll({
        order: [["createdAt", "DESC"]],
        attributes: [
            'id',
            'name',
            'price',
            'createdAt',
            'seller',
            'imageUrl'
        ]
    })
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
    const { id, name, description, price, seller, imageUrl } = body;
    if (!id, !name || !description || !price || !seller || !imageUrl) {
        res.status(400).send("모든 필드를 입력해주세요");
    }
    models.Product.create({
        id,
        name,
        description,
        price,
        seller,
        imageUrl
    })
        .then((result) => {
            console.log("상품 생성 결과 : ", result);
            res.send({
                result,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send("상품 업로드에 문제가 발생했습니다");
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
            res.status(400).send("상품 삭제에 문제가 발생했습니다");
        });
});

app.get("/products/:id", (req, res) => {
    const params = req.params;
    const { id } = params;
    models.Product.findOne({
        where: {
            id: id
        }
    }).then((result) => {
        console.log("PRODUCT : ", result);
        res.send({
            product: result
        })
    }).catch((error) => {
        console.error(error);
        res.status(400).send("상품 조회 에러 발생")
    })
})

// 파일을 하나 보낼 때 싱글
// 이미지 파일에 데이터 요청이 왔을 때 업로드라는 폴더에 이미지 조장
app.post("/image", upload.single("image"), (req, res) => {
    const file = req.file
    console.log(file);
    res.send({
        imageUrl: file.path
    })
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
