import { jarallax } from "jarallax";

// https://github.com/nk-o/jarallax#cjs-bundlers-like-webpack

class ExtJarallaxBag {

    /* Parallax effect speed. Provide numbers from -1.0 to 2.0. */
    setSpeed (speed: number) {
        console.log("ExtJarallaxBag setSpeed(), speed: ", speed);
        jarallax(document.querySelectorAll(".jarallax"), {
            speed: speed,
        });
    }
}

export default ExtJarallaxBag;
