// DOM Functions
const create = (tag: string, html: string = ""): HTMLElement|boolean => {
    var el = document.createElement(tag);
    if (el) {
        el.innerHTML = html;
        return el;
    }
    console.warn("[DOM Functions]: Tag is incorrect");
    return false;
}

// AJAX Functions

const sendPostRequest = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 301) {    
                resolve(xhr.responseText);  
            }
        }

        xhr.onerror = () => {
            reject(xhr.status);
        }

        xhr.send(JSON.stringify(data));
    });
}

const sendGetRequest = (url: string) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 301) resolve(xhr.responseText);
        }

        xhr.onerror = () => {
            reject(xhr.status);
        }

        xhr.send();
    });
}