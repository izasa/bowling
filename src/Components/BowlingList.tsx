import React, { useState } from 'react'
import { Player } from './Player';
import BowlingTable from './BowlingTable';
import RefreshButton from './RefreshButton';
import './BowlingList.css';


function BowlingList() {

    const [list, setList] = useState<Player[]>([]);

    const getPoints = (str: string) => str.split(',').map(element => Number(element));

    const getScore = (pins: Array<number>, name: string) => {
        let score = 0;
        for (let i = 0; i < pins.length; i++) {
            let currentValue = pins[i];
            if (i < 18) {
                if (i % 2 === 0 && currentValue === 10) {
                    pins[i + 2] === 10
                    ? score = score + 10 + pins[i + 2] + pins[i + 4]
                    : score = score + 10 + pins[i + 2] + pins[i + 3];
                    i++;
                } else {
                    if (i % 2 !== 0 && (currentValue + pins[i - 1] === 10)) {
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
    }

    const handleOnClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader()
        if(e.target &&  e.target.files){
            
            let file = e.target.files[0]
            reader.readAsText(file);
            reader.onload = async () => {
                const text = reader.result as string;
                const result = text.split(/\r?\n/);
                let arr: Player[] = [];
                if(result.length % 2 !==0){
                    alert('Proszę sprawdzić czy dane w poprawnym formacie')
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    if (i % 2 === 0) {
                        let pinArray = getPoints(result[i + 1]);
                        arr.push({ name: result[i], score: getScore(pinArray, result[i]), pins: pinArray })
                    }
                }
                setList(arr);
            };
        }  
    }

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