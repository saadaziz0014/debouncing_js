let output = document.getElementById("output");
document.getElementById("input").addEventListener("input", function (event) {
    const inputValue = event.target.value;
    // debouncedProcessInput(inputValue);
    // console.log(inputValue, "inputValue");
    debouncedProcessInput(inputValue);
});

const callApi = async (query) => {
    output.innerHTML = `<h1>Searching for ${query}...</h1>`;
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await response.json();
    if (data.products.length === 0) {
        output.innerHTML = `<h1>No products found</h1>`;
    } else {
        output.innerHTML = data.products.map(product => {
            return `<li>${product.title}</li>`;
        }).join("");
    }
}

function debounce(func) {
    let timeoutId;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, 500);
    };
}

const debouncedProcessInput = debounce(callApi, 300);

