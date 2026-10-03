import {useState, useEffect, useRef} from 'react'
import { useImages } from './hooks/useImages'
import Button from './components/ui/button'
import Input from './components/ui/input'
import ImageCard from './components/imageCard'
import Form from './components/form'
import './App.css'


function App() {
    const {loading,
           error,
           images,
           uploadImage,
           removeImage,
           editDate,
        } = useImages()

    return (<main>
        <header>
            <Button className="admin-btn">msimazi</Button>
        </header>
        <section className="main-content">
            <div className="page-des">
                <h1 className="page-title">Kumbukumbu za <span className="name-tag">Kushoka</span></h1>
                <p>taarifa ndogondogo na kumbukizi 
                    juu ya miradi na maendeleo yaliobebwa
                     na familia ya Kushoka, katika vipindi tofauti tofauti
                     vya matukio. yote katika kuimarisha mawasiliano na umoja
                     wa familia, pitia picha zifuatazo zilizowekwa kama kumbukumbu
                     za matukio hayo. 
                </p>
            </div>
            {loading ? <div className="loading">{loading}</div> : 
                (error ? <div className="error">{error}</div> : 
                    <div className="page-album">
                        <div className="album-row row-1">
                            <div className="images-wrapper">
                                {images.map(image => (
                                    <div title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="album-row row-2">
                            <div className="images-wrapper">
                                {images.map(image => (
                                    <div title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="album-row row-3">
                            <div className="images-wrapper">
                                {images.map(image => (
                                    <div title={image.jina} className="image-container">
                                        <div className="image">
                                            <img src={image.url} width="100" height="100" loading="lazy" alt={image.jina} />
                                        </div>
                                        <div className="image-date"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
        </section>
    </main>)
}
export default App;