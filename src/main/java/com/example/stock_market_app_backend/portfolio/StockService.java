package com.example.stock_market_app_backend.portfolio;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    private StockRepository stockRepository;
    private UserRepository userRepository;

    public StockService(StockRepository stockRepository, UserRepository userRepository) {
        this.stockRepository = stockRepository;
        this.userRepository = userRepository;
    }

    public List<Stock> getAllStocksOwnedByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () ->new UsernameNotFoundException("User doesn't exist"));
        return user.getStocksList();
    }

    public void saveStockForUser(String username, Stock stock) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () ->new UsernameNotFoundException("User doesn't exist"));
        stock.setUser(user);
        stockRepository.save(stock);
    }
    public void updateStockForUser(String username,Long id ,Stock stock) {
        if(userRepository.findByUsername(username).isPresent()) {
            Stock previousStock = stockRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("No Such Stock bought by user"));
            previousStock.setShares(previousStock.getShares() + stock.getShares());
            stockRepository.save(previousStock);
        }
    }
    public void deleteStock(String username, Long id) {
        if(userRepository.findByUsername(username).isPresent()) {
            stockRepository.deleteById(id);
        }
    }
}
