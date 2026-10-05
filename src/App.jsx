import {useState, useEffect, useRef} from 'react'
/* import Input from './components/ui/input'
import ImageCard from './components/imageCard'
import Form from './components/form' */
import { useImages } from './hooks/useImages'
import Button from './components/ui/button'
import './App.css'
import { useScrollLeft } from './hooks/useScrollLeft'
import shiftLogo from './assets/up-arrow-thin.png'

function App() {
    const {loading,
           error,
           images,
           uploadImage,
           removeImage,
           editDate,
        } = useImages()
        const [moon, setMoon] = useState(true);
        const [sun, setSun] = useState(false)
        /*  const scrollRef1 = useScrollLeft(!loading && !error);
        const scrollRef2 = useScrollLeft(!loading && !error);
        const scrollRef3 = useScrollLeft(!loading && !error); */ /* will be used when necessary, required when vertical image scrolling feature is needed */

    const [isKey, setIsKey] = useState(false)
    
    const handleKeyDown = (e) => e.key === "Shift" && setIsKey(true)
    const handleKeyUp = (e) => e.key === "Shift" && setIsKey(false)

    useEffect(() => {
        window.addEventListener("keydown",handleKeyDown)
        window.addEventListener("keyup",handleKeyUp)
        const el = window.matchMedia('(prefers-color-scheme: light)')
        const handler = (mode) => {if(mode.matches) {
                    setMoon(true)
                    setSun(false)
                }
                else {
                    setMoon(false)
                    setSun(true)
                }
            }
        handler(el)
        el.addEventListener("change",(e) => {handler(e)})
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup",handleKeyUp)
            el.removeEventListener("change", (e) => {handler(e)})
        }
    },[])

    function handleMode() {
         if(moon) {
                setMoon(false)
                setSun(true)
            }
        else {
                setMoon(true)
                setSun(false)
            }
    }

    return (<main>
        <header>
            <div>
                <Button className="admin-btn">msimazi</Button>
                <Button onClick={handleMode} className="mode-btn">
                    <i className={moon ? `active fa-solid fa-moon` : `fa-solid fa-moon`}></i>
                    <i className={sun ? `active fa-solid fa-sun` : `fa-solid fa-sun`}></i>
                </Button>
            </div>
        </header>
        <section className="main-content">
            <div className="page-des">
                <h1 className="page-title">
                    <span>Kumbukumbu</span>
                    <span className="letter-list" aria-label="za">
                        <span data-letter="z"></span>
                        <span data-letter="a"></span>
                    </span>
                    <span className="name-tag">Kushoka</span>
                </h1>
                <p>taarifa ndogondogo na kumbukizi 
                    juu ya miradi na maendeleo yaliobebwa
                     na familia ya Kushoka, katika vipindi tofauti tofauti
                     vya matukio. yote katika kuimarisha mawasiliano na umoja
                     wa familia, pitia picha zifuatazo zilizowekwa kama kumbukumbu
                     za matukio hayo.<br></br>
                     <span className="instructions">
                        kwa matumizi ya computer, shikiria(hold)&nbsp;
                            <strong className={isKey ? "active" : ""}>
                                SHIFT <img src={shiftLogo} width="30" height="25" loading="lazy" alt="shift-logo" />
                            </strong> kisha
                        tumia mouse-scroll ili kuona picha
                        kushoto na kulia
                     </span>
                </p>
            </div>
            {loading ? <div className="loading page-album">{loading}</div> : 
                (error ? <div className="error page-album">{error}</div> : 
                    <div className="page-album">
                        <div /* ref={scrollRef1} */ className="album-row row-1">
                            <div className="images-wrapper">
                                {images.map(image => (
                                    <div key={image.id} title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date">{image.tarehe.replaceAll("-","/")}</div>
                                    </div>
                                ))}
                                {images.map(image => (
                                    <div key={image.id} title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date">{image.tarehe.replaceAll("-","/")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div /* ref={scrollRef2} */ className="album-row row-2">
                            <div className="images-wrapper">
                                {images.map(image => (
                                    <div key={image.id} title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date">{image.tarehe.replaceAll("-","/")}</div>
                                    </div>
                                ))}
                                {images.map(image => (
                                    <div key={image.id} title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date">{image.tarehe.replaceAll("-","/")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div /* ref={scrollRef3} */ className="album-row row-3">
                            <div className="images-wrapper">
                                {images.map(image => (
                                    <div key={image.id} title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date">{image.tarehe.replaceAll("-","/")}</div>
                                    </div>
                                ))}
                                {images.map(image => (
                                    <div key={image.id} title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date">{image.tarehe.replaceAll("-","/")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
        </section>
        <footer>
            &copy; All rights reserved {(new Date())
            .toLocaleDateString()
            .split("/")[2]}. 
            imetengenezwa na kuandaliwa na <a href="#">Samwel Kushoka Cheo</a>.
        </footer>
    </main>)
}
export default App;