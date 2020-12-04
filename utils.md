## Start

```bash
cd ./backend
node server.js

cd ../frontend
npm install
# run metro server
npx react-native start | npm run-script start
# run emulator
npx react-native run-android | npm run-script android
```

```bash
cd ~/0ROOT/Github/unicam-sp/unicam.101438.pawn
tmux new -d -s session1 'cd ./backend; node server.js' \; \
split-window 'cd ./frontend; npx react-native start' \; \
split-window 'cd ./frontend; npx react-native run-android'
tmux a
```