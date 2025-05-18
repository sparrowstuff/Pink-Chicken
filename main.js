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

	// появление меню медиапланов и отчетов по кнопке
	const openFilesBtn = document.querySelector('#filesBtn')
	const openReportBtn = document.querySelector('#reportBtn')

	openFilesBtn.onclick = function () {
		const mediaFilesList = document.querySelector('.media-files--media')
		const menuWrapper = document.querySelector('#appearance-wrap-1')
		mediaFilesList.classList.toggle('media-files--show')
		this.classList.toggle('files-menu__open-btn-rotate')
		menuWrapper.classList.toggle('visually-hidden')
	}

	openReportBtn.onclick = function () {
		const reportFilesList = document.querySelector('.media-files--report')
		const menuWrapper = document.querySelector('#appearance-wrap-2')
		reportFilesList.classList.toggle('media-files--show')
		this.classList.toggle('files-menu__open-btn-rotate')
		menuWrapper.classList.toggle('visually-hidden')
	}

	// открытие меню смены помощника
	const threeDotBtn = document.querySelector('#three-dot-btn')
	const changeMenu = document.querySelector('.chat-menu__change-menu')

	threeDotBtn.onclick = function () {
		changeMenu.classList.toggle('chat-menu__change-menu--shown')
	}

	// работа формы
	const chatForm = document.querySelector('.chat-form')

	chatForm.addEventListener('submit', e => {
		e.preventDefault()
		console.log('form is working')
		const emptyChat = document.querySelector('.chat-menu__empty')
		emptyChat.style.display = 'none'

		const textAreaField = document.querySelector('#chat')
		const textAreaInput = textAreaField.value
		// console.log(textAreaInput)

		let currentDate = document.querySelector('.chat-menu__current-date')
		// let day = new Date().getDate()
		let hour = new Date().getHours()
		let minutes = new Date().getMinutes()
		const formattedMinutes = String(minutes).padStart(2, '0')

		const currentDay = `Сегодня, ${hour}:${formattedMinutes}`
		currentDate.style.opacity = '1'
		currentDate.textContent = currentDay
	})

	// появление меню медиафайлов и отчетов по нажатию кнопки из чата

	const mediaShowBtn = document.querySelector('#order-media-btn')
	const reportShowBtn = document.querySelector('#order-report-btn')
	const emptyBlock = document.querySelector('.aside-menu__empty')
	const mediaMenu = document.querySelector('.files-menu__media')
	const reportMenu = document.querySelector('.files-menu__report')

	mediaShowBtn.onclick = function () {
		emptyBlock.classList.add('aside-menu__empty--not-shown')
		mediaMenu.classList.add('files-menu__media--shown')
	}

	reportShowBtn.onclick = function () {
		emptyBlock.classList.add('aside-menu__empty--not-shown')
		reportMenu.classList.add('files-menu__media--shown')
	}

	// появление текста "план составлен" и иконок в кнопках, задний фон кнопок при появлении иконок

	const awaitingPlan = document.querySelectorAll('.media-files__awaiting-plan')
	const readyPlan = document.querySelectorAll('.media-files__current-plan')

	const addedIcon = document.querySelectorAll('.files-menu__added-icon')

	window.addEventListener('load', function () {
		const interval = setInterval(() => {
			awaitingPlan.forEach(element => {
				element.style.opacity = '0'
			})
			readyPlan.forEach(element => {
				element.style.opacity = '1'
			})
			addedIcon.forEach(icon => {
				icon.style.opacity = '1'
			})

			openFilesBtn.style.backgroundColor = 'transparent'
			openReportBtn.style.backgroundColor = 'transparent'

			const filesMainMenu = document.querySelector('.files-menu__media')
			const reportMainMenu = document.querySelector('.files-menu__report')
			filesMainMenu.style.outline = '2px solid #ee26c2'
			reportMainMenu.style.outline = '2px solid #2676ee'
		}, 5000)

		setTimeout(() => {
			clearInterval(interval)
		}, 6000)
	})
})
