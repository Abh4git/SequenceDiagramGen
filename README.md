# SequenceDiagramGen
Sequence Diagram generator  - Let us enable more people to use sequence diagrams for interaction modeling.  
## What it does?  
Generates a Sequence Diagram from a JSON format file (similar to login.json in sequences folder in src)  
Uses Reactjs and HTML5 Canvas.  
## How to start using it?  
Pre-requisites:  
Nodejs : Node version used : v16.1.0  
Steps to get it working:
1. From the folder open terminal and run  
npm install  
2. Start the program using  
npm start  
The program should now run by reading the login.json file in sequences folder and
it will present the diagram like shown.  
 ![Diagram](https://github.com/Abh4git/SequenceDiagramGen/blob/main/images/program_running.png)  
## Modifying for own use?  
3. If you want to use it for drawing a new sequence diagram, add a new json file similar to login.json,
define the objects and messages relevant for your program and include it as a file.  
3.1 import customData from '../sequences/<yourfile>.json';  
3.2 comment the line 3  
## Important method  
drawInteractionFromSampleFile is the method used to draw the contents of the file.  


Inspired by https://sequencediagram.org/  