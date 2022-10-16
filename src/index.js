const input = document.querySelector("input")
const search_btn = document.querySelector(".search_btn")
const apiKey = "b54580f369a7eeebecb2004dc429d08f"

let search_text = ""
input.addEventListener("input", event => {
  event.preventDefault()
  search_text = event.target.value.toLowerCase()
})

search_btn.addEventListener("click", event => {
  event.preventDefault()
  if (input.value == "") {
    alert("Please enter some text!")
    return
  }
  clearGallery()

  searchPhotos(search_text)
})

// clearGallery
const clearGallery = () => {
  document.querySelector(".display-images").innerHTML = ""
}

// display Images
const displayImages = response => {
  const photos = response.photos.photo

  photos.forEach(image => {
    const url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
    const photo = document.createElement("div")
    photo.innerHTML = `<img src=${url} /> `
    document.querySelector(".display-images").appendChild(photo)
  })
}

// search photos
async function searchPhotos(text) {
  const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=12&format=json&text=${text}&nojsoncallback=?`

  const data = await fetch(searchUrl, { method: "GET" })

  if (!data.ok) {
    throw new Error(`HTTP error! status: ${data.status}`)
  }

  const response = await data.json()
  displayImages(response)
}

// fetch API photo by id
async function fetchPhotos(id) {
  const photoInfoUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${id}&format=json&nojsoncallback=?`

  const data = await fetch(photoInfoUrl, { method: "GET" })
  if (!data.ok) {
    throw new Error(`HTTP error! status: ${data.status}`)
  }

  const response = data.json()
  displayImages(response)
}
