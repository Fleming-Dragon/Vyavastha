#!/bin/bash

# Build and deployment script for Vyavastha Web

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Vyavastha Web Docker Build Script${NC}"

# Function to print usage
usage() {
    echo "Usage: $0 [OPTION]"
    echo "Options:"
    echo "  build     Build production Docker image"
    echo "  dev       Build and run development environment"
    echo "  run       Run production container"
    echo "  stop      Stop all containers"
    echo "  clean     Remove all containers and images"
    echo "  help      Show this help message"
}

# Build production image
build_prod() {
    echo -e "${YELLOW}📦 Building production image...${NC}"
    docker build -t vyavastha-web:latest .
    echo -e "${GREEN}✅ Production image built successfully!${NC}"
}

# Run development environment
run_dev() {
    echo -e "${YELLOW}🔧 Starting development environment...${NC}"
    docker-compose --profile dev up --build vyavastha-web-dev
}

# Run production container
run_prod() {
    echo -e "${YELLOW}🌐 Starting production container...${NC}"
    docker-compose up --build vyavastha-web
}

# Stop containers
stop_containers() {
    echo -e "${YELLOW}🛑 Stopping containers...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Containers stopped${NC}"
}

# Clean up
clean_up() {
    echo -e "${YELLOW}🧹 Cleaning up containers and images...${NC}"
    docker-compose down --rmi all --volumes
    docker system prune -f
    echo -e "${GREEN}✅ Cleanup completed${NC}"
}

# Main script logic
case "$1" in
    build)
        build_prod
        ;;
    dev)
        run_dev
        ;;
    run)
        run_prod
        ;;
    stop)
        stop_containers
        ;;
    clean)
        clean_up
        ;;
    help|*)
        usage
        ;;
esac
