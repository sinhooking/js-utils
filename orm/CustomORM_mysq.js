class CustomORM {
    constructor(connectionOption) {
        const mysql = require('mysql');
        this.connection  = mysql.createConnection(connectionOption);
        this.connectionInit();
    }

    connectionInit() {
        this.connection.connect(function(err) {
            if (err) { return console.error('error connecting: ' + err.stack); }
            return console.log('mysql connection successfuly');
        });
    }

    table(tableName){
        if(this.tableName){
            this.tableName = null;
            this.where = null;
        }

        this.tableName = tableName;
        return this;
    }

    search(whereSQL, whereSQLAnswer){
        console.log('ddd')
        if(this.whereSQL){
            this.whereSQL = null;
        }

        this.whereSQL = `where ${whereSQL} = ${whereSQLAnswer}`;
        console.log(this.whereSQL)
        return this;
    }

    get(){
        return new Promise((resolve, reject) => {
            if(this.whereSQL){
                this.connection.query(`select * from ${this.tableName} ${this.whereSQL}`, function (err, row, feild){
                    if(err) {return reject(err); }
                    return resolve(row);
                });
            }
            
            this.connection.query(`select * from ${this.tableName}`, function (err, row, feild){
                if(err) {return reject(err); }
                return resolve(row);
            });
        })
    };
}

module.exports = CustomORM;
