document.addEventListener('DOMContentLoaded', function() {
    function renderInitial(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(function(data) {
    renderAllDogs(data)

    //render all k9s
    function renderAllDogs(dogs){
        dogs.forEach(renderDog1)
    }
    }) 
    }

    function renderDog1(oneDog){
        let span = document.createElement('span')
        span.innerText = oneDog.name
        document.querySelector('#dog-bar').append(span)
        span.addEventListener('click', (e) => {
            dogClick(e, oneDog.image, oneDog.isGoodDog, oneDog.name, oneDog.id)
        })
    }


    function dogClick(event, imgUrl, goodBad, dogName, dogID){
        let dogInfoArea = document.querySelector('#dog-info')
        dogInfoArea.innerHTML = ""

        let img = document.createElement('img')
        img.src = imgUrl
        let h2 = document.createElement('h2')
        h2.innerText = dogName
        let button = document.createElement('button')
        button.innerText = (goodBad ? "Good Dog" : "Bad Dog")
        dogInfoArea.append(img, h2, button)
      
        button.addEventListener('click',(e) =>{
            changeStatus(button, goodBad, dogID)
        })
    }

    function changeStatus(button, goodBad, dogID){
        fetch(`http://localhost:3000/pups/${dogID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                isGoodDog: !goodBad
            })
        })
        .then(resp => resp.json())
        .then(function(data){
            dogClick(event, data.image, data.isGoodDog, data.name, data.id)
            reRenderTrueDogs()
        }
        )} 
        function reRenderTrueDogs(){
            fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(function(data){
                renderTrueFalseDog(data)
            })
        }

        let toggle = document.querySelector('#good-dog-filter')
        toggle.addEventListener('click', function(){
            fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(function(data) {
                if(toggle.innerText === "Filter good dogs: OFF") {
                    toggle.innerText = "Filter good dogs: ON"
                    renderTrueFalseDog(data)
                } else {
                    toggle.innerText = "Filter good dogs: OFF"
                    document.querySelector('#dog-bar').innerHTML = ''
                    data.forEach(renderDog1) //line 19
                }
        })
        })

        function renderTrueFalseDog(dog){
            document.querySelector('#dog-bar').innerHTML = ''

            let trueFalse = dog.filter(status => {
                return status.isGoodDog == true
            })
            trueFalse.forEach(renderStatusDog)
            }



        
        function renderStatusDog(oneDog){
            let span = document.createElement('span')
            span.innerText = oneDog.name
            document.querySelector('#dog-bar').append(span)
            span.addEventListener('click', (e) => {
                dogClick(e, oneDog.image, oneDog.isGoodDog, oneDog.name, oneDog.id)
        })
    }        
renderInitial()
})