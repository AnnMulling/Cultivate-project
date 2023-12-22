import React, { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddCard from './AddCard';
import EditCard from './EditCard';

import './Card.css'

export default function Card ({ list, boardId, cards, isLoaded}) {
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ addingCard, setAddingCard ] = useState(false);

    const toggleAddingCard = () => {
        setAddingCard(!addingCard)
    };

    return isLoaded && (
        <>
            <div>
                {cards?.reverse().map((card) => {
                    return <EditCard card={card} boardId={boardId} isLoaded={isLoaded}  />
                })}
            </div>

            <div >
                {addingCard ? (
                    <AddCard boardId={boardId} listId={list?.id} toggleAddingCard={toggleAddingCard}/>
                ) : (
                    <div onClick={toggleAddingCard} className="add-card">
                         <i class="fa-solid fa-circle-plus"></i> Add Card
                    </div>
                ) }
            </div>
        </>
    );
}
