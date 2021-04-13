function saveSliderVisibility() {
	const showAgainCheckBox = document.getElementById("show");
	if (showAgainCheckBox.checked) {
		window.localStorage.setItem('slider', '1');
	}
}

function loadSliderVisibility() {
	const sliderVisibility = window.localStorage.getItem('slider');
	if (sliderVisibility == null) {
		showSlider();
	}
}

function hideSlider() {
	document.getElementById("slider").style.display = "none";
}

function showSlider() {
	document.getElementById("slider").style.display = "block";
}

function getSlideCount() {
	var dots = document.getElementsByClassName('dot');
	return dots.length;
}

function getSlideIndex() {
	var dots = document.getElementsByClassName('dot');
	for (var i = 0; i < dots.length; i++) {
		if (dots[i].checked) {
			return i;
		}
	}
	return -1;
}

function alignSlideIndex(index) {
	var slideCount = getSlideCount();
	if (index < 0) {
		return slideCount + (index % slideCount);
	} 
	if (index >= slideCount) {
		return index % slideCount;
	}
	return index;
}

function switchSlide(indexStart, indexEnd) {
	var currSlideIdx = alignSlideIndex(indexStart);
	var nextSlideIdx = alignSlideIndex(indexEnd);

	var elem = document.getElementById('slider-list');
	var dots = document.getElementsByClassName('dot');
	dots[nextSlideIdx].checked = true;

	var startSlidePosition = -currSlideIdx * 376;
	var endSlidePosition = -nextSlideIdx * 376;
	var step = (endSlidePosition - startSlidePosition) / 47;

	var id = setInterval(frame, 5);
	function frame() {
		if (startSlidePosition == endSlidePosition) {
			clearInterval(id);
		} else {
			startSlidePosition += step;
			elem.style.left = startSlidePosition + 'px';
		}
	}
}

function initializeSlider(texts) {
	for (var i = 0; i < texts.length; i++) {
		var list = document.getElementById('slider-list');
		var dots = document.getElementById('dots');

		var dot = document.createElement('input');
		var item = document.createElement('li');
		var parg = document.createElement('p');
		var text = document.createTextNode(texts[i]);

		parg.appendChild(text);
		item.appendChild(parg);
		list.appendChild(item);

		dot.setAttribute('class', 'dot');
		dot.setAttribute('type', 'radio');
		dot.setAttribute('name', 'r');
		if (i == 0) {
			dot.setAttribute('checked', '');
		}
		dots.appendChild(dot);
	}
}

var preloadedTexts = [ 'START', 'SLIDE 1', 'SLIDE 2', 'SLIDE 3', 'SLIDE 4', 'SLIDE 5' ];

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(()=>{loadSliderVisibility();}, 5000);
	initializeSlider(preloadedTexts);
	document.getElementById("cross").onclick = function() {
		hideSlider();
		saveSliderVisibility();
	}
	document.getElementById('arrow-left').onclick = function() {
		var currSlideIdx = getSlideIndex();
		switchSlide(currSlideIdx, currSlideIdx - 1);
	}
	document.getElementById('arrow-right').onclick = function() {
		var currSlideIdx = getSlideIndex();
		switchSlide(currSlideIdx, currSlideIdx + 1);
	}
	document.addEventListener('keydown', function(event) {
		var currSlideIdx = getSlideIndex();
		if (event.code == 'ArrowLeft') {
			switchSlide(currSlideIdx, currSlideIdx - 1);
		}
		if (event.code == 'ArrowRight') {
			switchSlide(currSlideIdx, currSlideIdx + 1);
		}
		if (event.code == 'Escape') {
			hideSlider();
			saveSliderVisibility();
		}
	}); 

	var currSlideIdx;

	document.getElementById('dots').addEventListener('mousedown', () => {
		currSlideIdx = getSlideIndex();
	});

	document.getElementById('dots').addEventListener('click', () => {
		switchSlide(currSlideIdx, getSlideIndex());
	});
});