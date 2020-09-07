function Sajax(options, callback) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
                if (options['success']) 
                      options['success'](this.response, this.status);
            } else if (this.readyState === 4 && this.status < 200 && this.status >= 300) {
                if (options['error'] === undefined) {
                    console.error(this.response, this.status);
                } else {
                    options['error'](this.response, this.status);
                }
            }
        });

        xhr.open(options['method'], options['url'], true);

        if (options['headers']) {
            for (var key in options['headers']) {
                xhr.setRequestHeader(key, options['headers']);
            }
        } else {
          // xhr.setRequestHeader("X-CSRF-TOKEN", document.getElementById('token').content);
            xhr.setRequestHeader("Content-Type", "application/JSON");
        }

        try {
            xhr.send(options['params']);
        } catch (e) {
            console.log(e);
        }

        if (callback !== undefined) {
            callback();
        } else {
            callback = null;
        }
    } catch (e) {
        console.log(e);
    }
}