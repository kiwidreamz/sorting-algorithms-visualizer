import React from "react";
import { getMergeSortAnimations } from "./sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];

		// for (let i = 0; i < 50; i++) {
		// 	array.push(Math.floor(Math.random() * (750 - 10 + 1) + 10));
		// }

		for (let i = 0; i < 310; i++) {
			array.push(Math.floor(Math.random() * (750 - 10 + 1) + 10));
		}

		this.setState({ array });

		for (let i = 0; i < array.length; i++) {
			setTimeout(() => {
				const arrayBars = document.getElementsByClassName("array-bar");
				// const barStyle = arrayBars[i].style;
				arrayBars[i].style.backgroundColor = "#0dcaf0";
			});
		}
	}

	bubbleSort() {
		const array = this.state.array;
		const arrayBars = document.getElementsByClassName("array-bar");

		for (let j = 0; j < array.length; j++) {
			setTimeout(() => {
				for (let i = 0; i < array.length - j; i++) {
					setTimeout(() => {
						const temp = array[i];
						setTimeout(() => {
							arrayBars[i].style.backgroundColor = "#0dcaf0";
						}, i * 1);
						if (temp >= array[i + 1]) {
							array[i] = array[i + 1];
							arrayBars[i].style.height = `${array[i + 1]}px`;
							array[i + 1] = temp;
							arrayBars[i + 1].style.height = `${temp}px`;
						} else {
							arrayBars[i].style.height = `${array[i]}px`;
						}
						arrayBars[i].style.backgroundColor = "red";
					}, i * 1);
				}
			}, j * 120);
		}

		setTimeout(() => {
			for (let i = 0; i < array.length; i++) {
				setTimeout(() => {
					arrayBars[i].style.backgroundColor = "lime";
				}, i * 5);
			}
		}, 37200);
	}

	selectionSort() {
		const array = this.state.array;
		const arrayBars = document.getElementsByClassName("array-bar");

		for (let j = 0; j < array.length; j++) {
			setTimeout(() => {
				for (let i = j + 1; i < array.length; i++) {
					setTimeout(() => {
						setTimeout(() => {
							arrayBars[i].style.backgroundColor = "#0dcaf0";
						}, i * 1);
						if (array[i] <= array[j]) {
							const temp = array[j];
							array[j] = array[i];
							arrayBars[j].style.height = `${array[i]}px`;
							array[i] = temp;
							arrayBars[i].style.height = `${temp}px`;
						} else {
							arrayBars[i].style.height = `${array[i]}px`;
						}
						arrayBars[i].style.backgroundColor = "red";
					}, i * 1);
				}
			}, j * 120);
		}

		setTimeout(() => {
			for (let i = 0; i < array.length; i++) {
				setTimeout(() => {
					arrayBars[i].style.backgroundColor = "lime";
				}, i * 5);
			}
		}, 37200);
	}

	insertionSort() {
		const array = this.state.array;
		const arrayBars = document.getElementsByClassName("array-bar");

		for (let i = 0; i < array.length; i++) {
			arrayBars[i].style.backgroundColor = "#0dcaf0";
			setTimeout(() => {
				let current = array[i];
				let j = i - 1;
				while (j > -1 && current < array[j]) {
					setTimeout(() => {
						arrayBars[j].style.backgroundColor = "red";
					}, 5);
					const temp = array[j + 1];
					array[j + 1] = array[j];
					arrayBars[j + 1].style.height = `${array[j]}px`;
					array[j] = temp;
					arrayBars[j].style.height = `${temp}px`;

					arrayBars[j].style.backgroundColor = "#0dcaf0";
					j--;
				}
			}, i * 35);
		}

		setTimeout(() => {
			for (let i = 0; i < array.length; i++) {
				setTimeout(() => {
					arrayBars[i].style.backgroundColor = "lime";
				}, i * 5);
			}
		}, 10850);
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? "red" : "#0dcaf0";
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * 2);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * 2);
			}
		}
		const array = this.state.array;
		const arrayBars = document.getElementsByClassName("array-bar");
		setTimeout(() => {
			for (let i = 0; i < array.length; i++) {
				setTimeout(() => {
					arrayBars[i].style.backgroundColor = "lime";
				}, i * 5);
			}
		}, 15500);
	}

	refreshPage() {
		window.location.reload();
	}

	render() {
		const { array } = this.state;

		return (
			<div className="buttons">
				<div className="generate">
					<button className="btn btn-secondary" onClick={() => this.resetArray()}>
						Generate New Array
					</button>
				</div>
				<div className="generate">
					<button className="btn btn-outline-danger" onClick={() => this.refreshPage()}>
						Stop
					</button>
				</div>
				<br></br>

				<div id="sort">
					<button className="btn btn-outline-info" onClick={() => this.selectionSort()}>
						Selection Sort
					</button>
				</div>
				<div id="sort">
					<button className="btn btn-outline-info" onClick={() => this.bubbleSort()}>
						Bubble Sort
					</button>
				</div>
				<div id="sort">
					<button className="btn btn-outline-info" onClick={() => this.insertionSort()}>
						Insertion Sort
					</button>
				</div>
				<div id="sort">
					<button className="btn btn-outline-info" onClick={() => this.mergeSort()}>
						Merge Sort
					</button>
				</div>

				<div className="array-container">
					{array.map((value, idx) => (
						<div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
					))}
				</div>

				<div className="p">
					<p>Made by Stephane Popov</p>
				</div>
			</div>
		);
	}
}
