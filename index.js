
const loadCetagory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    // console.log(data.data);

    const categoryContainer = document.getElementById('category-container');

    const allData = data.data[0].category_id;

    getCategory(allData);

    data.data.forEach((category) => {
        const btn = document.createElement('button');
        btn.innerHTML = `
        <button <a onclick="getCategory('${category.category_id}')" class="btn btn-active bg-white text-black hover:bg-gray-300">${category.category}</button>
        `;
        categoryContainer.appendChild(btn);
    });

};

function postDate(totalSec) {

    const days = Math.floor(totalSec / (60 * 60 * 24));
    const remainingSeconds = totalSec % (60 * 60 * 24);
    const hours = Math.floor(remainingSeconds / (60 * 60));
    const remainingSecondsAfterHours = remainingSeconds % (60 * 60);
    const minutes = Math.floor(remainingSecondsAfterHours / 60);

    const daysText = days > 0 ? `${days}days${days > 1 ? '' : ''} ` : '';
    const hoursText = hours > 0 ? `${hours}hrs${hours > 1 ? '' : ''} ` : '';
    const minutesText = minutes > 0 ? `${minutes}min${minutes > 1 ? '' : ''}` : '';

    return (` ${hoursText} ${minutesText} ago`)
}

const getCategory = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const responseData = await response.json();
    // console.log(data.data);

    const arrayData = responseData.data;

    if (arrayData.length === 0) {
        // console.log(arrayData);
        const noContent = document.getElementById("no-content");
        noContent.classList.remove("hidden");
    }
    else {
        const noContent = document.getElementById("no-content");
        noContent.classList.add("hidden");
    }

    function updateVideoContainer(data) {
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = '';
    
        data.forEach((video) => {
            // console.log(video);
            const div = document.createElement('div');
            div.innerHTML = `
                <div>
                    <div class="relative h-56 sm:h-44 bg-black rounded-xl text-black">
                        <img src=${video.thumbnail} class="object-fill object-center w-full h-full rounded-xl " alt="">
                        <p class="rounded absolute block text-xs bg-black p-1 px-2 text-white z-20 bottom-2 right-3">${video.others.posted_date ? postDate(video.others.posted_date) : ''}</p>
                    </div>
                    <div class="flex gap-3 mt-5 text-black">
                        <div class="author-image w-8 h-8 rounded-full">
                            <img src=${video.authors[0].profile_picture} class="rounded-full object-cover w-8 h-8 " alt="">
                        </div>
                        <div class="video-details space-y-2 text-black">
                            <h1 class="font-bold">${video.title}</h1>
                            <div class="flex items-center justify-start gap-1">
                                <h3 class="text-[13px] font-medium text-[#17171795]">${video.authors[0].profile_name}</h3>
                                <span>${video.authors[0].verified ? `<img src="varified-icon.png">` : ''}</span>
                            </div>
                            <p class="text-[13px] font-medium text-[#17171795]">${video.others.views} Views</p>
                        </div>
                    </div>
                </div>
            `;
            videoContainer.appendChild(div);
    
        });
    
    }
    updateVideoContainer(arrayData);

    // Sort Container
    sortBtn.addEventListener('click', () => {
        sortDataByViewsAscending(arrayData);
    });

    function sortDataByViewsAscending(data) {
        data.sort((a, b) => {

            const viewsA = convertViewsToNumber(a.others.views);
            const viewsB = convertViewsToNumber(b.others.views);
            return  viewsB - viewsA; 
        });

        updateVideoContainer(data);


        function convertViewsToNumber(views) {
            const numericPart = views.replace(/[^0-9]/g, '');
          
            const viewNumber = parseInt(numericPart, 10);
          
            return views.includes('K') ? viewNumber * 1000 : viewNumber;
          }
    };
};

// Sort Btn
const sortBtn = document.getElementById('sort-btn');


loadCetagory();



