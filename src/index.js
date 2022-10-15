const input = document.querySelector("input")
const search_btn = document.querySelector(".search_btn")
const apiKey = "b54580f369a7eeebecb2004dc429d08f"
const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=rest`

const search = false
const page_num = 1

let search_text = ""
input.addEventListener("input", event => {
  event.preventDefault()
  search_text = event.target.value
})

search_btn.addEventListener("click", () => {
  if (!input) {
    alert("Please enter some text!")
    return
  }
  clearGallery()
  search = true
  searchPhoto(search_text)
})

// clearGallery
const clearGallery = () => {
  document.querySelector(".display_images").innerHTML = ""
}

// fetch API
async function fetchPhotos() {
  const data = await fecth("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b54580f369a7eeebecb2004dc429d08f&format=rest", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: apiKey
    }
  })

  const response = await data.json()
  console.log(response)
}

fetchPhotos()
