import React, { useEffect, useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteTime from '../ModalDelete/DeleteTime';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cookieStart from '../../assets/set-time/cookieStart.png'
import cookieRaw from '../../assets/set-time/cookieRaw.png';
import cookieDone from '../../assets/set-time/cookieDone.png';


import './SetTime.css'

export default function SetTimeCookie() {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    // 2 status "working" and "gave up" to designate the different progress
    const [status, setStatus] = useState("get started");
    // keep track when task finishes
    const [ done, setDone ] = useState(false);
    //display button differently in 2 different stages of work (focus || !focus)
    const [focus, setFocus] = useState(false);
    const [ intervalId, setIntervalId ] = useState();

    const disabled = minute === 0 && hour === 0;
    const className = disabled ? "disabled-time-btn" : "start-time-btn"

    // 00:00
    console.log('minute', minute)

    useEffect(() => {
        //check minute if less than 0 then start decreasing hour (if hour > 0) set minute to 59
        if (minute < 0) {
            setHour(() => hour - 1);
            setMinute(59);
        };
        //if both hour and minute == 0 then stop counting
        //set focus to false
        if (minute === 0 && hour === 0) {
            stopTimer();
            setFocus(false);
            setDone(true);
        };

    }, [hour, minute]);

    //call back stoptime
    const stopTimer = () => {
        //clear time interval and set hour and minute back to 0
        clearInterval(intervalId);
        setHour(0);
        setMinute(0);
    };

    //call back to invoke modal for confirmation and close the modal
    const gaveUp = () => {
        stopTimer();
        setFocus(false);
        setStatus("gave up");
    };

    //leave page action causing the time to stop (give some time for user to come back using set time out)
    const leavePage = () => {
        setDone(false)

        setTimeout(() => {
            stopTimer();
            setStatus("gave up")
        }, 5000)

    };


    //if page is not visible switch to different document title
    document.hidden ? leavePage() : document.title = "Keep Going"

    if (!user) {
        history.push("/")
    };

    return (
        <div className="set-time-page">
            <div className="set-time-heading">
                <h1>Let's bake!</h1>
            </div>
            <div className="set-time-title">
            { status === 'get started'  ? (
                    <p>You are doing great!!</p>
                ): (
                   status === 'working' && minute > 0 || hour > 0 && focus ? (
                       <p>You are doing great! Keep going!</p>
                ):(

                    status === 'gave up' ? (
                        <p>Your cookie is still raw!</p>
                ) : (
                    status === 'working' && minute === 0 && hour === 0 && done &&
                     <p> Here's your delicious cookie! Congrats!</p>
                )))}
            </div>
            <div className="set-time-img">
                {status === 'get started' ? (
                    <img src={cookieStart} alt="tree" />

                ):(
                    status === 'working' && minute > 0 || hour > 0 && focus ? (
                    <img src={cookieStart} alt="tree" />

                ):(
                    status === 'gave up' ? (
                    <img src={cookieRaw} alt="dead tree" />
                ):(
                    status === 'working' && minute === 0 && hour === 0 && done &&
                    <img src={cookieDone} alt="grown tree" />
                )))}
            </div>
            <div className="timer-display">
                <span className="time">{hour < 10 && 0}{hour}:</span>
                <span className="time">{minute < 10 && 0}{minute}</span>
                <div className="time-change-arrows">
                    <button
                       className="time-change-btn"
                        onClick={
                            minute < 55
                                ? () => setMinute((min) => min + 5)
                                : () => {
                                    setHour((hr) => hr + 1);
                                    setMinute((0));
                                }
                        }
                    >+</button>
                    <button
                        className="time-change-btn"
                        onClick={
                            minute !== 0
                                ? () => setMinute((min) => min - 5)
                                : () => {
                                    if (hour > 0) {
                                        setHour((hr) => hr - 1);
                                        setMinute((55));
                                    }
                                }
                        }
                    >-</button>
                </div>
                <div className="timer-btn">
                    {!focus && (
                        <button
                            disabled={minute === 0 && hour === 0}
                            className={className}
                            onClick={() => {
                                    setIntervalId(setInterval(()=> {
                                        setMinute((minute) => minute - 1)
                                    }, 60000))
                                    ;
                                setFocus(true);
                                setStatus("working");
                            }}
                        >Start</button>
                    )}
                </div>
                <div className="timer-btn">
                    {focus && (
                        <OpenModalButton
                            modalComponent={<DeleteTime gaveUp={gaveUp} />}
                            buttonText={"Give Up"}
                            modalClasses={["time-btn-delete"]}
                        />
                    )}
                </div>
            </div>
            <div className="set-time-footer">
                <Link to="/timer">
                    <button
                    className="leave-page-btn"
                    onClick={leavePage}
                    style={{cursor: 'pointer'}}><i class="fa-solid fa-arrow-left"></i> Go Back</button>
                </Link>
            </div>
        </div>
    );
}
