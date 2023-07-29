    // Function to fetch IP from https://jsonip.com
    function fetchIP() {
        return fetch('https://jsonip.com')
          .then(response => response.json())
          .then(data => data.ip);
      }
  
      // Function to fetch latitude and longitude using IP from https://api.hackertarget.com/ipgeo/?q=
      function fetchLatLong(ip) {
        return fetch(`https://api.hackertarget.com/ipgeo/?q=${ip}`)
          .then(response => response.text())
          .then(data => {
            const regex = /Latitude: (-?\d+\.\d+)\nLongitude: (-?\d+\.\d+)/;
            const match = data.match(regex);
            if (match) {
              const lat = match[1];
              const long = match[2];
              return { lat, long };
            } else {
              throw new Error('Failed to parse latitude and longitude');
            }
          });
      }
  
      // Function to update the image src
      function updateImage(ipAddr, latLong) {
        const imageUrl = `https://api.memegen.link/images/spongebob/${ipAddr}/${latLong}.png`;
        document.getElementById("image").src = imageUrl;
      }
  
    // Function to update the image src with the Google Maps image URL
    function updateSatImage(lat, long) {
        const zoom = 10.0;
  
        // Construct the Google Maps Static API URL
        // const imageUrl = `https://www.netzwolf.info/karten/karte-ohne-javascript.html?on=${long}&lat=${lat}&zoom=${zoom}`;
        const imageUrl = `https://api.maptiler.com/maps/satellite/?key=jCgfEtrtb9cycUy8GCU6#${zoom}/${lat}/${long}`
        console.log(imageUrl);

        // Update the image src
        document.getElementById("image2").src = imageUrl;
      }

      // Main function to fetch data and update image
      function main() {
        fetchIP()
          .then(ipAddr => {
            return fetchLatLong(ipAddr)
              .then(latLong => {
                updateImage(ipAddr, `${latLong.lat},${latLong.long}`);
                updateSatImage(latLong.lat, latLong.long);
              })
              .catch(error => {
                console.error('Failed to fetch latitude and longitude:', error);
              });
          })
          .catch(error => {
            console.error('Failed to fetch IP:', error);
          });
      }
  
      // Call the main function
      main();