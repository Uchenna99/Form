import axios from "axios";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";


interface StateProps {
    id: number;
    name: string;
}

interface LGAProps {
    id: number;
    name: string;
    stateId: string;
}


const SeedTask = () => {
    const [regionSelect, setRegionSelect] = useState(false);
    const [states, setStates] = useState<StateProps[] | null>(null);
    const [region, setRegion] = useState('Select a state');
    const [lgas, setLgas] = useState<LGAProps[] | null>(null);
    const [inputLGA, setInputLGA] = useState('Select an LGA');
    const [LGAselect, setLGAselect] = useState(false);



    useEffect(()=>{
        const getStates = ()=>{
            axios.get('http://localhost:3010/api/v1/states/fetch')
            .then((response)=>{
                setStates(response.data as StateProps[]);
                console.log(response.data);
            })
        }
        getStates();
    },[])


  return (
    <>
        <div className="task-div">
            <h2>States and LGAs in Nigeria</h2>
            
            <div className="input-wrap">
              <label htmlFor="reg">State</label>
              <div className="inner-input-wrap">
                <input id="reg" type="text" value={region} readOnly
                  style={{color:region === 'Select a state'? 'gray':'black'}}
                />

                {
                  regionSelect? <GoChevronUp id="pass-eye" onClick={()=> setRegionSelect(false)}/>
                  :
                  <GoChevronDown id="pass-eye" onClick={()=> setRegionSelect(true)}/>
                }

                <div className="region-dropdown" style={{display: regionSelect? 'flex':'none'}}>
                  {
                    states && 
                    states.map((state)=>(
                      <div key={state.id} className="region-unit" 
                        onClick={async ()=>{
                          setRegionSelect(false);
                          setRegion(state.name);
                          await axios.get(`http://localhost:3010/api/v1/states/fetch-lgas/${state.id}`)
                          .then((response)=>{
                            setLgas(response.data as LGAProps[]);
                          })
                        }}>
                        <p> {state.name} </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>


            <div className="input-wrap">
              <label htmlFor="reg">LGA</label>
              <div className="inner-input-wrap">
                <input id="reg" type="text" value={inputLGA} readOnly
                  style={{color:inputLGA === 'Select an LGA'? 'gray':'black'}}
                />

                {
                  LGAselect? <GoChevronUp id="pass-eye" onClick={()=> setLGAselect(false)}/>
                  :
                  <GoChevronDown id="pass-eye" onClick={()=> setLGAselect(true)}/>
                }

                <div className="region-dropdown" style={{display: LGAselect? 'flex':'none'}}>
                  {
                    lgas && 
                    lgas.map((lga)=>(
                      <div key={lga.id} className="region-unit" 
                        onClick={async ()=>{
                          setLGAselect(false);
                          setInputLGA(lga.name);
                        }}>
                        <p> {lga.name} </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default SeedTask