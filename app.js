document.getElementById('userInput').addEventListener('focus', () => {
  document.querySelector('i.fa-solid').style.display = "block"
})

document.getElementById('userInput').addEventListener('blur', () => {
  document.querySelector('i.fa-solid').style.display = "none"
  if (userInput.value !== '') {
    document.querySelector('i.fa-solid').style.display = "block"
  }
})

document.querySelector('.fa-solid').addEventListener('click', () => {
  if (userInput.value !== '') {
    userInput.value = ''
  }
})

document.getElementById("btn").addEventListener("click", () => {

  let user = document.getElementById("userInput").value;

  let mealAPI = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${user}`
  );

  mealAPI.then((getData) => {
    return getData.json();
  }).then((sendData) => {
    console.log(sendData)
    let data = ''
    sendData.meals.forEach((e, i) => {

      data += `                                                           
        <div class="my-8">
          <h2 class='text-center text-secondary mt-5 text-2xl font-semibold'>Food Area: ${e.strArea}</h2>
          <h2 class='text-center text-warning text-xl font-bold'>Food Name: ${e.strMeal}</h2>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/3 p-2">
              <img src="${e.strMealThumb}" alt="" class='w-full rounded shadow-md'>
            </div>
            <div class="w-full md:w-1/3 p-2">
              <h2 class="text-lg font-semibold">Ingredients:</h2>
              <ul class="list-disc list-inside">
                ${Array.from({ length: 20 }, (_, j) => e[`strIngredient${j + 1}`] ? `<li>${e[`strIngredient${j + 1}`]}</li>` : '').join('')}
              </ul>
            </div>
            <div class="w-full md:w-1/3 p-2">
              <h2 class="text-lg font-semibold">Measurements:</h2>
              <ul class="list-disc list-inside">
                ${Array.from({ length: 20 }, (_, j) => e[`strMeasure${j + 1}`] ? `<li>${e[`strMeasure${j + 1}`]}</li>` : '').join('')}
              </ul>
            </div>
          </div>
          <div class="w-full mt-4">
            <h2 class="text-lg font-semibold">Instructions:</h2>
            <p>${e.strInstructions}</p>
          </div>
          <div class='w-full md:w-2/3 mx-auto mt-6'>
            <h2 class='text-center text-lg font-bold'>Watch Full Video On <a class='text-red-500 yt' data-bs-toggle="modal" data-bs-target="#exampleModal${i}"><u>Youtube</u></a></h2>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${e.strMeal}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <iframe src="https://youtube.com/embed/${e.strYoutube.slice(-11)}" frameborder="0" width="100%" height='300'></iframe>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      heading.innerHTML = `<h1 class='text-center text-danger text-3xl font-bold'>Food Category: ${sendData.meals[0].strCategory}</h1>`
      appendData.innerHTML = data
    });
  }).catch((error) => {
    document.querySelector('.find').style.display = 'none';
    document.querySelector('.notfound').innerHTML = "Meal Not Found 😥";
    document.querySelector('.try').innerHTML = "Try Something Else 😉";
  })
});
