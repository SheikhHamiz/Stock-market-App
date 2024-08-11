package com.example.stock_market_app_backend.portfolio;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class StockResource {
    public StockResource(StockService stockService) {
        this.stockService = stockService;
    }

    private StockService stockService;

    @GetMapping(path = "api/stock/{username}")
    public List<Stock> retrieveAllStocksOwnedByUser(@PathVariable String username) {
        return stockService.getAllStocksOwnedByUser(username);
    }
    @GetMapping(path = "api/stock/{username}/{tickerName}")
    public Stock retrieveStockDetailsOwnedByUser(
            @PathVariable String username, @PathVariable String tickerName) {
        return stockService.getAllStocksOwnedByUser(username)
                .stream().filter(
                stock -> stock.getTickerName().equals(tickerName)
        ).findFirst().orElse(new Stock());

    }
    @PostMapping(path = "api/stock/{username}")
    public void saveStock(@PathVariable String username, @RequestBody Stock stock) {
        stockService.saveStockForUser(username,stock);
    }
    @PutMapping(path = "api/stock/{username}/{id}")
    public void updateStock(
            @PathVariable String username,@PathVariable Long id, @RequestBody Stock stock
    ) {
        stockService.updateStockForUser(username, id, stock);
    }
    @DeleteMapping(path = "api/stock/{username}/{id}")
    public void deleteStock(@PathVariable String username, @PathVariable Long id) {
        stockService.deleteStock(username,id);
    }
}
