let image = document.getElementById("image");

fetch("http://jsonip.com/")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        document.getElementById("image").src = " https://api.memegen.link/images/spongebob/" + data["ip"] + "/bottom_text.png"
    })