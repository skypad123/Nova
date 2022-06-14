
import useSWR from "swr";
import React, { useEffect, useState } from "react";


/* format of JSON */
/*
[
  {"id":"1", "Activity_Name": "Lunges", "Time": "3000", "Video_Link":""},
  {"id":"2", "Activity_Name": "Rest", "Time": "3000", "Video_Link":""}
]


 */
const fetcher = (url) => fetch(url).then((res) => res.json());

function ExercisePage(props) {
  const difficulty = props.difficulty
  // const { data, error } = useSWR(
  //   `https://novabackend.skylivingston.website/`.concat(difficulty),
  //   fetcher
  // );

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  //const [stage, useStage] = useState(data[0].id)
  const [count, setCount]= useState(0)

  return <div class=" w-screen h-screen flex flex-1 flex-col justify-center align-center ">
    <p class="text-center">test</p>
    <ActivityCard 
    title={"test".concat(count.toString())}
    content_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis."
    id={count}
    next_fun={()=>{handleNext()}}
    ></ActivityCard>

    <TimerCard min={1} sec={0}></TimerCard>
    </div>
  
  function handleNext(){
    setCount(count+1)
  }


}

export default ExercisePage;


function ActivityCard(props){
  return <div class="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 max-h-min">
  <img class="object-cover w-full h-64" 
  src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" 
  alt="Article"/>

  <div class="p-6">
      <div>
          {/* <span class="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Product</span> */}
          <a href="#" class="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white hover:text-gray-600 hover:underline">{props.title}</a>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{props.content_text}</p>
      </div>

      <div class="mt-4">
          <div class="flex items-center justify-end">

            <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" 
              onClick={()=>props.next_fun()}>
                  Next Activity
            </button>


              {/* <div class="flex items-center">
                  <img class="object-cover h-10 rounded-full" 
                  src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" 
                  alt="Avatar"/>
                  <a href="#" class="mx-2 font-semibold text-gray-700 dark:text-gray-200">Jone Doe</a> 
              </div>
              <span class="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span> */}
          </div>
      </div>
  </div>
</div>
}

function TimerCard(props){
  var minLimit = props.min
  var secLimit = props.sec 

  const [state,setState] = useState("Pre-Run")
  const [minsec,setMinsec] = useState([0,0])

  function startTimer(){
    setState("Running")
  }
  function countSec(){
    setMinsec((minsec)=>{ 
      if (minsec[1]<59) {return [minsec[0],minsec[1]+1]}
      else if(minsec[1]==59){return [minsec[0]+1,minsec[1]-59]}
    })

  }

  function endTimer(){
    setState("Post-Run")
  }

  useEffect(() => {
    if(state === "Running") {
      if (minsec[0] == minLimit && minsec[1] == secLimit){endTimer()}
      else{
        setTimeout(() => {
            countSec();
        }, 1000);
      }
    }
  })

  const controlsComponent =()=>{
    switch(state){
      case "Pre-Run": 
        return <div>
          <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" 
          onClick={()=>startTimer()}>
              Start Timer
          </button>
        </div> 
        break;
      case "Running":
        return <div></div>
        break; 
      case "Post-Run":
        return <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" 
        onClick={()=>props.next_fun()}>
            Next Activity
        </button>
        break;
    }

  }

  return <div class="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 max-h-min p-5">
    <div class="flex flex-col items-center justify-end">
        <div class="text-6xl text-center flex w-full items-center justify-center">
            <div class="w-24 mx-1 p-2 bg-white text-blue-500 rounded-lg">
                <div class="font-mono leading-none" x-text="minutes">{ (minsec[0]<10?'0'.concat(minsec[0].toString()):minsec[0].toString()) }</div>
                <div class="font-mono uppercase text-sm leading-none">Minutes</div>
            </div>
            <div class="w-24 mx-1 p-2 bg-white text-blue-500 rounded-lg">
                <div class="font-mono leading-none" x-text="secondes">{ (minsec[1]<10?'0'.concat(minsec[1].toString()):minsec[1].toString()) }</div>
                <div class="font-mono uppercase text-sm leading-none">Seconds</div>
            </div>
        </div>
        
          {
            controlsComponent()
          }
        

    </div>
</div>





}