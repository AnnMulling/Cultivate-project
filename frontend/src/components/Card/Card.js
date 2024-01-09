import React, { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddCard from './AddCard';
import EditCard from './EditCard';

import './Card.css'
import { fetchAllCards } from '../../store/card';

export default function Card ({ list, boardId, cards, isLoaded }) {
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ addingCard, setAddingCard ] = useState(false);

    // console.log('all card array', cards)

    const toggleAddingCard = () => {
        setAddingCard(!addingCard)
    };

    return isLoaded && (
        <>
            <div>

                {cards?.map((card, index) =>
                <div key={card.id}>
                     <EditCard card={card} index={index} boardId={boardId} isLoaded={isLoaded}  />
                </div>
                )}
            </div>

            <div >
                {addingCard ? (
                    <AddCard boardId={boardId} listId={list?.id} toggleAddingCard={toggleAddingCard}/>
                ) : (
                    <div onClick={toggleAddingCard} className="add-card">
                         <i className="fa-solid fa-circle-plus"></i> Add Card
                    </div>
                ) }
            </div>
        </>
    );
}
