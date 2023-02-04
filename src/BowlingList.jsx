import React, {useState} from 'react'

function BowlingList(){

    const [list, setList] = useState([]);

    // add - after 10 - display '-'
    const getPoints= (str) => str.split(',').map(element => Number(element));

    const getScore = (pins) =>{
        let score =0;
        for (let i = 0; i < pins.length; i++) {
            let currentValue = pins[i]
            if(i < 18) {// not last and additional round
                if(i % 2 === 0 && currentValue === 10){ //strike
                    score = score + 10 + pins[i+1] + pins[i+2]
                } else {
                    if(i % 2 !== 0 && (currentValue + pins[i - 1] ===10)){ //spare
                        score = score + currentValue + pins[i + 1]
                    }
                    else {
                        score = score + currentValue;
                    }
                }
            }
            else {
                score = score + currentValue;
            }
        }
        return score;
    }//assumption: after strike sec round is 0 

    const handleOnClick = async (e) => {
        let reader = new FileReader()
        let file  = e.target.files[0]
        reader.onload = async (e) => { 
            const text = (e.target.result);
            const result = text.split(/\r?\n/);
            let arr = [];
            //check is result.length%
            for (let i = 0; i < result.length; i++) {
                if(i%2 === 0){
                    let pinArray = getPoints(result[i+1]);
                    arr.push({name: result[i], score:getScore(pinArray), pins: pinArray})
                }
            }
        };
        reader.readAsText(file);
     }

    return(
        <div>
            <input type="file" onChange={handleOnClick} accept=".txt"/>
            <div id="show-text">Choose text File</div>

            Here will be list!
        </div>
    )
}


export default BowlingList