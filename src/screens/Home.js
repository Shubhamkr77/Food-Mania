import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
 const [search, setSearch] = useState("");
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[1][0].CategoryName)
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

 useEffect(() => {
   loadData();
 }, []);




  return (
    <div >
      <div> <Navbar /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pastry"
              width="900"
              height="700"
              className="d-block w-100  "
              style={{ filter: "brightness(30%)" }}
              //alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1546069901-eacef0df6022"
              alt="Pastry"
              width="900"
              height="700"
              className="d-block w-100 "
              style={{ filter: "brightness(30%)" }}
              //alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18809.jpg?w=996&t=st=1719177064~exp=1719177664~hmac=5883080e3a6a08bf15be2761d8ed22af2a87ee8652eba19bf16e29f78abf077b"
              alt="Pastry"
              width="900"
              height="700"
              className="d-block w-100 "
              style={{ filter: "brightness(30%)" }}
              //alt="..."
            />
          </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
         <div className="container">
         {
            foodCat.length !== 0
            ? foodCat.map((data)=>{
               return (
                <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3"> 
                      {data.CategoryName}
                </div>
                <hr />
                {foodItems.length !==0?
                foodItems.filter((item)=> (item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                .map(filterItems=>{
                  return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                    <Card foodName={filterItems.name} foodItem={filterItems}
                    options={filterItems.options[0]}
                    imgSrc={filterItems.img}> 
                    </Card>
                    </div>
                  )
                }): <div> No Such Data Found</div>}
                </div>
               )
            })
            :<div> """"</div>
            
         }
           
             
         </div>
      <div>  <Footer />  </div>
    </div>
  );
}
