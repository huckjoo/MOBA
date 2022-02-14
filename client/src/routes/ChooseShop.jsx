import React from "react";
import styles from "./ChooseShop.module.css";
// import { Link } from "react-router-dom";

const ChooseShop = (props) => {
    function OnClickHandler(event, name) {
        console.log(name);
        event.preventDefault();
        switch (name) {
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
                    onClick={OnClickHandler("moo")}
                >
                    무신사
                </button>
            </p>
            <p>
                <button
                    id="wConcept"
                    className={styles.startBtn}
                    onClick={OnClickHandler("wConcept")}
                >
                    W Concept
                </button>
            </p>
            <p>
                <button
                    id="brandy"
                    className={styles.startBtn}
                    onClick={OnClickHandler("brandy")}
                >
                    브랜디
                </button>
            </p>
        </div>
    );
};

export default ChooseShop;
