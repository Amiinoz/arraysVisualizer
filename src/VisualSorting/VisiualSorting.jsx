import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import {mergeSortAnimations} from '../AlgoSorting/sortAlgorithms.js';

import './VisualSorting.css';



// This is the main color of the array bars.
const PRIMARY_COLOR = '#0299f7';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#e302f7';

export default class VisualSorting extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
		}
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < 145; i++ ) {
			array.push(randomIntFromInterval(4, 700));
		}
		this.setState({array});
	}

	bubbleSort(){}

	heapSort(){}

	mergeSort() {
    const animations = mergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayLines = document.getElementsByClassName('arrayLines');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayLines[barOneIdx].style;
        const barTwoStyle = arrayLines[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 3);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayLines[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 3);
      }
    }
  }



	quickSort(){}



	testAlgor(){
		for (let i = 0; i < 100; i++){
			const array = [];
			const length = randomIntFromInterval(1, 1000);
			for(let i = 0; i < length;  i++ ){
				array.push(randomIntFromInterval(-1000, 1000));
			}
			const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
			const mergeNewArray = mergeSortAnimations.mergeSort(array.slice());
			console.log(arraysAreSame(javaScriptSortedArray,mergeNewArray));
		}
	}

	render() {
		const {array} = this.state;

		return(
			<div className="container">

				<div className="appLogo">
					<a href="/">
						<Logo />
					</a>
				</div>

				<div className="arrays">
						{array.map((value, index) => (
				<div className="arrayLines" key={index} style={{height: `${value}px`}}>
					</div>
			))}

				</div>

				<div className= "buttons">

				<button onClick={() => this.resetArray()}>New Array</button>
				<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
				<button onClick={() => this.heapSort()}>Heap Sort</button>
				<button onClick={() => this.mergeSort()}>Merge Sort</button>
				<button onClick={() => this.quickSort()}>Quick Sort</button>

				</div>






			</div>
		)
	}
}

// Random Interval
function randomIntFromInterval(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// Same value arrays
function arraysAreSame( arrayOne, arrayTwo) {
	// console.log('hello from same arrays')
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if(arrayOne[i] !== arrayTwo[i]) return false;
	}
	return true;
}
