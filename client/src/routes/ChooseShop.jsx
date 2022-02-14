import React from "react";
import styles from "./ChooseShop.module.css";
// import { Link } from "react-router-dom";

const ChooseShop = (props) => {
    function OnClickHandler(event) {
        console.log(event.target.id);
        // event.preventDefault();
        switch (event.target.id) {
            case "moo":
                return (document.location.href = "http://mitoshop.co.kr/");
            case "wConcept":
                return (document.location.href = "http://www.google.com/");
            case "brandy":
                return (document.location.href = "http://www.naver.com/");
            default:
                return (document.location.href = "http://www.youtube.com");
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.title}>
                <span>모바</span>
                <p>쇼핑몰을 선택하세요.</p>
            </div>
            <p>
                <button
                    id="moo"
                    className={styles.startBtn}
                    onClick={OnClickHandler}
                >
                    무신사
                </button>
            </p>
            <p>
                <button
                    id="w Concept"
                    className={styles.startBtn}
                    onClick={OnClickHandler}
                >
                    W 컨셉
                </button>
            </p>
            <p>
                <button
                    id="brandy"
                    className={styles.startBtn}
                    onClick={OnClickHandler}
                >
                    브랜디
                </button>
            </p>
        </div>
    );
};

export default ChooseShop;
