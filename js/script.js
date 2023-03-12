///Иконки
const icon=new Map([
  ["clear sky",'./img/clear sky.png'],
  ["broken clouds",'./img/broken clouds.png'],
  ["overcast clouds",'./img/broken clouds.png'],
  ["few clouds",'./img/few clouds.png'],
  ["mist",'./img/mist.png'],
  ["rain",'./img/rain.png'],
  ["scattered clouds",'./img/scattered clouds.png'],
  ["shower rain",'./img/shower rain.png'],
  ["snow",'./img/snow.png'],
  ["thunderstorm",'./img/thunderstorm.png'],
  ["light snow",'./img/snow.png'],
  ["light intensity shower rain",'./img/rain.png'],
  ["light rain",'./img/rain.png'],
  ["moderate rain",'./img/rain.png']
])

///Город
let city='Зерноград'

const left= document.querySelector('.weather__left')
const loading_= document.querySelector('.loading')

async function find_Weather(){

  loading_.style.display='none',
  left.style.background="url('https://i.pinimg.com/originals/27/7f/09/277f0932afd883e2d78adeb55c94faae.gif') 50% 50%/auto 100% no-repeat"
try{
   /* Информация о погоде 8443b681f5de221551ce96eac691e7b7 */
await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=8443b681f5de221551ce96eac691e7b7`)
.then(function (resp){return resp.json()})
.then(function (data){
    
    const all_weather={
      0:data.list[0],
      1:data.list[8],
      2:data.list[16],
      3:data.list[24],
    }

   
    console.log(data,all_weather)
    document.querySelector('.span_pressure').textContent=all_weather[0].main.pressure,
    document.querySelector('.span_humidity').textContent=`${all_weather[0].main.humidity}%`
    document.querySelector('.span_wind').textContent=`${all_weather[0].wind.speed} km/h`,
    document.querySelector('.tempa').textContent=`${Math.trunc(all_weather[0].main.temp-273)} °C`
    document.querySelector('.main_weather').textContent=all_weather[0].weather[0].main
    document.querySelector('.weathe__text_main').textContent=data.city.name
    const all_tempa=document.querySelectorAll(".weather__tempa");
    all_tempa.forEach((el,i)=>el.textContent=`${Math.trunc(all_weather[i].main.temp-273)} °C`)
    const all_icon=document.querySelectorAll(".weather__img");
    document.querySelector('.main_weather_icon').src=icon.get(all_weather[0].weather[0].description)
    all_icon.forEach((el,i)=>el.src=icon.get(all_weather[i].weather[0].description))
    find_image()
    close_location()
   
  
},
    );
}catch(err){
  console.log(err)
  alert('Город не найден')
  
}finally{
  data()
}
}

const loading='https://i.pinimg.com/originals/27/7f/09/277f0932afd883e2d78adeb55c94faae.gif'

const find_image=async()=>{
   /* Генерация картинки e8bNQOgxDb7Fta61FuZAawExZgpYQO72AoO5YzyqQOA*/
await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=e8bNQOgxDb7Fta61FuZAawExZgpYQO72AoO5YzyqQOA`)
.then(function (resp){return resp.json()})
.then((data)=>{
  let image=data.results[getRandomInt(data.results.length)]
  document.querySelector('.weather__left__background').src=image?image.urls.regular:'https://nypost.com/wp-content/uploads/sites/2/2022/05/office-07.jpg?quality=75&amp;strip=all&amp;w=1024'
 
});
left.style.background="linear-gradient(152.19deg, rgba(136, 235, 239, 0.9) -0.04%, rgba(83, 91, 230, 0.9) 100%)",
loading_.style.display='block'
}

const data=()=>{
 /* Работа с датой  */
 const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const date = new Date().toLocaleString("en", options);
const map_day=["Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday ",
]
let indexday=0;
  
document.querySelector('.span_day').textContent=date.split(",")[0]
const day_mounth=date.split(",")[1].split(' ')
document.querySelector('.left_data').textContent=day_mounth[2]+" "+day_mounth[1]+" "+date.split(",")[2]
map_day.forEach((el,ind)=>{
  if(date.split(",")[0]===el){
    return indexday=ind;
  }
  
})
const all_tempa=document.querySelectorAll(".weather__day");

all_tempa.forEach((el,i)=>{
  let index;
  if(indexday+i>6){
    index=indexday+i-7
  }else{
    index=indexday+i
  }
  
  el.textContent=map_day[index].slice(0,3)})
}
  
const btn_search_location=document.querySelector('.popup__button_search')
const btn_close=document.querySelector('.popup__close')
const btn_open=document.querySelector('.weather_location')
const popup=document.querySelector('.popup')
const input_popup=document.querySelector('.popup__search input')
let popup_width=0;
let popup_opacity=0;



/* Рандом */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* Нажатие поиска города */
btn_search_location.addEventListener('click',(e)=>{
  e.preventDefault();
  if(!input_popup.value==""){
    city=input_popup.value
    find_Weather()
   
    
  }
  
})
/* Нажатие кнопки закрыть */
btn_close.addEventListener('click',(e)=>{
  e.preventDefault
  close_location()
  
})
/* Нажатие кнопки сменить локацию */
btn_open.addEventListener('click',(e)=>{
  e.preventDefault
  open_location()
  
})

function open_location(){
  popup.style.display='flex';
  const id=setInterval(()=>{
    if(popup_width<524){
      popup_opacity+=0.1
    popup.style.opacity=popup_opacity;
    popup_width+=10
    popup.style.width=`${popup_width}px`;
    }else{
      clearInterval(id)
    }
    
  },1)
 
}

function close_location(){
  
  const id=setInterval(()=>{
    if(popup_width>0){
      popup_opacity-=0.1
    popup.style.opacity=popup_opacity;
    popup_width-=10
    popup.style.width=`${popup_width}px`;
    }else{
      clearInterval(id)
      popup.style.display='none';
      input_popup.value=""
    }
    
  },1)
}




    