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
    }
    console.log('Conexion exitosa');
});

export default conection
