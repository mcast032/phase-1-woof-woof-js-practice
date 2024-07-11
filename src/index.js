function getDogs() {
    fetch('http://localhost:3000/pups')
        .then(response => response.json()) // Correctly call the .json() method
        .then(dogs => {
            const dogBar = document.getElementById('dog-bar');
            dogBar.innerHTML = "";
            dogs.forEach(dog => {
                createDogBar(dog);
            });

            // Log the parsed data to check the data for dogs
           
        })
}
function createDogBar(dog) {
    const dogBar = document.getElementById('dog-bar');
    const dogSpan = document.createElement('span');

    dogSpan.textContent = dog.name;

    dogSpan.addEventListener('click', () => showDogInfo(dog));// make an anonymous function 
    dogBar.appendChild(dogSpan);
}
function showDogInfo(dog){
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerHTML = "";

    const img = document.createElement('img');
    img.src = dog.image;

    const h2 = document.createElement('h2');
    h2.textContent = dog.name;

    const button = document.createElement('button');
    button.textContent = dog.isGoodDog ? 'Good Dog' : 'Bad Dog';
    button.addEventListener('click', ()=>{
        toggleGoodDog(dog, button)
    });

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)

}

function toggleGoodDog(dog, button){
    dog.isGoodDog = !dog.isGoodDog
    button.textContent = dog.isGoodDog ? 'Good Dog' : 'Bad Dog';

    fetch(`http://localhost:3000/pups/${dog.id}`,{
        method: PATCH, 
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({isGoodDog: dog.isGoodDog})
    })
    .then(response => response.json())
    .then(updatedDog => {
        console.log('Updated dog:', updatedDog);
    })
    .catch(error => console.error('Error updating dog:', error));

}


document.addEventListener('DOMContentLoaded', () => {
    getDogs();
  
});

