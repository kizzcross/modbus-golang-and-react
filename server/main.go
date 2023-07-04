package main

import (
	"fmt"
	"log"
	"time"

	"github.com/goburrow/modbus"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()

	// Enable CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Create a route on the root path, it should return two values 1 and 2 and it must return 70 for the first and 20 for the seccond "/"
	app.Get("/", func(c *fiber.Ctx) error {
		data := map[string]int{
			"firstValue":  60,
			"secondValue": 51,
		}

		return c.JSON(data)
	})

	app.Get("/modbus-data", func(c *fiber.Ctx) error {
		// Create a TCP connection to the Modbus TCP/IP device
		handler := modbus.NewTCPClientHandler("127.0.0.1:502")
		handler.Timeout = 2 * time.Second
		handler.SlaveId = 1

		err := handler.Connect()
		if err != nil {
			log.Fatal(err)
		}
		defer handler.Close()

		// Create a new Modbus client
		client := modbus.NewClient(handler)

		// Read holding registers starting from address 0, for 5 registers
		// Adjust the starting address and the number of registers as per your device configuration
		startAddress := uint16(0)
		numRegisters := uint16(10) // Adjusted to read 10 registers
		rawRegisters, err := client.ReadHoldingRegisters(startAddress, numRegisters)
		if err != nil {
			log.Fatal(err)
		}
		// Convert raw registers to signed integers
		registers := []int16{}
		for i, value := range rawRegisters {
			// create a variable that will contain the index
			// only register the odd values but it must be appended correctly to the right index
			if i%2 != 0 {
				registers = append(registers, int16(value))
			}

		}

		// Build the response payload
		response := make(map[string]interface{})
		for i, value := range registers {
			registerAddress := startAddress + uint16(i)
			response[fmt.Sprintf("Register%d", registerAddress)] = value
		}

		// Return the response as JSON
		return c.JSON(response)
	})

	// Start the Fiber server
	log.Fatal(app.Listen(":3000"))
}
