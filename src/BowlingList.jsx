
import DropFile from "./DropFile";

const exampleList =[
    {
        name: 'Paweł Kowalski',
        score: 30,
        pins: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    },
    {
        name: 'Krzysztof Król',
        score: 118,
        pins: [9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9]
        
    }
]

function BowlingList(){

    return(
        <div>
            <DropFile/>
            
            Here will be list!
        </div>
    )
}


export default BowlingList