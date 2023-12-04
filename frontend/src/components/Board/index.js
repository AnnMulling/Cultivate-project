import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchAllLists } from '../../store/list';

export default function BoardDetails(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const user = useSelector((state) => state.session.user);
    const allLists =  useSelector((state) => state.lists);
    const [ isLoaded, setIsLoaded ] = useState(false)

    console.log('user', user);
    console.log('lists', allLists);

    useEffect(() => {
        dispatch(fetchAllLists(boardId))
        .then(() => setIsLoaded(true));

    }, [dispatch]);

    if(!user) {
        history.push("/")
    };

    return isLoaded && (
        <>
            <h1>In board {boardId}</h1>
            {Object.values(allLists).reverse().map((list) =>
                <div>
                    <p>{list.title}</p>
                    <p>Created By {user.firstName}</p>
                </div>
            )}
        </>
    );
};
