
const uuid = require('uuid');
const { query, insertBatch } = require('../dbs/utils/dbcore');

module.exports = {
    /**
     * 产生一个uuid
     */
    genUID: function () {
        return uuid.v4();
    },

    /**
     * 查询或者创建一个用户
     * @param {string} account_id - 账号id
     * @param {boolean} createFlag - 是否在未查找到后创建用户
     */
    getOrCreateUser: function (account_id, createFlag) {
        return new Promise((resolve, reject)=>{
            query("users", { account_id: account_id }, (err, result) => {
                if (err) {
                    return resolve(null);
                }
    
                if ((result && result.length > 0) || !createFlag) {
                    return resolve(result[0]);
                }
    
    
                insertBatch("users", [{ account_id: account_id, pwd: "123456", level: 1 }], (err, res) => {
                    if (err) {
                        return resolve(null);
                    }
    
                    if (res.acknowledged && res.insertedCount > 0) {
                        return query("users", { account_id: account_id }, (err, result)=>{
                            if (err) {
                                return resolve(null);
                            }

                            if (result && result.length > 0) {
                                return resolve(result[0]);
                            }

                            return resolve(null);
                        });
                    }
    
                    return resolve(new Error("create user failed"), null);
                })
            })
        })
        
    }
}
