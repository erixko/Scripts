    function sendAuthData(e) {
        e.preventDefault();
        axios.post('http://example-site.com', { email, password },{withCredentials: true } , {
        }).then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
