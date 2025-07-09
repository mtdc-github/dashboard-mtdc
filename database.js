const {createPool}=require('mysql')

const pool=createPool({
host:"localhost",
user:"root",
password:"rootuser",
database:"region_metrics",
connectionLimit: 10

})
pool.query('select * from mtdc_dashboard',(err,res)=>{
    return console.log(res)
})

