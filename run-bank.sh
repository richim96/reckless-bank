#!/bin/bash

# Kill background processes on exit or Ctrl+C
cleanup() {
  echo -e "\nStopping processes..."
  echo "Killing backend (PID: $BE_PID)"
  kill $BE_PID 2>/dev/null || true
  echo "Killing frontend (PID: $FE_PID)"
  kill $FE_PID 2>/dev/null || true
  echo "All processes stopped."
  exit 0
}
trap cleanup SIGINT SIGTERM

# Run backend server
cd reckless-bank-be
./gradlew clean build & ./gradlew bootRun &
BE_PID=$!
cd ..

# Run frontend server
echo "Starting frontend..."
cd reckless-bank-fe
npm run dev &
FE_PID=$!
cd ..

# Wait a bit to let servers start
sleep 5

# Open browser to localhost:8080
echo "Opening browser at http://localhost:8080"
if command -v xdg-open >/dev/null; then
  xdg-open http://localhost:8080
elif command -v open >/dev/null; then
  open http://localhost:8080
else
  echo "Please open http://localhost:8080 manually."
fi

# Wait for both processes
wait $BE_PID $FE_PID
