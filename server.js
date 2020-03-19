const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    respond_quote = 
    {
        quote: getRandomElement(quotes)
    }
    res.send(respond_quote)
})
app.get('/api/quotes', (req, res, next) => {
    respond_quotes = 
    {
        quotes: quotes
    }
    res.send(respond_quotes)
})
app.get('/api/quotes/author', (req, res, next) => {
    author = req.query.person
    selected_quotes = []
    quotes.forEach(quote => {
        if (quote.person === author) 
        {
            selected_quotes.push(quote)
        } 
    })
   
    res.send({quotes: selected_quotes})
})

app.post('/api/quotes/',(req, res, next) => {
 const new_quote = req.query
 if(new_quote.quote && new_quote.person)
 {
     console.log(new_quote)
     quotes.push(new_quote)
     res.send({quote: new_quote})
 }
 else
 {
    res.status(400).send()
 }

})

app.put('/api/quotes', (req,res,next) => {

    quotes.forEach( quote => {
        if (quote.person === req.query.person)
        {
            quote.quote = req.query.quote
            res.status(204).send()
        }
     }) 
     
 })

 app.delete('/api/quotes', (req,res,next) => {
     
    quotes.forEach( quote => {
        if (quote.person === req.query.person)
        {
            const index = quotes.indexOf(quote)
            console.log(index)
            quotes.splice(index, 1)
            res.send()
        }
     }) 
     

 })

app.listen(PORT, () => {console.log(`http://localhost:${PORT}`)})

