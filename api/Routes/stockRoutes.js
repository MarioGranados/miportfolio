const StockModel = require("./Models/stockModel");
const Stock = require("./Models/stockModel");

app.post("/stock", async (req, res) => {
    const { name, price } = req.body;
    try {
      const stockData = await new Stock({name, price})
      res.json(stockData);
    } catch (error) {
      res.status(400).json(e);
    }
  });