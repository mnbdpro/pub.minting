"use strict";

import $ from "jquery";
import Headroom from "headroom.js";
import {Modal} from 'bootstrap';

const hcSticky = require('hc-sticky');

import '../stylesheets/main.scss';


$(function () {

	const myElement = document.querySelector(".SiteHeader");
	const headroom  = new Headroom(myElement, {
		offset : 5,
		tolerance : 5,
	});
	headroom.init();


		SliderManager._init();
	document.addEventListener("name-of-event", function(e) {
		const bootstrapMintModal = new Modal(document.getElementById('MintModal'), {
			keyboard: false
		});
		bootstrapMintModal.show();
	});


	const controls = new InputNumber();
	controls.ready();
});


function InputNumber() {
	var _this = this;

	this.counter = 1;
	this.els = {
		decrement: document.querySelector('.InputNumber-button-decrement'),
		counter: {
			container: document.querySelector('.InputNumber-counter'),
			num: document.querySelector('.InputNumber-counter-num'),
			input: document.querySelector('.InputNumber-counter-input')
		},
		increment: document.querySelector('.InputNumber-button-increment')
	};


	this.render = function(hideClassName, visibleClassName) {
		_this.els.counter.num.classList.add(hideClassName);

		setTimeout(function() {
				_this.els.counter.num.innerText = _this.getCounter();
				_this.els.counter.input.value = _this.getCounter();
				_this.els.counter.num.classList.add(visibleClassName);
			},
			100);

		setTimeout(function() {
				_this.els.counter.num.classList.remove(hideClassName);
				_this.els.counter.num.classList.remove(visibleClassName);
			},
			200);
	};

	this.ready = function() {
		_this.els.decrement.addEventListener('click',
			function() {
				_this.debounce(function() {
					_this.decrement();
					_this.render('is-decrement-hide', 'is-decrement-visible');
				});
			});

		_this.els.increment.addEventListener('click',
			function() {
				_this.debounce(function() {
					_this.increment();
					_this.render('is-increment-hide', 'is-increment-visible');
				});
			});

		_this.els.counter.input.addEventListener('input',
			function(e) {
				var parseValue = parseInt(e.target.value);
				if (!isNaN(parseValue) && parseValue >= 0) {
					_this.setCounter(parseValue);
					_this.render();
				}
			});

		_this.els.counter.input.addEventListener('focus',
			function(e) {
				_this.els.counter.container.classList.add('is-input');
			});

		_this.els.counter.input.addEventListener('blur',
			function(e) {
				_this.els.counter.container.classList.remove('is-input');
				_this.render();
			});
	};
};
