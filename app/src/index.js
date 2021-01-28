import {testing} from './test.js';
import '../scss/main.scss';
import {gsap} from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import barba from '@barba/core';
gsap.registerPlugin(ScrollTrigger);
// console.log(testing, testing)
var tl = gsap.timeline({paused: true})
tl.to('.movingTransition', {display: 'block', zIndex: 9000000, duration: 0.1})
tl.to('.movingTransition', {width: 100 + "vw", marginLeft: 0, duration: 0.5}, '-=0.1')
tl.to('.movingTransition', {width: 0 + "vw", marginLeft: 0, duration: 0.5})
tl.to('.movingTransition', {display: 'none', zIndex: -1, marginLeft: 100 + 'vw', duration: 0.1})


barba.init({
    transitions: [{
        name: 'default-transition',
        leave(data) {
            var done = this.async()
            gsap.to(data.current.container, {opacity: 0, duration: 0.25})
            .then(() => tl.restart())
            .then(() => {
                console.log("LEFT")
                done()
            })
        },
        afterLeave(data) {
            return gsap.from(data.next.container, {
                opacity: 0, duration: 0.25
            });
            // enter: ({next}) => {
            //     var done = this.async()
            //     next.container && timeline.reverse().then(() => done())
            // }
        }
    }]
});