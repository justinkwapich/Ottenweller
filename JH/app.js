// *If you have a preference for semicolons, I will gladly adjust my style. :)

// MOBILE HEADER NAV
const navSlide = () => {
  const burger = document.querySelector('.burger')
  const nav = document.querySelector('.main-nav')
  const navLinks = document.querySelectorAll('.main-nav li.parent-item')
  
  burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active')

    // Animate Links
    navLinks.forEach((link, index) => {
      if(link.style.animation){
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
      }
    })
    
    // Burger Animation
    burger.classList.toggle('burger-switch')
  })
}

const stickyNav = () => {
  // When the user scrolls the page, execute addSticky
  window.onscroll = () => addSticky()

  // Media Query to prevent stickyNav from overflowing on extra small resolutions
  const mq = window.matchMedia( "(min-width: 550px)" )

  let navbar = document.querySelector('.main-nav')
  let burger = document.querySelector('.burger')

  let sticky = navbar.offsetTop

  // Add the sticky class to .main-nav/.burger when you reach its scroll position & remove .sticky when you leave the scroll position
  const addSticky = () => {
    if (window.pageYOffset >= sticky && mq.matches) {
      navbar.classList.add("sticky")
      burger.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky")
      burger.classList.remove("sticky")
    }
  }
}

const showHideSubNav = () => {
  const headerButton = document.querySelectorAll('header .dropdown button')
  const headerList = document.querySelectorAll('header .dropdown ul')
  const listItem = document.querySelectorAll('.dropdown .button-wrapper > span')

  const resetDropdown = () => {
    listItem.forEach(item => (item.classList.remove('hidden-arrow')))
    headerList.forEach(list => (list.style.display = 'none'))
  }

  headerButton.forEach((el, index) => {
    el.addEventListener('click',() => {
    // Resets dropdown, then Hide/display dropdown
    if(headerList[index].style.display !== 'none') {
      resetDropdown()
      headerList[index].style.display = 'none'
      listItem[index].classList.remove('hidden-arrow')
    } else {
      resetDropdown()
      headerList[index].style.display = 'block'
      listItem[index].classList.add('hidden-arrow')
    }
    })
  })
}

// HERO SLIDER
const heroSlider = () => {
  const carouselSlide = document.querySelector('.carousel-slide')
  let carouselImages = document.querySelectorAll('.carousel-slide .slide-bg')

  // Buttons
  const prevBtn = document.querySelector('#prevBtn')
  const nextBtn = document.querySelector('#nextBtn')

  // Timer
  let interval = setInterval( () => rotateSlide(), 5000)

  // Counter
  let counter = 1
  let size = carouselImages[0].clientWidth

  carouselSlide.style.transform = 'translateX(' + (-size * counter ) + 'px)'

  const rotateSlide = () => { 
    if (counter >= carouselImages.length -1) return
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    counter++
    carouselSlide.style.transform = 'translateX(' + (-size * counter ) + 'px)'
  }

  // Button Listeners
  nextBtn.addEventListener('click',() => {
    clearInterval(interval)
    rotateSlide()
  })

  prevBtn.addEventListener('click', () => {
    if (counter <= 0) return
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    counter--
    carouselSlide.style.transform = 'translateX(' + (-size * counter ) + 'px)'
    clearInterval(interval)
  })

  carouselSlide.addEventListener('transitionend', () => {
    // If image is a clone, jump to original image with no animation
    if (carouselImages[counter].id === 'lastClone'){
      carouselSlide.style.transition = "none"
      counter = carouselImages.length - 2
      carouselSlide.style.transform = 'translateX(' + (-size * counter ) + 'px)'
    }
    if (carouselImages[counter].id === 'firstClone'){
      carouselSlide.style.transition = "none"
      counter = carouselImages.length - counter
      carouselSlide.style.transform = 'translateX(' + (-size * counter ) + 'px)'
    }
  })
}

// Markets Slideshow/Fader
const marketsFader = () => {
  const current = document.querySelector('#current-market')
  const titles = document.querySelectorAll('#markets-section .selection-container')

  // Markets
  const construction = document.querySelector('#markets-section .text-area .construction')
  const energy = document.querySelector('#markets-section .text-area .energy')
  const medical = document.querySelector('#markets-section .text-area .medical')
  const forestry = document.querySelector('#markets-section .text-area .forestry')
  const defense = document.querySelector('#markets-section .text-area .defense')

  // Clear all
  const resetSelection = () => {
    construction.classList.remove("show")
    energy.classList.remove("show")
    medical.classList.remove("show")
    forestry.classList.remove("show")
    defense.classList.remove("show")

    construction.classList.add("hide")
    energy.classList.add("hide")
    medical.classList.add("hide")
    forestry.classList.add("hide")
    defense.classList.add("hide")
  }

  // Set pre-selected title
  document.querySelector('.first-selection-container').focus()

  titles.forEach(title => title.addEventListener('click', imgClick))

  function imgClick(e) {
    // Change src of current image to clicked title selection
    current.src = e.target.src

    // Change copy to match clicked selection
    if (e.target.id === 'construction-tab') {
      resetSelection()
      construction.classList.add("show")
    } else if (e.target.id === 'energy-tab') {
      resetSelection()
      energy.classList.add("show")
    } else if (e.target.id === 'medical-tab') {
      resetSelection()
      medical.classList.add("show")
    } else if (e.target.id === 'forestry-tab') {
      resetSelection()
      forestry.classList.add("show")
    } else {
      resetSelection()
      defense.classList.add("show")
    }

    // Animation
    current.classList.add('fade-in')
    setTimeout(() => current.classList.remove('fade-in'), 500)
  }
}

const app = () => {
  navSlide()
  stickyNav()
  showHideSubNav()
  heroSlider()
  marketsFader()
}

app()