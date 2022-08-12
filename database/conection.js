import pkg from 'mysql';
const  mysql  = pkg;
const conection=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database:'tareas'
})

conection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
    console.log('connect whit exist to db');}
});

export default conection
