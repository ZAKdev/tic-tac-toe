# tic-tac-toe

Expected node version is 6.0 or above

## Installation & Run
- Take clone of project
- run `sudo npm install`
- run `gulp`
- visit `http://localhost:8000`

## Tools Used
- React
- Redux
- Redux Thunk
- Lodash
- React DOM
- Stylus - UI
- nib - UI

## Architecture
- One app route contain entire application - `public/App/AppRoute.js`
- Two action creators defined in - `public/App/AppActions.js`
- One reducer managing entire app states - `public/App/AppReducer.js`
- Two components `GridItem.js` & `Board.js` defined in - `public/components`

## Logic
- `patteran.js` contain sequence of every match array so total sequence is 3 array
- In new arrays defining the sequence from `patteran.js` of default `grid` array
- Breaking each new arrays sequence in 3 chunks of array
- Matching it with expected `XArray` & `OArray`