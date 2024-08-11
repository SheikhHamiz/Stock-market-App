package com.example.stock_market_app_backend.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class DemoController {
    @GetMapping(path = "api/demo")
    public String getDemo() {
        return "Demo works";
    }
}
