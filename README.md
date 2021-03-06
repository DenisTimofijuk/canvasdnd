# Canvas Drag and Drop
Uses:
- TypeScript
- Webpack
- Babel

Has:
- Buffer system
- Layer System
- Grid system
- Event system

## How to start
- after **git clone** run **npm install**;
- create your own local branch: ``` $git checkout -b <local_branch_name> ```

## How to work
This project uses **webpack**.
- run ``` $npm run build ``` to launch this project on your local machine

## How to publish
This project uses **webpack**.
- run ``` $npm run build:prod ``` this will create ``` dist ``` folder with final files inside


## How to push changes
- after finishing your task, commit changes on your local branch;
- go back to master branch: ``` $git checkout master ```
- merge your changes: ``` $git merge development ```
- push changes: ``` $git push -u origin master ``` or ``` $git push ```

## VsCode
- Multi line work: ``` Crtl + Shift + L ```

## TODO
- Language Overlays;

## Info
All parameters are hardcoded. To change images, coordinates, amount of elements please use corresponding **layout_QID.ts** in **layout** folder under **setup** folder. I suggest to create your own layout file and add it to the **layout.ts** file in **style** folder under **setup** folder.