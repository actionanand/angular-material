## IMPORTANT

This repository contains the code for **Angular Material**. 

# Initializing a clean Angular Material Project

These are the commands and steps needed to scaffold a new Angular Material project from scratch,
from an empty folder.

Please make sure to have the latest CLI, and at least NPM 5.

When is doubt, its recommended to update to the latest version of node using a node versioning tool
such as for example [nave](https://github.com/isaacs/nave) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

# Step 1 - Scaffold a clean project using the Angular CLI

With a CLI version 1.5 or above, let's scaffold a new project with routing:

    ng new angular-material-hello-world --routing

# Step 2 - Installing Angular Material dependencies

Next, let's install these dependencies:

    npm install @angular/material @angular/cdk  @angular/animations hammerjs

# Step 3 - Adding Google Material Icons Font

Let's add this to our index.html:

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

# Step 4 - choosing a Theme

Before starting to import components, let's choose a widget theme, have a look at the themes available

inside `node_modules/@angular/material/prebuild-themes`.

We can for example use the Indigo Pink theme by adding this line to our styles.css file:

@import "~@angular/material/prebuilt-themes/indigo-pink.css";


# To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

## Cloning Guide

### clone only the remote primary HEAD (default: origin/master)
```bash
git clone <url> --single-branch
```

### Only specific branch

```bash
git clone <url> --branch <branch> --single-branch [<folder>]
```