package com.example.stock_market_app_backend.portfolio;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {
    private  UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping(path = "api/user-details/cash/{username}")
    public Double getUserCashDetails(@PathVariable String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("No such user"));
        return user.getCash();
    }
    @PutMapping(path = "api/user-details/cash-withdraw/{username}")
    public void withdrawCash(@PathVariable String username, @RequestBody User user) {
        User loadUser = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("No such user"));
        loadUser.setCash(loadUser.getCash()+user.getCash());
        userRepository.save(loadUser);
    }
    @PutMapping(path = "api/user-details/cash/{username}")
    public String  investCash(@PathVariable String username, @RequestBody User user) {
        User loadUser = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("No such user"));
        if(user.getCash() <= loadUser.getCash()) {
            loadUser.setCash(loadUser.getCash() - user.getCash());
            userRepository.save(loadUser);
            return "success";
        } else return "insufficient balance";
    }

}
