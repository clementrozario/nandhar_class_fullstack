// Express setup:
import express from 'express'
const app = express();
const PORT = 5001;

app.use(express.json());

// Problem 1: Library Book Management System
// Create a class Book with properties: title, author, isAvailable.
// Then create a Library class that manages a list of books.
// Requirements:
// Library should have methods:
// addBook(book) – adds a book.
// borrowBook(title) – returns the book if available and marks it as not available.
// returnBook(title) – marks the book as available again.

class Book{
    constructor(title,author,isAvailable=true){
        this.title = title;
        this.author = author;
        this.isAvailable = isAvailable;
    }
}
class Library {
    constructor(){
        this.books=[];
    }

    addBook(book){
        this.books.push(book);
        console.log(`Book added: ${book.title} by ${book.author}`);
    }

    borrowBook(title){
        for(const book of this.books){
            if(book.title === title && book.isAvailable){
                book.isAvailable=false;
                console.log(`book borrowed:${book.title} by ${book.author}`);
                return book;
            }
        }
        console.log(`book ${title} is not available`);
        return null;
    }
    returnBook(title){
        for (const book of this.books){
            if(book.title === title && !book.isAvailable){
                book.isAvailable=true;
                console.log(`book returned:${book.title}`);
                return book;
            }
        } 
        console.log('book was either not borrowed or already returned');
        return null
    }
    getAllBooks() {
    return this.books;
  }
}

const library = new Library();
const book1 = new Book("computer","issac");
const book2 = new Book("eletronics","newton");
const book3 = new Book("civil","yogi");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

//-----------------------------------------------------------------------------------------
// Problem 2: Bank Account with Transaction History
// Description:
// Create a class BankAccount with:
// Properties: owner, balance
// Methods: deposit(amount), withdraw(amount), getBalance(), getHistory()
// Track all transactions in a private array.

class BankAccount{
    #balance;
    #history;
    constructor(owner,balance=0){
        this.owner=owner;
        this.#balance=balance;
        this.#history=[
            {
                type:'Initial',
                amount:balance,
                balance:this.#balance,
                date:new Date().toISOString(),
            },
        ];
    }
    deposit(amount){
        this.#balance+=amount;
        this.#history.push({
            type:'Deposit',
            amount,
            balance:this.#balance,
            date:new Date().toISOString(),
        });
    }
    withdraw(amount){
        if(amount>this.#balance){
            throw new Error('Insufficient Funds');
        }
        this.#balance-=amount;
        this.#history.push({
            type:'WithDraw',
            amount,
            balance:this.#balance,
            date:new Date().toISOString()
        });
    };
    getBalance(){
        return this.#balance;
    }
    getHistory(){
        return this.#history.map((fund)=>({...fund}));
    }
}

const account = new BankAccount('cla',4300);
account.deposit(450);
account.withdraw(350);

console.log(account.getBalance());
console.log(account.getHistory());

//---------------------------------------------------------------------------------------

// 3.Shape Area Calculator (Inheritance):
// Description:
// Create a base class Shape, and extend it with Circle and Rectangle.
// Requirements:
// Circle should have a radius and a method area()
// Rectangle should have width and height, and a method area()

class Shape{
    constructor(){

    }
}
class Circle extends Shape{
    constructor(radius){
        super();
        this.radius=radius;
    }    
    area(){
        return Math.PI*this.radius*this.radius;
    }
}
class Rectangle extends Shape{
    constructor(width,height){
        super();
        this.width=width;
        this.height=height;
    }
    area(){
        return this.width*this.height;
    }
}


//----------------------Express logic-----------------------------------

//library end points:
// all
app.get('/library/books',(req,res)=>{
    const allBooks = library.getAllBooks();
    res.status(200).json(allBooks);
})

// add:
app.post('/library/books',(req,res)=>{
    const {title,author} = req.body;
    if(!title || !author) {
        return res.status(400).json({message:'Title and author is required'});
    }
    const newBook = new Book(title,author);
    library.addBook(newBook);
    res.status(201).json(newBook);
})

// Borrow:
app.post('/library/borrow',(req,res)=>{
    const { title } = req.body;
    if(!title){
       return res.status(400).json({message:'Title is required'}); 
    }
    const borrowedBook = library.borrowBook(title);
    if(borrowedBook){
        return res.status(200).json({message:"book borrowed"})
    }
    else{
        return res.status(400).json({message:"book not available"});
    }
})

// return book:
app.post('/library/return',(req,res)=>{
    const { title } = req.body;
    if(!title){
       return res.status(400).json({message:'Title is required'}); 
    }
    const returnedBook = library.returnBook(title);
    if(returnedBook){
        return res.status(200).json({message:"book returned"})
    }
    else{
        return res.status(400).json({message:"book not returned"});
    }
});
//------------------------------------------------------------------------------------------
//Bank Account end points:
//initial balance:
app.get('/account/balance',(req,res)=>{
    try{
        const balance = account.getBalance();
        res.status(200).json({message:`Your available balance is:${balance}`});
    }catch{
        res.status(400).json({message:'server error',error:error.message})
    }
})

//history
app.get('/account/history',(req,res)=>{
    try{
        const history = account.getHistory();
        res.status(200).json(history);
    }catch{
        res.status(400).json({message:'server error',error:error.message})
    }
})

//deposit:
app.post('/account/deposit',(req,res)=>{
    const { amount } = req.body;
    if(!amount) return 'please enter a valid amount'
    try{
        account.deposit(amount);
        res.status(200).json({message:`amount successfully deposited,now balance is:${account.getBalance()}`});  
    }catch{
       res.status(400).json({message:'server error',error:error.message}) 
    }
})

//withDraw:
app.post('/account/withdraw',(req,res)=>{
    const {amount} = req.body;
    if(!amount) return 'please enter a valid amount'
    try{
        account.withdraw(amount);
        res.status(200).json({message:`amount successfully withdrawn,now balance is:${account.getBalance()}`});  
    }catch{
       res.status(400).json({message:'not sufficient funds',error:error.message}) 
    }
})
//----------------------------------------------------------------------------------
//shape area calculator
// circle:
app.post('/area/circle',(req,res)=>{
    const { radius } = req.body;
    if(!radius) return 'please enter the radius to calculate';
    try{
        const circle = new Circle(radius);
        const calculate = circle.area();
        res.status(200).json({message:`the area of the circle is: ${calculate}`});
    }catch(error){
        res.status(400).json({message:'something went wrong',error:error.message})
    }
})

// rectangle:
app.post('/area/rectangle',(req,res)=>{
    const { width , height } = req.body;
    if(!(width) || !(height)) return 'width/height is missing'
    try{
        const rectangle = new Rectangle(width,height);
        const calculate = rectangle.area();
        res.status(200).json({message:`the area of the rectangle is : ${calculate}`});
    }catch(error){
        res.status(400).json({message:'something went wrong',error:error.message})
    }
})


app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`)
})