package com.finastra.documentReference.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
    @RequestMapping(value = "/home")
    public String home() {
        return "home";
    }


}
