const getSlogan = () => {

  const slogan = document.querySelector('.slogan');
  
  fetch('https://todo-list-of-motivations-default-rtdb.firebaseio.com/motivations.json')
    .then(response => {
      if(response.status === 200){
        return response.json()
      } else {
        throw new Error(response.status)
      }       
    })
    .then(response => {
      slogan.textContent = response[Math.floor(Math.random()*10)]
    })
}
getSlogan()