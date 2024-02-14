const csv = require('csv-parser');
const path = require('path')
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotEnv=require("dotenv");
dotEnv.config();

// Sample users data (ideally this should be in a database)
const users = [
    { username: 'ankan', password: 'admin123', type: 'admin' },
    { username: 'alireza', password: 'user123', type: 'regular' },
    { username: 'rose', password: 'user1234', type: 'regular' },
    { username: 'ajax', password: 'user12345', type: 'regular' }
];


// Login user and generate JWT
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create and return JWT token
    const token = jwt.sign({ username: user.username, type: user.type }, process.env.TOKEN_SECRET);
    res.json({ token });
};

const getHome = async (req, res) => {
    const userType = req.user.type;
    let books = [];
    
        if (userType === 'admin') {
    const adminUserPath = path.join(__dirname, '../data/adminUser.csv');
    await readBooksFromCSV(adminUserPath, books);
        }

  
        const regularUserPath = path.join(__dirname, '../data/regularUser.csv');
        await readBooksFromCSV(regularUserPath, books);    
    res.json({ books });
};

async function readBooksFromCSV(filePath, books) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                books.push(row['Book Name']);
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(error);
            });
    });
}

const addBook = async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }

    const { bookName, author, publicationYear } = req.body;

    // Validate parameters
    if (typeof bookName !== 'string' || typeof author !== 'string' || isNaN(publicationYear)) {
        return res.status(400).json({ message: 'Invalid parameters' });
    }

    // Add the new book to regularUser.csv
    const newBookEntry = `${bookName},${author},${publicationYear}\n`;

    fs.appendFile( path.join(__dirname, '../data/regularUser.csv'), newBookEntry, (err) => {
        if (err) throw err;
        res.json({ message: 'Book added successfully' });
    });
};


const deleteBook = async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    const bookName = req.body.bookName.toLowerCase(); // Ignore case while matching
    
    // Validate parameters
    if (typeof bookName !== 'string') {
        return res.status(400).json({ message: 'Invalid parameter' });
    }
    
    // Read regularUser.csv, remove the book, and rewrite the file
    const rows = [];
    let headerRowSkipped = false; // Flag to track if header row is already skipped
    fs.createReadStream( path.join(__dirname, '../data/regularUser.csv'))
        .pipe(csv())
        .on('data', (row) => {
            // Check if header row is already skipped
            if (!headerRowSkipped) {
                rows.push(Object.keys(row).join(',') + '\n'); // Add the header row
                headerRowSkipped = true; // Set the flag to true
            }

            if (row['Book Name'].toLowerCase() !== bookName) {
                rows.push(`${row['Book Name']},${row['Author']},${row['Publication Year']}\n`);
            }
        })
        .on('end', () => {
            fs.writeFile( path.join(__dirname, '../data/regularUser.csv'), rows.join(''), (err) => {
                if (err) throw err;
                res.json({ message: 'Book deleted successfully' });
            });
        });
};




module.exports = {
  loginUser,
  addBook,
  deleteBook,
  getHome
};