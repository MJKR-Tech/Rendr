package com.mjkrt.rendr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * RendrApplication.
 * 
 * Main application for Rendr excel rendering.
 */
@SpringBootApplication
public class RendrApplication {
	
	/**
	 * Runs the main logic of the application.
	 * 
	 * @param args command line arguments for main execution
	 */
	public static void main(String[] args) {
		SpringApplication.run(RendrApplication.class, args);
	}
}
