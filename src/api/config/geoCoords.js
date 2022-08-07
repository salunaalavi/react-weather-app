function geoCoords() {
    return new Promise((resolve, reject) => {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            resolve(coords);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        console.log("Browser Anda Tidak Mendukung Layanan Geo Lokasi");
      }
    });
  }
  
  export default geoCoords;
  