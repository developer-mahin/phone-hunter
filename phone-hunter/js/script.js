// Get data in the API link
const phoneData = async (search) => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data.data);
}

// const phoneData = () => {
//     const url = (`https://openapi.programming-hero.com/api/phones?search=iphone`);
//     fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data.data))
//     .catch(error => console.log(error))
// }

// display data inside the function
const displayPhoneData = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = "";
    phones = phones.slice(0, 10)
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
            <div class="card p-4 border">
                <div>
                    <img src="${image}" class="card-img-top " alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Phone: ${phone_name}</h5>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div)
    });
    // stop loader spinner
    togglerSpinner(false);
}

// search phone
const searchPhone = () => {
    // start loader spinner
    togglerSpinner(true);

    const searchInput = document.getElementById('search-field');
    const searchInputValue = searchInput.value;
    searchInput.value = "";
    phoneData(searchInputValue);
}

// spinner loader
const togglerSpinner = (isLoading) => {
    const loaderSection = document.getElementById('spinner-loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}


phoneData('iphone');