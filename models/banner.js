const { Model } = require("sequelize/types");

// Banner는 테이블명
Model.experts = function (sequelize, DataTypes) {
    const banner = sequelize.define('Banner', {
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        href: {
            // 이미지 클랙했을 때 이동
            type: DataTypes.STRING(200),
            allowNull: false
        }
    })
    return banner;
}