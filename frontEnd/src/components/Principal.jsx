import Agregar from "../assets/add-device.png"


export default function Principal({userData}) {

  return (
    <div className="body-principal">
      <div className="header-principal">
        <img src={userData.image} alt="" style={{borderRadius:"60px", gridColumn:"3", width:"45%", justifySelf:"right", margin:"3%"}}/>
        <img src={Agregar} alt="" style={{gridColumn:"1", gridRow:"1", width:"45%", justifySelf:"left", margin:"3%"}}/>
      </div>
      <div className="section-user-principal">
        <h2 style={{ fontSize: "4.5vw", textAlign:"center" }} >Hola {userData.name}</h2>
      </div>
      <div className="section-devices-principal">
        <h1 style={{marginLeft:"3%", marginTop:"1%"}}>Zonas</h1>
      </div> 
    </div>
  );
}
