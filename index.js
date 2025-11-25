// import express from "express";
// import * as z from "zod";

// const app = express();
// const PORT = 3001;

// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("API працює 🚀");
// });

// const users = [];
// app.post('/api/auth/registration', (req, res) => {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Please, give username, email and password.'
//         });
//     }

//     const existingUser = users.find(u => u.email === email || u.username === username);

//     if (existingUser) {
//         return res.status(409).json({
//             success: false,
//             message: 'User with this email or name exist already'
//         });
//     }

//     const newUser = {
//         id: Date.now(),
//         username,
//         email,
//         password
//     };

//     users.push(newUser);

//     return res.status(201).json({
//         success: true,
//         message: 'Registration successful!',
//         user: {
//             id: newUser.id,
//             username: newUser.username,
//             email: newUser.email
//         }
//     });
// });

// app.post('/api/auth/login', (req, res) => {
//     const { email, password } = req.body;
//     if ( !email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: 'Please, give email and password.'
//         });
//     }

//     const user = users.find(u => u.email === email);

//     if (!user) {
//         return res.status(401).json({
//             success: false,
//             message: 'User with this email is`t registrated'
//         });
//     }

//     if (user.password !== password) {
//         return res.status(401).json({
//             success: false,
//             message: 'Incorrect password.'
//         });
//     }

//     return res.status(200).json({
//         success: true,
//         message: 'Login is successful!',
//         user: {
//             id: user.id,
//             username: user.username,
//             email: user.email
//         }
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Сервер працює на порту ${PORT}. Відкрийте http://localhost:${PORT}`);
// });