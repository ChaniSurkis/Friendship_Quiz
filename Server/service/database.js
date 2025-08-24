

import sql from 'mssql';

const config = {
    user:'surkis',
    password:'surkis6252',
    database: 'FRIEND_SHIP1',
   // server:'DESKTOP-LEGBA99\\SQLEXPRESS', // ודאי שזה השם הנכון של ה-Instance
  server:'127.0.0.1',
   
    port: 1433, 
    requestTimeout: 60000,
    
    options:{
        encrypt:false, 
        trustServerCertificate:true
    },
    packetSize: 16384,
    instanceName:'SQLEXPRESS'

}

const connectToDatabase = async () => {
    try {
        let pool = await sql.connect(config);
        console.log('Connected to the database!');
        return pool;
        
    } catch (err) {
       // console.error('Database connection failed! Error:', err);
       console.error('Database connection failed! Error:', err.message || err);

        throw err;
    }
};

export default connectToDatabase;

// 


// import sql from 'mssql';

// const config = {
//     user: 'chani',
//     password: 'ch1234',
//     server: 'zz-sql',
//     database: 'Friendship_quiz',
//     port: 1433,
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     }
// }

// const connectToDatabase = async () => {
//     try {
//         let pool = await sql.connect(config);
//         console.log('Connected to the database!');
//         return pool;
//     } catch (err) {
//         console.error('Database connection failed! Error:', err);
//         throw err;
//     }
// };

// export default connectToDatabase;
