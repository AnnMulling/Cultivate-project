import React, { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import EditCard from './EditCard';

export default function Card ({ boardId, cards, isLoaded}) {
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    // const [ editingCard, setEditingCard ] = useState();
    const [ addingCard, setAddingCard ] = useState(false);


    return isLoaded && (
        <div ref={ref}>
            <h1>Hello from Card</h1>

                <div className="cards-container">
                    {cards.map((card) => (
                        <div className="cards-sub-container" key={card.id}>
                            <EditCard card={card} boardId={boardId} isLoaded={isLoaded}  />
                        </div>

                    ))}
                </div>

        </div>
    );
}
