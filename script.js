const loadAllPosts = async(category)=>{
    // if(category){
    //     const res= await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    //     const data = await res.json();
    //     displayPosts(data.posts)
    // }
    // else{
    //     const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    //     const data = await res.json();
    //     displayPosts(data.posts);
    // }
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category? `?category=${category}` : ''}`)
    const data = await res.json();
    displayPosts(data.posts);
    // https://openapi.programming-hero.com/api/retro-forum/posts?category=categoryName
    // fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`)

}
loadAllPosts()

const displayPosts = (posts) =>{
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML='';
   posts.forEach(post => {
    //   create dynamic div 
      const div = document.createElement('div');
      div.innerHTML =`
             <div class="bg-red-100 rounded-xl border-blue-700 border p-6 grid grid-cols-12 gap-4">
                <!-- card img -->
                  <div class='indicator col-span-2'>
                     <div class='indicator-item badge ${post.isActive?'bg-green-600':'bg-red-600'}'>

                     </div>

                    <div class=" w-24">
                        <img src=${post.image} alt="">
                    </div>
                  </div>
                  <!-- card content -->
                  <div class="space-y-3 col-span-10">
                    <div class="flex gap-5 items-center">
                      <p>${post.category}</p>
                      <p>Author: ${post.author.name}</p>
                    </div>
                <h3 class='text-2xl font-bold'>${post.title}</h3>
                    <p class="border-b border-dashed py-3 text-gray-600">${post.description}</p>
                    <div class="flex items-center gap-5">
                      <div class="flex items-center justify-center gap-3">
                        <p>
                          <i class="fa-regular fa-message"></i>
                        </p>
                        <p>${post.comment_count}</p>
                      </div>
                      <div class="flex items-center justify-center gap-3">
                        <p>
                          <i class="fa-regular fa-eye"></i>
                        </p>
                        <p>${post.view_count}</p>
                      </div>
                      <div class="flex items-center justify-center gap-3">
                        <p>
                          <i class="fa-regular fa-clock"></i>
                        </p>
                        <p>${post.posted_time}</p>
                      </div>
                      <div class='ml-32'>
                      <button onclick="markAsRead('${post.description}' , '${post.view_count}')" class='bg-green-600 text-white px-2 rounded-lg'><i class="fa-regular fa-envelope"></i></button>
                      
                      </div>
                    </div>
                  </div>
               </div>
      `
      postContainer.append(div)
   });
}

// show data as per search
const handleSearchByCategory =()=>{
   const searchText = document.getElementById('searchPosts').value;
   loadAllPosts(searchText)   
}

// mark as read button functionality
const markAsRead =(description,viewCount)=>{
   const markAsReadContainer = document.getElementById('markAsReadContainer');
   const div = document.createElement('div')
   div.innerHTML = `
     <h2>${description}</h2>
     <p>${viewCount}</p>
   `
  markAsReadContainer.append(div)
  markAsReadCount()
}

// increase count value
const markAsReadCount = () =>{
    let readCount =document.getElementById('markAsReadCounter').innerText;
    let convertedReadCount = parseInt(readCount);
    let sum = convertedReadCount + 1;
    document.getElementById('markAsReadCounter').innerText=sum;  
}

// latest section
const loadLatestPosts =()=>{
    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    .then(res=>res.json())
    .then(data=>displayLatestPosts(data))
}


const displayLatestPosts =(posts)=>{
    const latestPostContainer = document.getElementById('latest-post-container');
    posts.forEach(post=>{
        const div = document.createElement('div');
        div.innerHTML =`
                    <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${post.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${post.author?.posted_date ? post.author.posted_date:'no publish date'}
              </p>
              <h2 class="card-title text-start">${post.title}</h2>
              <p class="text-start">
                  ${post.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${post.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${post.author.name}</h3>
              <p class="text-start opacity-60">${post.author?.designation ?post.author.designation:'unknown'}</p>
            </div>
              </div>
          <span
            id="latestPostLoader"
            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
          >
          </span> 
           <!-- dynamic content  -->
         </div>
         </div> 
        `
        latestPostContainer.append(div)
    })
}
loadLatestPosts()