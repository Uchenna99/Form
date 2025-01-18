import { useState } from "react";


const FindUser = () => {
    const [showbsd, setshowbsd] = useState(false);

    const handleSearch = ()=>{

    }

  return (
    <>
        <div className="button-selections">
            <button onClick={()=>{ setshowbsd(true); }}>Find User</button>
            <button>Show All Users</button>
        </div>
        <div className="button-selection-dropdown" style={{display: showbsd? 'flex':'none'}}>
            <div className="bsd-close" onClick={()=>setshowbsd(false)}>X</div>

            <div className="find-user-byId">
                <input id="find-user-inp" type="text" placeholder="User ID"/>
                <button id="find-user-btn" onClick={handleSearch}>Search</button>
            </div>
        </div>

    </>
  )
}

export default FindUser