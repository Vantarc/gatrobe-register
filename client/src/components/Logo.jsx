import React, { useEffect, useState } from 'react';
import { motion, useAnimate } from "framer-motion";

export default function Logo(props) {

    const [scopeArbeitssaal, animateArbeitssaal] = useAnimate();
    const [scopeObe, animateObe] = useAnimate();
    const [scopeGatrobe, animateGatrobe] = useAnimate();
    let normalHeight = 1220
    let normalWidth = 900
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [scale, setScale] = useState(1);
    const [shouldAnimate, setAnimate] = useState(false);

    async function myAnimation() {
        calcScaleAndLocationPreAnimation()
        await animateGatrobe(scopeGatrobe.current, {top: 0}, {duration: 1, type: "easeInOut", bounce: 0.5})
        await animateObe(scopeObe.current, { rotate: "-10deg" }, { duration: 0.2, type: "easeOut"})
        animateObe(scopeObe.current, { rotate: "90deg" }, { duration: 0.7, type: "spring", stiffness: 50, delay: 0.15})
        await animateArbeitssaal(scopeArbeitssaal.current, { left: "40px" }, { duration: 1, type: "spring", stiffness: 50 })
        
        props.logoAnimationFinishCallback()

        setTimeout(() => {
            setAnimate(true)
            window.onresize = function () { adapt() }
            window.onload = function () { adapt() }
            adapt();
            setTimeout(() => { setAnimate(false) }, 1000)
        }, 1000)
    }
    function adapt() {
        let el = document.getElementById('wrapper')

        let maxHeight = el.getBoundingClientRect().height
        let maxWidth = el.getBoundingClientRect().width
        let targetHeight = maxHeight
        let neededScale = targetHeight / normalHeight
        console.log(targetHeight)
        console.log(neededScale)

        if (normalWidth * neededScale > maxWidth) neededScale = maxWidth / normalWidth
        setScale(neededScale)
        setX(-(normalWidth - neededScale * normalWidth) / 2 + (maxWidth - normalWidth * neededScale) / 2)
        setY(-(normalHeight - neededScale * normalHeight) / 2 + (maxHeight - normalHeight * neededScale) / 2)

    }


    function calcScaleAndLocationPreAnimation() {
        let rootElement = document.getElementById('root')
        let el = document.getElementById('wrapper')
        let windowHeight = rootElement.getBoundingClientRect().height
        let windowWidth = rootElement.getBoundingClientRect().width
        let targetHeight = windowHeight * 0.8
        let neededScale = targetHeight / normalHeight
        let maxWidth = windowWidth * 0.8
        if (normalWidth * neededScale > maxWidth) neededScale = maxWidth / normalWidth
        setScale(neededScale)
        setX(-((normalWidth - neededScale * normalWidth) / 2) + (windowWidth - normalWidth * neededScale) / 2 - el.getBoundingClientRect().left)
        setY(-((normalHeight - neededScale * normalHeight) / 2) + (windowHeight - normalHeight * neededScale) / 2 - el.getBoundingClientRect().top)
    }

    useEffect(() => {
        if(!props.animationFinished){
            calcScaleAndLocationPreAnimation()
            myAnimation();  
        } else {
            animateGatrobe(scopeGatrobe.current, {top: 0}, {duration: 0})
            animateObe(scopeObe.current, { rotate: "-10deg" }, { duration: 0})
            animateObe(scopeObe.current, { rotate: "90deg" }, { duration: 0})
            animateArbeitssaal(scopeArbeitssaal.current, { left: "40px" }, { duration: 0})
            window.onresize = function () { adapt() }
            window.onload = function () { adapt() }
            adapt();

        }
    }, []);
    return (
        <div id='wrapper'>
            <motion.div
                className='logo'
                id='logo'
                animate={{ "left": x + "px", "top": y + "px", "transform": "scale(" + scale + ")" }}
                transition={shouldAnimate ? { ease: "easeInOut", duration: 1 } : { duration: 0 }}

            >

                <motion.div ref={scopeArbeitssaal} className='logo-font logo-arbeitssaal'>Arbeitssaal</motion.div>
                <motion.div ref={scopeGatrobe} className='logo-gatrobe'>

                    <motion.div className='logo-font logo-gatr'>gatr</motion.div>
                    <motion.div ref={scopeObe} className='logo-font logo-obe'>obe</motion.div>
                </motion.div>

            </motion.div>
        </div>

    )
}
