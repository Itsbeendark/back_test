import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

interface User {
    username: string;
    password: string;
}

const users: User[] = [
    { username: 'admin', password: 'password' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the login page!');
});

app.get('/login', (req: Request, res: Response) => {
    res.sendFile('login.html', { root: __dirname });
});

app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send(`Welcome ${username}!`);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
