# Neural Network Implementation in JavaScript
## Introduction
__This is a work in progress.__

This is a Neural Network built in JavaScript. It can be run either through the command line or on a local web server. 

Using the command line you can choose to train either a perceptron or a sigmoid neuron. You can optionally train a large number of them to get an average for how well the neuron trains.

Using the web server you can train a single sigmoid neuron. The green points show points under the line that the neuron identified correctly, the blue points show points above the line that the neuron identified correctly and the red points show points either above or below the line that the neuron identified incorrectly.

## Currently Completed
* Perceptron
* Sigmoid Neuron
* Graphical Display using React

## Still To Do
* Link neurons to make a network
* Make graphical display update as the network/neuron is training

## How To Build
### Linux
1. Clone to your computer using git
    * `git clone https://github.com/CameronProbert/JS-Neural-Net.git`
2. Run yarn to install dependencies
	* `yarn`
		* (If yarn is not installed you will need to use `npm install -g yarn`)

## How to Run
### Via Command Line
* `yarn perceptron-neuron [number to train]` to train a perceptron
* `yarn sigmoid-neuron [number to train]` to train a sigmoid neuron
### Via Browser with graphics
1. `yarn start` to start the web server
2. In your web browser, go to `localhost:3000`
	* Refresh the page to see a new sigmoid neuron

## Resources used in creating the project
* https://appliedgo.net/perceptron/
