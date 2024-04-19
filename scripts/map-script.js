const $leftLinks = document.querySelectorAll('.left-menu a'),
			$mapLinks = document.querySelectorAll('.map a'),
			$info = document.querySelector('.info');

const requestData = (id = 1) => {
	fetch('scripts/data.json')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		$info.innerHTML = `
			<h2>${data[id - 1].district}</h2>
			<p>${data[id - 1].info}</p>
			<table class="table">
			<thead>
				<tr>
					<th>Душевой
					ВВП,
					долл.ППС </th>
					<th>Индекс
					дохода</th>
					</th>
					<th>Доля
					учащихся
					в возрасте
					7–24 лет</th>
					<th>Индекс
					образования
					</th>
					<th>ИЧР
					2019</th>
					
				</tr>
				</thead>
				<tbody>
					<tr>
						<td>${data[id - 1].i1}</td>
						<td>${data[id - 1].i2}</td>
						<td>${data[id - 1].i3}</td>
						<td>${data[id - 1].i4}</td>
						<td>${data[id - 1].i5}</td> 
					</tr>
					...
				</tbody>
			</table>	
		`;
	});
};

requestData();

$leftLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let color = self.dataset.color;
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let currentPolygon = currentElement.querySelectorAll('polygon');
		let currentPath = currentElement.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		self.classList.add('active');
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let currentPolygon = currentElement.querySelectorAll('polygon');
		let currentPath = currentElement.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
		self.classList.remove('active');
	});
    el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let id = parseInt(self.dataset.id);
		requestData(id);
	});
});

$mapLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let color = self.dataset.color;
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('polygon');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		currentElement.classList.add('active');
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('polygon');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = ``);
		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
		currentElement.classList.remove('active');
	});

	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let id = parseInt(currentElement.dataset.id);
		requestData(id);
	});
    
});