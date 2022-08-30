// Get data in the API link
const phoneData = async (search, dataLimit) => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data.data, dataLimit);
}

// const phoneData = () => {
//     const url = (`https://openapi.programming-hero.com/api/phones?search=iphone`);
//     fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data.data))
//     .catch(error => console.log(error))
// }

// display phone data inside the function
const displayPhoneData = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = "";

    const showAllContainer = document.getElementById('show-all-container')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllContainer.classList.remove('d-none')
    }
    else {
        showAllContainer.classList.add('d-none')
    }

    //no phone massage
    const noFoundMassage = document.getElementById('no-found-massage');
    if (phones.length === 0) {
        noFoundMassage.classList.remove('d-none')
    }
    else {
        noFoundMassage.classList.add('d-none')
    }

    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card pt-3 border">
                <div>
                    <img src="${image}" class="card-img-top w-75" alt="...">
                </div>
                <div class="card-body">
                    <h6 class="card-title">Phone: ${phone_name}</h6>
                    <button onclick="showMoreDetails('${slug}')" href="#" class="btn btn-outline btn-outline-success fw-semibold" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div)
    });
    // stop loader spinner
    togglerSpinner(false);
}


// common function for search and show all button
const processSearch = (dataLimit) => {
    // start loader spinner
    togglerSpinner(true);
    const searchInput = document.getElementById('search-field');
    const searchInputValue = searchInput.value;

    phoneData(searchInputValue, dataLimit);
}

// handle search button click
document.getElementById('search-button').addEventListener('click', function () {
    processSearch(10);
})

// input field enter key event
document.getElementById('search-field').addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        processSearch(10);
    }
})


// spinner loader
const togglerSpinner = (isLoading) => {
    const loaderSection = document.getElementById('spinner-loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// show all button click handler 
document.getElementById('show-all-button').addEventListener('click', function () {
    processSearch();
})

// show more details function 
const showMoreDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMoreDetails(data.data);
}

const displayMoreDetails = (moreDetails) => {
    console.log(moreDetails);
    const phoneImage = document.getElementById('phone-image');
    phoneImage.src = moreDetails.image;
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = moreDetails.name;
    const mainFeatures = document.getElementById('mainFeatures');
    mainFeatures.innerHTML = `
        <p>ChipSet: <span>${moreDetails.mainFeatures.chipSet}</span></p> 
        <p>Display Size: <span>${moreDetails.mainFeatures.displaySize}</span></p>
        <p>Memory: <span>${moreDetails.mainFeatures.memory}</span></p>
    `;
}
phoneData('iphone');
