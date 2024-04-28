import express from 'express';

const app = express();

app.use(express.static('public')); // We want to read HTML from public folder

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})