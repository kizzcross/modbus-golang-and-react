# Modbus Connection with Go and React

This project demonstrates how to establish a Modbus connection using Go on the backend and React on the frontend. It receives three Modbus values and dynamically displays a color based on these values.

## Prerequisites

To run this project, you'll need the following software installed on your machine:

- Go (v1.15 or above)
- Node.js (v14 or above)
- Yarn (v1.22 or above)

## Installation

### Backend (Go)

1. Clone this repository to your local machine.
2. Navigate to the `backend` directory.
3. Run the following command to install the Go dependencies:

```shell
go mod download
```

4. Configure the Modbus connection details in the `config.go` file.
5. Start the backend server with the following command:

```shell
go run main.go
```

The backend server should now be running on `http://localhost:8000`.

### Frontend (React)

1. Open a new terminal window.
2. Navigate to the `frontend` directory.
3. Run the following command to install the Node.js dependencies:

```shell
yarn install
```

4. Start the React development server with the following command:

```shell
yarn start
```

The React application should now be running on `http://localhost:5173`.

## Configuration

Before running the project, you need to configure the Modbus connection details. Follow the steps below:

1. Open the `backend/config.go` file.
2. Modify the `ModbusHost`, `ModbusPort`, `ModbusUnitID`, and `ModbusTimeout` variables to match your Modbus server configuration.

## Usage

1. Open your web browser and visit `http://localhost:5173`.
2. You should see the application interface displaying a color box.
3. The backend server will continuously read the Modbus values and send them to the frontend.
4. The color of the box will update dynamically based on the values received.

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b my-new-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin my-new-branch`.
5. Submit a pull request.

## Acknowledgments

- This project was inspired by the need to establish a Modbus connection and dynamically display colors based on received values.
- We would like to express our gratitude to the open-source community for providing valuable libraries and resources.
