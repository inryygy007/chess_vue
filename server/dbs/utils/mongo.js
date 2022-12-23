var mongodb=require("mongodb");
var client=mongodb.MongoClient;
var connStr="mongodb://127.0.0.1:27017";

module.exports = {
    conn: function (cb) {
        client.connect(connStr,{ useUnifiedTopology: true, useNewUrlParser: true}, function (err, client) {
            if (err) {
                console.log("数据库连接失败");
            } else {
                //指定数据库的名字"wx"
                var db = client.db("wx");
                cb(db);
            }
        })
    }
};