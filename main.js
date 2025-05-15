document.addEventListener('DOMContentLoaded', function () {
	// динамическое добавление объектов несмотря на их количество
	const mediaList = document.querySelector(
		'.files-menu__media .media-files__list'
	)
	const reportList = document.querySelector(
		'.files-menu__report .media-files__list'
	)

	let mediaDate = mediaList.querySelectorAll('.media-files__company')
	let reportDate = reportList.querySelectorAll('.media-files__company')
	let currentMonth = 11
	let currentYear = 23
	let mediaItemCount = mediaDate.length
	let reportItemCount = reportDate.length

	function formatDate(month, year) {
		const formattedMonth = String(month).padStart(2, '0')
		return `${formattedMonth} / ${year}`
	}

	function getDateForIndex(index) {
		let month = currentMonth - index
		let year = currentYear
		while (month <= 0) {
			month += 12
			year--
		}
		return { month, year }
	}

	function updateDates(list, elements, itemCount) {
		elements.forEach((element, index) => {
			const { month, year } = getDateForIndex(index)
			element.textContent = `Company ${formatDate(month, year)}`
		})
	}

	updateDates(mediaList, mediaDate, mediaItemCount)
	updateDates(reportList, reportDate, reportItemCount)

	const mediaAddButton = document.querySelector('#addMediaBtn')
	const reportAddButton = document.querySelector('#addReportBtn')

	// функция добавления новых планов/отчетов по нажатию кнопок:

	function addNewItem(list, itemCount) {
		const newIndex = itemCount
		const { month, year } = getDateForIndex(newIndex)
		const newItem = document.createElement('li')
		newItem.className = 'media-files__item'
		newItem.innerHTML = `
      <div class="media-files__inner">
        <div class="media-files__heading">
          <svg class="media-files__xml-icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#xml"></use>
          </svg>
          <div class="media-files__name">
            <span class="media-files__company">Company ${formatDate(
							month,
							year
						)}</span>
          </div>
        </div>
        <button class="media-files__download-btn btn btn--faded" type="button" aria-label="Загрузить медиаплан">
          <svg class="btn__download-icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#download"></use>
          </svg>
        </button>
      </div>
    `
		list.appendChild(newItem)
		return newIndex + 1
	}

	if (mediaAddButton) {
		mediaAddButton.addEventListener('click', function () {
			mediaItemCount = addNewItem(mediaList, mediaItemCount)
			mediaDate = mediaList.querySelectorAll('.media-files__company')
		})
	}

	if (reportAddButton) {
		reportAddButton.addEventListener('click', function () {
			reportItemCount = addNewItem(reportList, reportItemCount)
			reportDate = reportList.querySelectorAll('.media-files__report')
		})
	}

	// const openFilesBtn = document.querySelectorAll('.files-menu__open-btn')

	// openFilesBtn.forEach(button => {
	// 	button.addEventListener('click', function () {
	// 		this.classList.toggle('files-menu__open-btn-rotate')
	// 		reportList.classList.toggle('show-list')
	// 	})
	// })

	// появление меню медиапланов и отчетов по кнопке
	const openFilesBtn = document.querySelector('#filesBtn')
	const openReportBtn = document.querySelector('#reportBtn')

	openFilesBtn.onclick = function () {
		const mediaFilesList = document.querySelector('.media-files--media')
		mediaFilesList.classList.toggle('media-files--show')
		this.classList.toggle('files-menu__open-btn-rotate')

		// const openBtnIcon = document.querySelector(
		// 	'.media-files--media .media-files__open-btn'
		// )
		// openBtnIcon.classList.toggle('media-files__open-btn-rotate')
	}

	openReportBtn.onclick = function () {
		const reportFilesList = document.querySelector('.media-files--report')
		reportFilesList.classList.toggle('media-files--show')
		this.classList.toggle('files-menu__open-btn-rotate')
	}
})
