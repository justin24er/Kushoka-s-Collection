import {useState, useEffect, useRef} from 'react'
/* import Input from './components/ui/input'
import ImageCard from './components/imageCard'
import Form from './components/form' */
import { useImages } from './hooks/useImages'
import Button from './components/ui/button'
import './App.css'


function App() {
    const {loading,
           error,
           images,
           uploadImage,
           removeImage,
           editDate,
        } = useImages()

    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRef3 = useRef(null);
   
    return (<main>
        <header>
            <Button className="admin-btn">msimazi</Button>
        </header>
        <section className="main-content">
            <div className="page-des">
                <h1 className="page-title">
                    <span>Kumbukumbu</span>
                    <span className="letter-list" aria-lable="za">
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
                     za matukio hayo. 
                </p>
            </div>
            {loading ? <div className="loading page-album">{loading}</div> : 
                (error ? <div className="error page-album">{error}</div> : 
                    <div className="page-album">
                        <div ref={scrollRef1} onWheel={(e) => {
                            e.preventDefault();
                            scrollRef1.current.scrollLeft += e.deltaY;
                        }} className="album-row row-1">
                            <div className="images-wrapper">
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
                        <div ref={scrollRef2} onWheel={(e) => {
                            e.preventDefault();
                            scrollRef2.current.scrollLeft += e.deltaY;
                        }} className="album-row row-2">
                            <div className="images-wrapper">
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
                        <div ref={scrollRef3} onWheel={(e) => {
                            e.preventDefault();
                            scrollRef3.current.scrollLeft += e.deltaY;
                        }} className="album-row row-3">
                            <div className="images-wrapper">
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
            imetengenezwa na kuandaliwa na <a href="#">
                Samwel Kushoka Cheo
            </a>.
        </footer>
    </main>)
}
export default App;