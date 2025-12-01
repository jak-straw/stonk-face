#!/bin/bash

# Stonk Face Development Script
# This script helps you start the development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Print header
print_header() {
    echo ""
    print_color "$BLUE" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_color "$BLUE" "  $1"
    print_color "$BLUE" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_color "$GREEN" "✓ Node.js installed: $NODE_VERSION"
    else
        print_color "$RED" "✗ Node.js is not installed"
        print_color "$YELLOW" "  Please install Node.js from https://nodejs.org/"
        exit 1
    fi

    # Check npm
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_color "$GREEN" "✓ npm installed: $NPM_VERSION"
    else
        print_color "$RED" "✗ npm is not installed"
        exit 1
    fi

    # Check MongoDB
    if command_exists mongod; then
        print_color "$GREEN" "✓ MongoDB installed"
    else
        print_color "$YELLOW" "⚠ MongoDB not found in PATH"
        print_color "$YELLOW" "  Make sure MongoDB is installed and running"
    fi

    echo ""
}

# Setup backend
setup_backend() {
    print_header "Setting Up Backend"

    cd backend

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_color "$YELLOW" "Installing backend dependencies..."
        npm install
        print_color "$GREEN" "✓ Backend dependencies installed"
    else
        print_color "$GREEN" "✓ Backend dependencies already installed"
    fi

    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_color "$YELLOW" "Creating .env file from .env.example..."
        cp .env.example .env
        print_color "$GREEN" "✓ .env file created"
        print_color "$YELLOW" "⚠ Please edit backend/.env with your configuration"
    else
        print_color "$GREEN" "✓ .env file exists"
    fi

    cd ..
    echo ""
}

# Setup frontend
setup_frontend() {
    print_header "Setting Up Frontend"

    cd project

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_color "$YELLOW" "Installing frontend dependencies..."
        npm install
        print_color "$GREEN" "✓ Frontend dependencies installed"
    else
        print_color "$GREEN" "✓ Frontend dependencies already installed"
    fi

    cd ..
    echo ""
}

# Start MongoDB
start_mongodb() {
    print_header "MongoDB Status"

    # Check if MongoDB is already running
    if pgrep -x "mongod" > /dev/null; then
        print_color "$GREEN" "✓ MongoDB is already running"
    else
        print_color "$YELLOW" "Starting MongoDB..."
        print_color "$YELLOW" "⚠ Make sure MongoDB is installed and configured"
        print_color "$YELLOW" "  Run manually: mongod"
        print_color "$YELLOW" "  Or with Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    fi
    echo ""
}

# Start backend
start_backend() {
    print_header "Starting Backend Server"

    cd backend
    print_color "$GREEN" "Starting backend on http://localhost:5000"
    print_color "$YELLOW" "Press Ctrl+C to stop"
    echo ""
    npm run dev
}

# Start frontend
start_frontend() {
    print_header "Starting Frontend Server"

    cd project
    print_color "$GREEN" "Starting frontend on http://localhost:3000"
    print_color "$YELLOW" "Press Ctrl+C to stop"
    echo ""
    npm run dev
}

# Start both servers
start_both() {
    print_header "Starting Both Servers"

    print_color "$YELLOW" "This will start both backend and frontend in the background"
    print_color "$YELLOW" "Logs will be saved to backend.log and frontend.log"
    echo ""

    # Start backend in background
    cd backend
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    print_color "$GREEN" "✓ Backend started (PID: $BACKEND_PID)"

    # Start frontend in background
    cd project
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    print_color "$GREEN" "✓ Frontend started (PID: $FRONTEND_PID)"

    echo ""
    print_color "$BLUE" "Servers are running:"
    print_color "$GREEN" "  Backend:  http://localhost:5000 (PID: $BACKEND_PID)"
    print_color "$GREEN" "  Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
    echo ""
    print_color "$YELLOW" "View logs with: tail -f backend.log frontend.log"
    print_color "$YELLOW" "Stop servers: kill $BACKEND_PID $FRONTEND_PID"
    echo ""

    # Save PIDs to file for easy cleanup
    echo "$BACKEND_PID" > .backend.pid
    echo "$FRONTEND_PID" > .frontend.pid
}

# Stop servers
stop_servers() {
    print_header "Stopping Servers"

    if [ -f ".backend.pid" ]; then
        BACKEND_PID=$(cat .backend.pid)
        if ps -p $BACKEND_PID > /dev/null 2>&1; then
            kill $BACKEND_PID
            print_color "$GREEN" "✓ Backend stopped (PID: $BACKEND_PID)"
        fi
        rm .backend.pid
    fi

    if [ -f ".frontend.pid" ]; then
        FRONTEND_PID=$(cat .frontend.pid)
        if ps -p $FRONTEND_PID > /dev/null 2>&1; then
            kill $FRONTEND_PID
            print_color "$GREEN" "✓ Frontend stopped (PID: $FRONTEND_PID)"
        fi
        rm .frontend.pid
    fi

    echo ""
}

# Show menu
show_menu() {
    print_header "Stonk Face Development Menu"

    echo "1) Setup project (install dependencies)"
    echo "2) Start backend only"
    echo "3) Start frontend only"
    echo "4) Start both (background)"
    echo "5) Stop servers"
    echo "6) Check prerequisites"
    echo "7) Exit"
    echo ""
    read -p "Select an option [1-7]: " choice

    case $choice in
        1)
            check_prerequisites
            setup_backend
            setup_frontend
            start_mongodb
            print_color "$GREEN" "✓ Setup complete!"
            print_color "$YELLOW" "Run this script again to start the servers"
            ;;
        2)
            start_mongodb
            start_backend
            ;;
        3)
            start_frontend
            ;;
        4)
            start_mongodb
            start_both
            ;;
        5)
            stop_servers
            ;;
        6)
            check_prerequisites
            ;;
        7)
            print_color "$GREEN" "Goodbye!"
            exit 0
            ;;
        *)
            print_color "$RED" "Invalid option"
            show_menu
            ;;
    esac
}

# Main script
main() {
    print_color "$BLUE" "
    ╔═══════════════════════════════════╗
    ║   Stonk Face Development Tool    ║
    ║         Video Sharing App         ║
    ╚═══════════════════════════════════╝
    "

    # Check if we're in the right directory
    if [ ! -d "backend" ] || [ ! -d "project" ]; then
        print_color "$RED" "Error: This script must be run from the stonk-face root directory"
        exit 1
    fi

    show_menu
}

# Run main
main
