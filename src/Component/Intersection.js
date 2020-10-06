import React ,{ useRef,useState,useEffect } from 'react'
var randomwords = require("random-words");

function Intersection(){
    const [ ImageUrl,setImageUrl ] = useState([]);
    const ref = useRef();

    useEffect(() =>{
        
    function fetchData (){
        fetch(`https://api.giphy.com/v1/gifs/search?q=${randomwords()}&api_key=afbs0gTjlIUyimEkjgPpJsj5nfqj3he3&limit=10`)
            .then(Response => Response.json())
            .then(content => {
                if (!content){
                    observer.disconnect();
                }
                const newData = content.data.map(obj => obj.images.original.url)
                console.log(newData)
                setImageUrl(prev =>([...prev,...newData]));
            })
    }

    const observer = new IntersectionObserver(([entry]) =>{
            if (entry.isIntersecting && ref.current){
                fetchData();
            }
        },{
            root : null,
            rootMargin : "0px",
            threshold : 0.5
        })
        if(ref.current){
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current){
                observer.unobserve(ref.current)
            }
            
        }
    },[ImageUrl])

    return (
        <>
            <header>
                INFINITE SCROLL USING HOOKS
            </header>
            <main>
                {
                    ImageUrl != null?ImageUrl.map((url,index) =>{
                        return (<div key = {index}>
                            <img src = {url} alt = "please wait"/>
                        </div>)
                    }):<></>
                }
            </main>
            <footer ref={ref}>
                END OF PAGE
            </footer>
        </>
    )
}

export default Intersection;