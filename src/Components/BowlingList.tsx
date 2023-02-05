import React, { useState } from 'react'
import BowlingTable, {Player} from './BowlingTable';
import RefreshButton from './RefreshButton';
import './BowlingList.css';


function BowlingList() {

    const [list, setList] = useState<Player[]>([]);

    const getPoints = (str: string) => str.split(',').map(element => Number(element));

    const getScore = (pins: Array<number>) => {
        let score = 0;
        for (let i = 0; i < pins.length; i++) {
            let currentValue = pins[i]
            if (i < 18) {// not last and additional round
                if (i % 2 === 0 && currentValue === 10) { //strike
                    score = score + 10 + pins[i + 1] + pins[i + 2]
                } else {
                    if (i % 2 !== 0 && (currentValue + pins[i - 1] === 10)) { //spare
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

    const handleOnClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader()
        if(e.target &&  e.target.files){
            
            let file = e.target.files[0]
            reader.readAsText(file);
            reader.onload = async () => {
                const text = reader.result as string;
                const result = text.split(/\r?\n/);
                let arr: Player[] = [];
                //check is result.length%
                for (let i = 0; i < result.length; i++) {
                    if (i % 2 === 0) {
                        let pinArray = getPoints(result[i + 1]);
                        arr.push({ name: result[i], score: getScore(pinArray), pins: pinArray })
                    }
                }
                setList(arr);
            };
        }  
    }

    console.log(list.length);
    return (
        <div className="BowlingTable">
            {list.length === 0 ? (
                <input type="file" onChange={handleOnClick} accept=".txt" />
            ) : (
                <>
                    <BowlingTable list={list}/>
                    <RefreshButton />
                </>
            )}
        </div>
    )
}

export default BowlingList