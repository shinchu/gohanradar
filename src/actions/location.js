
const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
        });
    } else {
        console.log('Geolocation not available');
    }
}

export default getCurrentLocation;